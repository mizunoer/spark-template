# Build content audit: Text, Images, Links from all .html in repo root.
# Output: content-audit-text.csv, content-audit-images.csv, content-audit-links.csv, and content-audit.xlsx (if Excel COM available)
# Columns: Page, Location, Text, Update

$ErrorActionPreference = "Stop"
$Root = if ($PSScriptRoot) { Split-Path -Parent $PSScriptRoot } else { (Get-Location).Path }
if (-not (Test-Path (Join-Path $Root "index.html"))) { $Root = (Get-Location).Path }
Set-Location $Root

$exclude = @("test.html", "image-review-debug.html")
$htmlFiles = Get-ChildItem -Path $Root -Filter "*.html" -File | Where-Object { $exclude -notcontains $_.Name } | Sort-Object Name

function EscapeCsv($v) {
    if ($null -eq $v) { return "" }
    $s = [string]$v
    if ($s -match '["\r\n,]') { return '"{0}"' -f ($s -replace '"', '""') }
    return $s
}

$allText = @()
$allImages = @()
$allLinks = @()

foreach ($f in $htmlFiles) {
    $page = $f.Name
    $html = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $clean = $html -replace '(?s)<script[^>]*>.*?</script>', '' -replace '(?s)<style[^>]*>.*?</style>', ''

    # Section comments for Location
    $comments = [regex]::Matches($clean, '<!--\s*(.*?)\s*-->') | ForEach-Object { $t = ($_.Groups[1].Value).Trim(); @{ pos = $_.Index; text = if ($t.Length -gt 80) { $t.Substring(0, 80) } else { $t } } }

    function LocationForPos($pos) {
        $sec = "Body"
        foreach ($c in $comments) { if ($c.pos -lt $pos -and $c.text) { $sec = $c.text } }
        return $sec
    }

    # Text: title, p, h1-h6, span, a, li, label, figcaption, td, th
    $tagNames = @('title','p','h1','h2','h3','h4','h5','h6','span','a','li','label','figcaption','td','th')
    $seenText = @{}
    foreach ($tag in $tagNames) {
        $pattern = '(?si)<' + $tag + '[^>]*>([\s\S]*?)</' + $tag + '>'
        [regex]::Matches($clean, $pattern) | ForEach-Object {
            $inner = $_.Groups[1].Value -replace '<[^>]+>', '' -replace '&nbsp;', ' ' -replace '&amp;', '&' -replace '&quot;', '"' -replace '\s+', ' '
            $inner = $inner.Trim()
            if ($inner.Length -lt 2) { return }
            $key = $page + "|" + $inner.Substring(0, [Math]::Min(500, $inner.Length))
            if ($seenText[$key]) { return }
            $seenText[$key] = $true
            $loc = if ($tag -eq 'title') { 'Title' } else { LocationForPos $_.Index }
            $allText += [PSCustomObject]@{ Page = $page; Location = $loc; Text = $inner.Substring(0, [Math]::Min(32000, $inner.Length)); Update = "" }
        }
    }

    # Images
    [regex]::Matches($html, '<img[^>]+>') | ForEach-Object {
        $tag = $_.Value
        $src = if ($tag -match 'src=["'']([^"'']+)["'']') { $Matches[1] } else { "" }
        $alt = if ($tag -match 'alt=["'']([^"'']*)["'']') { $Matches[1] } else { "" }
        $loc = "Image"
        if ($src -match 'logo' -or $alt -match 'logo') { $loc = "Logo" }
        elseif ($src -match 'banner|hero') { $loc = "Banner" }
        $allImages += [PSCustomObject]@{ Page = $page; Location = $loc; Text = "src=$src | alt=$alt"; Update = "" }
    }

    # Links to .html
    [regex]::Matches($html, '<a\s[^>]*href=["'']([^"'']*\.html[^"'']*)["''][^>]*>([\s\S]*?)</a>') | ForEach-Object {
        $href = $_.Groups[1].Value.Trim()
        if ($href -match '^https?://' -and $href -notmatch 'mythic') { return }
        $linkText = $_.Groups[2].Value -replace '<[^>]+>', '' -replace '\s+', ' '
        $linkText = $linkText.Trim()
        $loc = if (-not $linkText) { "Nav" } else { "Link" }
        $allLinks += [PSCustomObject]@{ Page = $page; Location = $loc; Text = "href=$href | text=$linkText"; Update = "" }
    }
}

$cols = @("Page", "Location", "Text", "Update")
function WriteCsv($path, $rows) {
    $lines = @()
    $lines += ($cols | ForEach-Object { EscapeCsv $_ }) -join ","
    foreach ($r in $rows) {
        $lines += ($cols | ForEach-Object { EscapeCsv $r.$_ }) -join ","
    }
    [System.IO.File]::WriteAllText($path, [char]0xFEFF + ($lines -join "`r`n"), [System.Text.Encoding]::UTF8)
    Write-Host "Wrote $path"
}

WriteCsv (Join-Path $Root "content-audit-text.csv") $allText
WriteCsv (Join-Path $Root "content-audit-images.csv") $allImages
WriteCsv (Join-Path $Root "content-audit-links.csv") $allLinks

# Create .xlsx with 3 sheets via Excel COM if available
try {
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $wb = $excel.Workbooks.Add()
    $sheetNames = @("Text", "Images", "Links")
    $datas = @($allText, $allImages, $allLinks)
    for ($i = 0; $i -lt 3; $i++) {
        $wb.Sheets.Item($i + 1).Name = $sheetNames[$i]
        $ws = $wb.Sheets.Item($i + 1)
        $r = 1
        $cols | ForEach-Object { $ws.Cells.Item(1, $r) = $_; $r++ }
        $row = 2
        foreach ($o in $datas[$i]) {
            $c = 1
            $cols | ForEach-Object { $ws.Cells.Item($row, $c) = $o.$_; $c++; }
            $row++
        }
    }
    $outXlsx = Join-Path $Root "content-audit.xlsx"
    if (Test-Path $outXlsx) { Remove-Item $outXlsx -Force }
    $wb.SaveAs($outXlsx, 51)
    $wb.Close($false)
    $excel.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
    Write-Host "Wrote $outXlsx (3 sheets)"
} catch {
    Write-Host "Excel COM not available."
}

# Fallback: write Excel 2003 XML (open in Excel as single workbook with 3 sheets)
function XmlEscape($s) {
    if ($null -eq $s) { return "" }
    ([string]$s) -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;' -replace '"', '&quot;'
}
$xmlPath = Join-Path $Root "content-audit.xml"
$ns = 'xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"'
$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine('<?xml version="1.0"?>')
[void]$sb.AppendLine('<?mso-application progid="Excel.Sheet"?>')
[void]$sb.AppendLine("<Workbook $ns>")
$sheetNames = @("Text", "Images", "Links")
$datas = @($allText, $allImages, $allLinks)
for ($s = 0; $s -lt 3; $s++) {
    [void]$sb.AppendLine('<Worksheet ss:Name="' + [System.Security.SecurityElement]::Escape($sheetNames[$s]) + '">')
    [void]$sb.AppendLine('<Table>')
    [void]$sb.AppendLine('<Row><Cell><Data ss:Type="String">Page</Data></Cell><Cell><Data ss:Type="String">Location</Data></Cell><Cell><Data ss:Type="String">Text</Data></Cell><Cell><Data ss:Type="String">Update</Data></Cell></Row>')
    foreach ($r in $datas[$s]) {
        [void]$sb.AppendLine('<Row><Cell><Data ss:Type="String">' + (XmlEscape $r.Page) + '</Data></Cell><Cell><Data ss:Type="String">' + (XmlEscape $r.Location) + '</Data></Cell><Cell><Data ss:Type="String">' + (XmlEscape $r.Text) + '</Data></Cell><Cell><Data ss:Type="String">' + (XmlEscape $r.Update) + '</Data></Cell></Row>')
    }
    [void]$sb.AppendLine('</Table></Worksheet>')
}
[void]$sb.AppendLine('</Workbook>')
[System.IO.File]::WriteAllText($xmlPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Wrote $xmlPath (Excel 2003 XML - open in Excel for 3 sheets)"
