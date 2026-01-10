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
$path = isset($_GET['path']) ? $_GET['path'] : '';
$category = isset($_GET['category']) ? sanitizeFileName($_GET['category']) : '';

// Validate inputs
if (empty($path) || empty($category)) {
    http_response_code(400);
    exit('Invalid parameters');
}

// Configuration
$allowedCategories = ['pending', 'updates', 'banners', 'logos', 'team', 'facility'];
$uploadBaseDir = dirname(__DIR__) . '/uploads/';

// Validate category
if (!in_array($category, $allowedCategories)) {
    http_response_code(400);
    exit('Invalid category');
}

// Construct full file path
$fullPath = $uploadBaseDir . $category . '/' . basename($path);

// Security: Verify file exists and is within allowed directory
$realPath = realpath($fullPath);
$realBaseDir = realpath($uploadBaseDir . $category);

if (!$realPath || strpos($realPath, $realBaseDir) !== 0) {
    http_response_code(404);
    exit('File not found');
}

// Verify file is an image
$imageInfo = @getimagesize($realPath);
if ($imageInfo === false) {
    http_response_code(403);
    exit('Invalid image file');
}

// Get MIME type
$mimeType = $imageInfo['mime'];
$allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
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

