<?php
/**
 * Secure Image Upload Handler
 * Handles file uploads with security validations
 */

header('Content-Type: application/json');

// Security: Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Security: Check if files were uploaded
if (!isset($_FILES['images']) || !isset($_POST['category'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required data']);
    exit;
}

// Configuration
$allowedCategories = ['pending', 'updates', 'banners', 'logos', 'team', 'facility'];
$allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
$allowedExtensions = ['jpg', 'jpeg', 'png'];
$maxFileSize = 10 * 1024 * 1024; // 10MB
// Upload directory - adjust path based on your server structure
// For cPanel, relative path from php/ directory
$uploadBaseDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
$categoryName = sanitizeFileName($_POST['category']);
$uploadDir = $uploadBaseDir . $categoryName . DIRECTORY_SEPARATOR;

// Validate category
$category = sanitizeFileName($_POST['category']);
if (!in_array($category, $allowedCategories)) {
    echo json_encode(['success' => false, 'message' => 'Invalid category']);
    exit;
}

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        echo json_encode(['success' => false, 'message' => 'Failed to create upload directory']);
        exit;
    }
    
    // Add .htaccess for additional security (prevents direct access)
    $htaccessContent = "Order Deny,Allow\nDeny from all\n";
    file_put_contents($uploadDir . '.htaccess', $htaccessContent);
}

// Process uploaded files
$uploadedFiles = [];
$errors = [];

foreach ($_FILES['images']['tmp_name'] as $key => $tmpName) {
    if ($_FILES['images']['error'][$key] !== UPLOAD_ERR_OK) {
        $errors[] = 'Error uploading file: ' . $_FILES['images']['name'][$key];
        continue;
    }

    $originalName = $_FILES['images']['name'][$key];
    $fileSize = $_FILES['images']['size'][$key];
    $fileType = $_FILES['images']['type'][$key];
    $tmpFile = $tmpName;

    // Validate file size
    if ($fileSize > $maxFileSize) {
        $errors[] = $originalName . ' exceeds maximum file size of 10MB';
        continue;
    }

    // Validate MIME type
    if (!in_array(strtolower($fileType), $allowedMimeTypes)) {
        $errors[] = $originalName . ' is not an allowed image type';
        continue;
    }

    // Get file extension
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExtensions)) {
        $errors[] = $originalName . ' has invalid file extension';
        continue;
    }

    // Additional security: Verify file is actually an image
    $imageInfo = @getimagesize($tmpFile);
    if ($imageInfo === false) {
        $errors[] = $originalName . ' is not a valid image file';
        continue;
    }

    // Generate secure filename (prevent directory traversal and overwrite)
    $safeName = sanitizeFileName(pathinfo($originalName, PATHINFO_FILENAME));
    $newFileName = $safeName . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $destination = $uploadDir . $newFileName;

    // Move uploaded file
    if (!move_uploaded_file($tmpFile, $destination)) {
        $errors[] = 'Failed to save ' . $originalName;
        continue;
    }

    // Set proper file permissions (readable but not executable)
    chmod($destination, 0644);

    $uploadedFiles[] = [
        'originalName' => $originalName,
        'fileName' => $newFileName,
        'path' => 'uploads/' . $category . '/' . $newFileName,
        'size' => $fileSize,
        'category' => $category,
        'uploadDate' => date('Y-m-d H:i:s')
    ];
}

// Return response
if (count($uploadedFiles) > 0) {
    $response = [
        'success' => true,
        'message' => count($uploadedFiles) . ' file(s) uploaded successfully',
        'files' => $uploadedFiles
    ];
    
    if (count($errors) > 0) {
        $response['warnings'] = $errors;
    }
    
    echo json_encode($response);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'No files were uploaded. ' . implode('; ', $errors)
    ]);
}

/**
 * Sanitize filename to prevent directory traversal and other attacks
 */
function sanitizeFileName($filename) {
    // Remove any path components
    $filename = basename($filename);
    
    // Remove any characters that aren't alphanumeric, dash, underscore, or dot
    $filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $filename);
    
    // Remove multiple consecutive dots
    $filename = preg_replace('/\.{2,}/', '.', $filename);
    
    return $filename;
}

