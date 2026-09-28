# Zozo — render the app icons (PNG) from the logo geometry (40-unit grid: rounded square + "Z" stroke).
#   icon-192.png, icon-512.png           purpose "any"      rounded square, transparent corners
#   icon-maskable-512.png                purpose "maskable" full-bleed ink, Z inside the 80% safe zone
#   apple-touch-icon.png (180)           full-bleed (iOS applies its own rounded mask)
# Usage: powershell -ExecutionPolicy Bypass -File tools/make-icons.ps1
Add-Type -AssemblyName System.Drawing
$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'assets\icons'
New-Item -ItemType Directory -Force $out | Out-Null
$ink = [Drawing.ColorTranslator]::FromHtml('#16140F')
$accent = [Drawing.ColorTranslator]::FromHtml('#F0764F')

function New-Icon([int]$size, [string]$name, [bool]$fullBleed, [double]$zScale) {
  $bmp = New-Object Drawing.Bitmap $size, $size
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([Drawing.Color]::Transparent)
  $u = $size / 40.0
  $brush = New-Object Drawing.SolidBrush $ink
  if ($fullBleed) {
    $g.FillRectangle($brush, 0, 0, $size, $size)
  } else {
    $x = 1 * $u; $w = 38 * $u; $r = 9 * $u * 2
    $p = New-Object Drawing.Drawing2D.GraphicsPath
    $p.AddArc($x, $x, $r, $r, 180, 90); $p.AddArc($x + $w - $r, $x, $r, $r, 270, 90)
    $p.AddArc($x + $w - $r, $x + $w - $r, $r, $r, 0, 90); $p.AddArc($x, $x + $w - $r, $r, $r, 90, 90)
    $p.CloseFigure(); $g.FillPath($brush, $p)
  }
  # "Z": M10 13 h20 L11 27 h19 — scaled about the centre (20,20)
  $pt = { param($a, $b) New-Object Drawing.PointF ([float](($a - 20) * $zScale * $u + $size / 2)), ([float](($b - 20) * $zScale * $u + $size / 2)) }
  $pen = New-Object Drawing.Pen $accent, ([float](3.6 * $zScale * $u))
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'; $pen.LineJoin = 'Round'
  $g.DrawLines($pen, [Drawing.PointF[]]@((& $pt 10 13), (& $pt 30 13), (& $pt 11 27), (& $pt 30 27)))
  $bmp.Save((Join-Path $out $name), [Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  "wrote $name"
}
New-Icon 192 'icon-192.png' $false 1.0
New-Icon 512 'icon-512.png' $false 1.0
New-Icon 512 'icon-maskable-512.png' $true 0.78
New-Icon 180 'apple-touch-icon.png' $true 0.86
