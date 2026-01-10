<?php
/**
 * Secure Image Serving Script
 * Serves uploaded images securely (required because .htaccess blocks direct access)
 */

// Security: Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit('Method not allowed');
}

// Get parameters
$path = isset($_GET['path']) ? urldecode($_GET['path']) : '';
$category = isset($_GET['category']) ? sanitizeFileName($_GET['category']) : '';

// Validate inputs
if (empty($path) || empty($category)) {
    http_response_code(400);
    exit('Invalid parameters');
}

// Configuration
$allowedCategories = ['pending', 'updates', 'banners', 'logos', 'team', 'facility'];
$uploadBaseDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;

// Validate category
if (!in_array($category, $allowedCategories)) {
    http_response_code(400);
    exit('Invalid category');
}

// Extract filename from path (handles paths like "uploads/facility/filename.jpg")
// basename() already handles directory separators and prevents traversal
$filename = basename($path);
// Additional security: ensure no directory traversal (basename already handles this, but double-check)
if (strpos($filename, '..') !== false || strpos($filename, '/') !== false || strpos($filename, '\\') !== false) {
    http_response_code(403);
    exit('Invalid filename');
}

// Construct full file path
$fullPath = $uploadBaseDir . $category . DIRECTORY_SEPARATOR . $filename;

// Security: Verify file exists and is within allowed directory
// Use realpath for both to resolve any path issues
$realPath = realpath($fullPath);
$realBaseDir = realpath($uploadBaseDir . $category . DIRECTORY_SEPARATOR);

if (!$realPath || !$realBaseDir) {
    http_response_code(404);
    error_log("Image not found - Path: $fullPath, RealPath: " . ($realPath ?: 'null') . ", BaseDir: $realBaseDir");
    exit('File not found: Path resolution failed');
}

// Verify the file is within the allowed directory (prevent directory traversal)
if (strpos($realPath, $realBaseDir) !== 0) {
    http_response_code(403);
    error_log("Security violation - Path: $realPath, BaseDir: $realBaseDir");
    exit('Access denied');
}

// Verify file is an image
$imageInfo = @getimagesize($realPath);
if ($imageInfo === false) {
    http_response_code(403);
    exit('Invalid image file');
}

// Get MIME type
$mimeType = $imageInfo['mime'];
$allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($mimeType, $allowedMimes)) {
    http_response_code(403);
    exit('File type not allowed');
}

// Set headers
header('Content-Type: ' . $mimeType);
header('Content-Length: ' . filesize($realPath));
header('Cache-Control: public, max-age=3600');
header('X-Content-Type-Options: nosniff');

// Output image
readfile($realPath);
exit;

/**
 * Sanitize filename to prevent directory traversal
 */
function sanitizeFileName($filename) {
    $filename = basename($filename);
    $filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $filename);
    $filename = preg_replace('/\.{2,}/', '.', $filename);
    return $filename;
}

