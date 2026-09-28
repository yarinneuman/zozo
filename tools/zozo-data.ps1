# Zozo data helper — daily OHLC from Yahoo Finance's public chart endpoint, computed in PowerShell.
#   -Mode spy                       → last 8 SPY candles + red streak (JSON)
#   -Mode screen -Tickers a,b,c     → MA150 entry-rule check per ticker (JSON: passes with 320-row OHLC, plus counts)
#   -Mode screen -TickerFile f.txt  → same, one ticker per line
#   -Mode prices -Tickers a,b       → daily closes for the last ~8 months per ticker (JSON) for history/returns
#   -Mode etf -Tickers XLK,SMH      → expense ratio (%) + AUM per ETF from stockanalysis.com (JSON)
# Rule (ma150-entry-screen, condition 3): touch = low <= SMA150 <= high;  cross = prev close < prev SMA150 AND close >= SMA150*1.01.
# Market cap / listing age are NOT checked here (firstTradeDate is returned as a hint) — verify candidates separately.
param(
  [ValidateSet('spy','screen','prices','etf')][string]$Mode = 'spy',
  [string[]]$Tickers = @(),
  [string]$TickerFile,
  [string]$Out
)
$ErrorActionPreference = 'Stop'
$UA = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36' }

function Get-Daily([string]$t, [string]$range = '2y') {
  $sym = $t.Replace('.', '-')
  $u = "https://query1.finance.yahoo.com/v8/finance/chart/$sym`?range=$range&interval=1d"
  $r = (Invoke-RestMethod -Uri $u -Headers $UA -TimeoutSec 25).chart.result[0]
  $q = $r.indicators.quote[0]
  $rows = New-Object System.Collections.Generic.List[object]
  for ($i = 0; $i -lt $r.timestamp.Count; $i++) {
    if ($null -eq $q.close[$i] -or $null -eq $q.open[$i]) { continue }
    $rows.Add([pscustomobject]@{
      d = [DateTimeOffset]::FromUnixTimeSeconds($r.timestamp[$i]).ToOffset([TimeSpan]::FromHours(-4)).ToString('yyyy-MM-dd')
      o = [double]$q.open[$i]; h = [double]$q.high[$i]; l = [double]$q.low[$i]; c = [double]$q.close[$i]; v = [double]($q.volume[$i] | ForEach-Object { if ($_ -eq $null) { 0 } else { $_ } })
    })
  }
  [pscustomobject]@{ rows = $rows; meta = $r.meta }
}
function SMA($closes, [int]$n, [int]$end) { if ($end -lt $n - 1) { return $null }; $s = 0.0; for ($k = $end - $n + 1; $k -le $end; $k++) { $s += $closes[$k] }; $s / $n }
function R2($x) { if ($null -eq $x) { $null } else { [math]::Round([double]$x, 2) } }
function Emit($obj) { $json = $obj | ConvertTo-Json -Depth 6 -Compress; if ($Out) { [IO.File]::WriteAllText($Out, $json, [Text.UTF8Encoding]::new($false)) ; "written $Out" } else { $json } }

if ($TickerFile) { $Tickers += Get-Content -LiteralPath $TickerFile | ForEach-Object { $_.Trim() } | Where-Object { $_ } }
$Tickers = $Tickers | ForEach-Object { $_ -split ',' } | ForEach-Object { $_.Trim().ToUpper() } | Where-Object { $_ } | Select-Object -Unique

switch ($Mode) {
  'spy' {
    $rows = (Get-Daily 'SPY' '1mo').rows
    $last = $rows | Select-Object -Last 8
    $streak = 0; for ($i = $last.Count - 1; $i -ge 0; $i--) { if ($last[$i].c -lt $last[$i].o) { $streak++ } else { break } }
    Emit ([pscustomobject]@{ asOf = $last[-1].d; streak = $streak; lastClose = (R2 $last[-1].c); candles = @($last | ForEach-Object { [pscustomobject]@{ date = $_.d; open = (R2 $_.o); close = (R2 $_.c) } }) })
  }
  'screen' {
    $passes = New-Object System.Collections.Generic.List[object]; $failed = New-Object System.Collections.Generic.List[string]; $asOf = $null
    foreach ($t in $Tickers) {
      try {
        $d = Get-Daily $t '2y'; $rows = $d.rows
        if ($rows.Count -lt 160) { $failed.Add($t); continue }
        $closes = @($rows | ForEach-Object { $_.c }); $n = $rows.Count - 1; $b = $rows[$n]
        $s150 = SMA $closes 150 $n; $p150 = SMA $closes 150 ($n - 1)
        $touch = ($b.l -le $s150 -and $s150 -le $b.h)
        $cross = ($closes[$n - 1] -lt $p150 -and $b.c -ge $s150 * 1.01)
        if (-not $asOf) { $asOf = $b.d }
        if ($touch -or $cross) {
          $s20 = SMA $closes 20 $n; $s200 = SMA $closes 200 $n; $s150ago = SMA $closes 150 ($n - 20)
          $vols = @($rows | Select-Object -Last 51 | Select-Object -First 50 | ForEach-Object { $_.v }); $avgV = ($vols | Measure-Object -Average).Average
          $hi = ($rows | Select-Object -Last 252 | Measure-Object -Property h -Maximum).Maximum
          $slopePct = if ($s150ago) { ($s150 / $s150ago - 1) * 100 } else { 0 }
          $passes.Add([pscustomobject]@{
            ticker = $t; name = $d.meta.longName; price = (R2 $b.c); sma150 = (R2 $s150); distancePct = (R2 (($b.c / $s150 - 1) * 100))
            type = $(if ($touch) { 'touch' } else { 'cross' })
            firstTradeYear = $(if ($d.meta.firstTradeDate) { [DateTimeOffset]::FromUnixTimeSeconds($d.meta.firstTradeDate).Year } else { $null })
            context = [pscustomobject]@{
              slope = $(if ($slopePct -gt 0.5) { 'עולה' } elseif ($slopePct -lt -0.5) { 'יורד' } else { 'שטוח' })
              approach = $(if ($closes[$n - 5] -gt (SMA $closes 150 ($n - 5))) { 'מלמעלה' } else { 'מלמטה' })
              sma20 = $(if ($b.c -ge $s20) { 'מעל' } else { 'מתחת' }); sma200 = $(if ($s200 -and $b.c -ge $s200) { 'מעל' } elseif ($s200) { 'מתחת' } else { $null })
              volRatio = $(if ($avgV) { [math]::Round($b.v / $avgV, 2) } else { $null }); fromHighPct = (R2 (($b.c / $hi - 1) * 100))
            }
            ohlc = @($rows | Select-Object -Last 320 | ForEach-Object { ,@($_.d, (R2 $_.o), (R2 $_.h), (R2 $_.l), (R2 $_.c), [long]$_.v) })
          })
        }
      } catch { $failed.Add($t) }
      Start-Sleep -Milliseconds 120
    }
    Emit ([pscustomobject]@{ asOf = $asOf; scanned = $Tickers.Count - $failed.Count; failed = $failed.Count; failedTickers = [object[]]$failed.ToArray(); passes = [object[]]$passes.ToArray() })
  }
  'etf' {
    # expense ratio (%) + AUM from stockanalysis.com ETF pages
    $res = [ordered]@{}
    foreach ($t in $Tickers) {
      try {
        $h = (Invoke-WebRequest "https://stockanalysis.com/etf/$($t.ToLower())/" -UseBasicParsing -Headers $UA -TimeoutSec 25).Content
        $er = [regex]::Match($h, 'Expense Ratio</td>\s*<td[^>]*>([\d.]+)%</td>').Groups[1].Value
        $aum = [regex]::Match($h, 'Assets</td>\s*<td[^>]*>(\$[\d.,]+[KMBT]?)</td>').Groups[1].Value
        $res[$t] = [pscustomobject]@{ er = $(if ($er) { [double]$er } else { $null }); aum = $(if ($aum) { $aum } else { $null }) }
      } catch { $res[$t] = $null }
      Start-Sleep -Milliseconds 250
    }
    Emit ([pscustomobject]$res)
  }
  'prices' {
    $res = [ordered]@{}
    foreach ($t in $Tickers) {
      try { $res[$t] = @((Get-Daily $t '1y').rows | Select-Object -Last 170 | ForEach-Object { ,@($_.d, (R2 $_.c)) }) } catch { $res[$t] = $null }
      Start-Sleep -Milliseconds 120
    }
    Emit ([pscustomobject]$res)
  }
}
