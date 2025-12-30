<?php
// Diagnostic file to check server configuration
// Upload this to the same location as your index.html
// Then access it via: yourdomain.com/info.php
?>
<!DOCTYPE html>
<html>
<head>
    <title>Server Configuration Info</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        h2 { color: #666; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
        .path { background: #f0f0f0; padding: 10px; font-family: monospace; border-left: 4px solid #007cba; margin: 10px 0; }
        .success { color: green; font-weight: bold; }
        .warning { color: orange; font-weight: bold; }
        .error { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Server Configuration Diagnostic</h1>
    
    <div class="info-box">
        <h2>Current Directory</h2>
        <div class="path"><?php echo getcwd(); ?></div>
        <p>This is where this PHP file is located. Your <code>index.html</code> should be in the same directory.</p>
    </div>
    
    <div class="info-box">
        <h2>Document Root</h2>
        <div class="path"><?php echo $_SERVER['DOCUMENT_ROOT']; ?></div>
        <p>This is where your web server is looking for files.</p>
    </div>
    
    <div class="info-box">
        <h2>Server Name</h2>
        <div class="path"><?php echo $_SERVER['SERVER_NAME']; ?></div>
        <p>This is the domain you're accessing.</p>
    </div>
    
    <div class="info-box">
        <h2>Request URI</h2>
        <div class="path"><?php echo $_SERVER['REQUEST_URI']; ?></div>
    </div>
    
    <div class="info-box">
        <h2>File Check</h2>
        <?php
        $index_exists = file_exists('index.html');
        $htaccess_exists = file_exists('.htaccess');
        
        if ($index_exists) {
            echo '<p class="success">✓ index.html exists in this directory</p>';
        } else {
            echo '<p class="error">✗ index.html NOT found in this directory</p>';
        }
        
        if ($htaccess_exists) {
            echo '<p class="success">✓ .htaccess exists in this directory</p>';
        } else {
            echo '<p class="warning">⚠ .htaccess NOT found in this directory</p>';
        }
        ?>
    </div>
    
    <div class="info-box">
        <h2>What This Means</h2>
        <p><strong>Document Root</strong> should match <strong>Current Directory</strong></p>
        <p>If they're different, your files are in the wrong location!</p>
        <p>Move your files to match the Document Root path shown above.</p>
    </div>
    
    <div class="info-box">
        <p><strong>⚠️ Security Note:</strong> Delete this file (info.php) after you're done diagnosing!</p>
    </div>
</body>
</html>

