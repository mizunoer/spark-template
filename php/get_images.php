<?php
/**
 * Get Images API
 * Returns images from a specific category for the review page
 */

header('Content-Type: application/json');

// Security: Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Configuration
$allowedCategories = ['pending', 'updates', 'banners', 'logos', 'team', 'facility'];
$uploadBaseDir = dirname(__DIR__) . '/uploads/';

// Get category from query parameter
$category = isset($_GET['category']) ? sanitizeFileName($_GET['category']) : 'pending';

// Validate category
if (!in_array($category, $allowedCategories)) {
    echo json_encode(['success' => false, 'message' => 'Invalid category']);
    exit;
}

$categoryDir = $uploadBaseDir . $category . '/';
$images = [];

// Check if directory exists
if (is_dir($categoryDir)) {
    $files = scandir($categoryDir);
    
    foreach ($files as $file) {
        // Skip hidden files, directories, and .htaccess
        if ($file === '.' || $file === '..' || $file === '.htaccess') {
            continue;
        }
        
        $filePath = $categoryDir . $file;
        
        // Only process image files
        if (is_file($filePath) && preg_match('/\.(jpg|jpeg|png)$/i', $file)) {
            $imageInfo = @getimagesize($filePath);
            if ($imageInfo !== false) {
                $images[] = [
                    'id' => md5($filePath),
                    'name' => $file,
                    'path' => 'uploads/' . $category . '/' . $file,
                    'size' => filesize($filePath),
                    'width' => $imageInfo[0],
                    'height' => $imageInfo[1],
                    'date' => date('Y-m-d H:i:s', filemtime($filePath))
                ];
            }
        }
    }
    
    // Sort by upload date (newest first)
    usort($images, function($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });
}

echo json_encode([
    'success' => true,
    'category' => $category,
    'images' => $images,
    'count' => count($images)
]);

/**
 * Sanitize filename to prevent directory traversal
 */
function sanitizeFileName($filename) {
    $filename = basename($filename);
    $filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $filename);
    $filename = preg_replace('/\.{2,}/', '.', $filename);
    return $filename;
}

