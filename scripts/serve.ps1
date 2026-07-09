# Minimal static file server for ad-hoc local QA.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/serve.ps1
$ErrorActionPreference = "Stop"
$root = (Resolve-Path "$PSScriptRoot\..").Path
$port = 5501
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$port/"

$mime = @{
    ".html" = "text/html; charset=utf-8";
    ".htm"  = "text/html; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".js"   = "application/javascript; charset=utf-8";
    ".mjs"  = "application/javascript; charset=utf-8";
    ".json" = "application/json; charset=utf-8";
    ".svg"  = "image/svg+xml";
    ".png"  = "image/png";
    ".jpg"  = "image/jpeg";
    ".jpeg" = "image/jpeg";
    ".ico"  = "image/x-icon";
    ".webp" = "image/webp";
    ".woff" = "font/woff";
    ".woff2"= "font/woff2";
    ".ttf"  = "font/ttf";
    ".webmanifest" = "application/manifest+json";
    ".map"  = "application/json";
    ".txt"  = "text/plain; charset=utf-8";
}

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response
        try {
            $relativePath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
            if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = "index.html" }
            $candidate = Join-Path $root $relativePath
            if ((Test-Path $candidate) -and ((Get-Item $candidate).PSIsContainer)) {
                $candidate = Join-Path $candidate "index.html"
            }
            if (-not (Test-Path $candidate)) {
                $res.StatusCode = 404
                $bytes = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $relativePath")
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $ext = [IO.Path]::GetExtension($candidate).ToLower()
                $type = $mime[$ext]
                if (-not $type) { $type = "application/octet-stream" }
                $res.ContentType = $type
                $bytes = [IO.File]::ReadAllBytes($candidate)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } catch {
            $res.StatusCode = 500
            $bytes = [Text.Encoding]::UTF8.GetBytes("500 Internal: $_")
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } finally {
            $res.OutputStream.Close()
        }
    }
} finally {
    $listener.Stop()
}
