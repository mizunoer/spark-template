# Image Review System - Security Documentation

## Overview
This document outlines security measures for the image review and voting system, including file upload handling and isolation.

## Security Features Implemented

### 1. File Upload Security

#### File Type Validation
- **Allowed MIME Types**: `image/jpeg`, `image/jpg`, `image/png`
- **Allowed Extensions**: `.jpg`, `.jpeg`, `.png`
- **Image Verification**: Uses `getimagesize()` to verify files are actual images (prevents fake extensions)

#### File Size Limits
- **Maximum File Size**: 10MB per file
- Prevents denial-of-service attacks via large file uploads

#### File Naming Security
- **Sanitization**: Removes path components, special characters
- **Unique Names**: Uses timestamp + random bytes to prevent overwrites
- **Directory Traversal Prevention**: Uses `basename()` and strict validation

#### Upload Directory Isolation
- **Location**: `uploads/` directory (should be outside web root in production)
- **Permissions**: Files set to `0644` (readable, not executable)
- **Directory Permissions**: `0755` for directories
- **.htaccess Protection**: Denies direct access to upload directory

### 2. Directory Structure

```
uploads/
├── pending/
│   ├── .htaccess (denies direct access)
│   └── [uploaded images]
├── updates/
│   ├── .htaccess
│   └── [uploaded images]
├── banners/
├── logos/
├── team/
└── facility/
```

### 3. Access Control

#### .htaccess Protection
Each upload directory includes `.htaccess` with:
```
Order Deny,Allow
Deny from all
```

This prevents direct URL access to uploaded files while allowing PHP scripts to serve them.

### 4. Recommended Production Security Enhancements

#### A. Move Upload Directory Outside Web Root
```
Recommended structure:
/var/www/uploads/          (outside web root)
/public_html/              (web root)
    ├── image-review.html
    └── php/
        └── serve_image.php  (proxy script to serve images)
```

#### B. Add Authentication
```php
// Add to upload_images.php
session_start();
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}
```

#### C. Rate Limiting
```php
// Prevent abuse by limiting uploads per IP/time period
function checkRateLimit($ip) {
    // Implement rate limiting logic
    // e.g., max 10 uploads per hour per IP
}
```

#### D. Virus Scanning
- Integrate ClamAV or similar antivirus scanner
- Scan uploaded files before saving
- Reject files with detected threats

#### E. Image Processing
```php
// Resize and optimize images to prevent malicious payloads
function processImage($filePath) {
    // Use GD or Imagick to reprocess image
    // This removes any embedded malicious code
    $img = imagecreatefromjpeg($filePath);
    $newPath = str_replace('.jpg', '_processed.jpg', $filePath);
    imagejpeg($img, $newPath, 85);
    imagedestroy($img);
    unlink($filePath); // Delete original
    rename($newPath, $filePath); // Replace with processed
}
```

### 5. Voting System Security

#### Client-Side (Current Implementation)
- Uses localStorage for demo purposes
- Votes stored locally in browser

#### Recommended Server-Side Implementation
```php
// php/vote.php
session_start();

// Validate input
$imageId = filter_input(INPUT_POST, 'imageId', FILTER_SANITIZE_STRING);
$vote = filter_input(INPUT_POST, 'vote', FILTER_SANITIZE_STRING);

// Store in database with user ID and IP
// Prevent duplicate votes
// Implement CAPTCHA for public voting
```

### 6. Database Schema (Recommended)

```sql
CREATE TABLE image_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    ip_address VARCHAR(45),
    vote ENUM('up', 'down') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_vote (image_id, user_id, ip_address)
);

CREATE TABLE uploaded_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
);
```

### 7. File Upload Checklist

Before deploying to production:

- [ ] Move upload directory outside web root
- [ ] Implement authentication/authorization
- [ ] Add rate limiting
- [ ] Set up virus scanning
- [ ] Configure image processing/reprocessing
- [ ] Add logging for audit trail
- [ ] Set up automated backups
- [ ] Configure file permissions correctly
- [ ] Test file size limits
- [ ] Test file type validation
- [ ] Test directory traversal prevention
- [ ] Review server PHP configuration (`upload_max_filesize`, `post_max_size`)
- [ ] Add CAPTCHA for public uploads (if applicable)

### 8. Server Configuration Requirements

#### PHP Settings (php.ini)
```ini
upload_max_filesize = 10M
post_max_size = 12M
max_file_uploads = 20
file_uploads = On
```

#### Apache/.htaccess (if serving images through PHP)
```apache
# Prevent execution of uploaded files
<Directory "uploads">
    php_flag engine off
    Options -ExecCGI
    AddHandler cgi-script .php .pl .py .jsp .asp .sh .cgi
</Directory>
```

### 9. Security Headers

Add to `php/upload_images.php` and `php/get_images.php`:
```php
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
```

### 10. Monitoring & Logging

#### Implement Logging
```php
function logSecurityEvent($event, $details) {
    $logFile = '../logs/security.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $event: " . json_encode($details) . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

// Log failed uploads, suspicious activity, etc.
```

## Current Implementation Notes

The current implementation provides:
- ✅ Basic file validation
- ✅ File size limits
- ✅ Secure filename generation
- ✅ Directory isolation
- ✅ .htaccess protection
- ⚠️ No authentication (add before production)
- ⚠️ No rate limiting (add before production)
- ⚠️ Upload directory is inside web root (move before production)

## Quick Start

1. **Create upload directory structure:**
   ```bash
   mkdir -p uploads/{pending,updates,banners,logos,team,facility}
   chmod 755 uploads uploads/*
   ```

2. **Set proper permissions:**
   ```bash
   chmod 644 uploads/*/.htaccess
   ```

3. **Test upload functionality:**
   - Navigate to `image-review.html`
   - Upload test images
   - Verify files appear in correct category folders

4. **Before production:**
   - Review and implement all items in the checklist above
   - Move uploads directory outside web root
   - Add authentication system
   - Set up proper database for voting

