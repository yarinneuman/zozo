# Zozo — backup trigger for the cloud refresh.
# Runs from Windows Task Scheduler every 15 minutes. During US market hours (Mon–Fri 9:25–16:35 New York time)
# it asks GitHub to run the "Zozo site" workflow, which regenerates movers + screener data and redeploys the site.
# GitHub's own schedule does the same thing; this covers the times GitHub delays or skips it.
# The computer only sends the request — the work runs in GitHub's cloud.
$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')
$log = Join-Path $env:USERPROFILE '.zozo\trigger.log'

$ny = [TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Eastern Standard Time')
$hhmm = $ny.Hour * 100 + $ny.Minute
if ($ny.DayOfWeek -in 'Saturday', 'Sunday' -or $hhmm -lt 925 -or $hhmm -gt 1635) { exit 0 }

$ErrorActionPreference = 'Continue'   # gh writes progress to stderr; judge success by its exit code instead
# Background tasks can't read gh's login from Windows Credential Manager, so use the copy saved with
# Windows DPAPI (%USERPROFILE%\.zozo\gh-token.dpapi, outside AppData, which the Claude app's container redirects) — it can only be decrypted by this Windows user on this PC.
$tokFile = Join-Path $env:USERPROFILE '.zozo\gh-token.dpapi'
if (Test-Path $tokFile) {
  try {
    $sec = Get-Content $tokFile -ErrorAction Stop | ConvertTo-SecureString -ErrorAction Stop
    $env:GH_TOKEN = [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
  } catch { Add-Content $log "$(Get-Date -Format s) could not read the saved GitHub login: $($_.Exception.Message)" }
} else { Add-Content $log "$(Get-Date -Format s) saved GitHub login not found at $tokFile" }
$gh = Join-Path $env:ProgramFiles 'GitHub CLI\gh.exe'
if (-not (Test-Path $gh)) { $gh = 'gh' }
# skip if a run started in the last 10 minutes (e.g. GitHub's own schedule already fired)
$recent = & $gh run list -R yarinneuman/zozo -L 1 --json createdAt 2>&1
if ($LASTEXITCODE -eq 0) {
  $r = $recent | ConvertFrom-Json
  if ($r -and ([DateTimeOffset]::UtcNow - [DateTimeOffset]::Parse([string]$r[0].createdAt)).TotalMinutes -lt 10) { Add-Content $log "$(Get-Date -Format s) skipped: a run started in the last 10 min"; exit 0 }
}
$out = & $gh workflow run site.yml -R yarinneuman/zozo 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) { Add-Content $log "$(Get-Date -Format s) triggered (New York $($ny.ToString('HH:mm'))): $($out.Trim())" }
else { Add-Content $log "$(Get-Date -Format s) FAILED (exit $LASTEXITCODE): $($out.Trim())"; exit 1 }
