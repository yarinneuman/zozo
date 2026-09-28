# Zozo — build the page for the Claude Artifact (dist/zozo.html).
# The page carries the HTML and the CSS inline; app code and data stay separate files that are
# published alongside it with the Artifact tool's `files` (root: zozo), so the page stays small.
# Only Google Fonts and lightweight-charts (jsDelivr) load from outside.
# Usage: powershell -ExecutionPolicy Bypass -File tools/build-artifact.ps1
$root = Split-Path $PSScriptRoot -Parent
$read = { param($p) [IO.File]::ReadAllText((Join-Path $root $p), [Text.Encoding]::UTF8) }
$html = & $read 'index.html'

$head = [regex]::Match($html, '(?s)<head>(.*)</head>').Groups[1].Value
$body = [regex]::Match($html, '(?s)<body>(.*)</body>').Groups[1].Value

# head: keep title, description, fonts; inline the stylesheet; drop tags the Artifact skeleton supplies or can't use
$head = [regex]::Replace($head, '(?m)^\s*<meta (charset|name="viewport"|name="theme-color")[^>]*>\s*$', '')
$head = [regex]::Replace($head, '(?m)^\s*<link rel="(icon|manifest|apple-touch-icon)"[^>]*>\s*$', '')
$head = [regex]::Replace($head, '(?m)^\s*<meta name="(apple-mobile-web-app-[a-z-]+|mobile-web-app-capable|application-name)"[^>]*>\s*$', '')  # PWA tags: only for the standalone site
$css = & $read 'assets/zozo.css'
$head = $head.Replace('<link rel="stylesheet" href="assets/zozo.css">', "<style>`n$css`n</style>")

# body: local scripts keep their relative src (published as files); drop `defer` so they run in order after the charts library
$files = [System.Collections.Generic.List[string]]::new()
$body = [regex]::Replace($body, '<script src="((?:data|assets)/[^"]+\.js)"(?: defer)?></script>', [System.Text.RegularExpressions.MatchEvaluator]{
  param($m) $files.Add($m.Groups[1].Value); '<script src="' + $m.Groups[1].Value + '"></script>'
})
$body = $body.Replace('.production.js" defer></script>', '.production.js"></script>')
$body = $body.Replace('<!-- data (written by Claude''s zozo-refresh skill) -->', "<script>window.ZOZO_ARTIFACT = true;</script>")

$rtl = "<script>document.documentElement.lang = 'he'; document.documentElement.dir = 'rtl';</script>"
$out = $head.Trim() + "`n" + $rtl + "`n" + $body.Trim() + "`n"
$dist = Join-Path $root 'dist'
New-Item -ItemType Directory -Force $dist | Out-Null
$file = Join-Path $dist 'zozo.html'
[IO.File]::WriteAllText($file, $out, [Text.UTF8Encoding]::new($false))
# the list of files to publish with the page (Artifact tool: root "zozo", files = these paths)
[IO.File]::WriteAllText((Join-Path $dist 'files.json'), (ConvertTo-Json @($files) -Compress), [Text.UTF8Encoding]::new($false))
"built $file ($([math]::Round($out.Length / 1KB)) KB) + $($files.Count) files: $($files -join ', ')"
