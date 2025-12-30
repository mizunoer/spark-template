<?php
// Simple diagnostic - upload this to /repositories/mythic-rx.com/
// Access via: https://mythic-rx.com/diagnostic.php
?>
<!DOCTYPE html>
<html>
<head>
    <title>Diagnostic</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #0f0; }
        .error { color: #f00; }
        .success { color: #0f0; }
        .warning { color: #ff0; }
        div { margin: 10px 0; padding: 10px; background: #2a2a2a; border-left: 3px solid #0f0; }
    </style>
</head>
<body>
    <h1>Server Diagnostic</h1>
    
    <div>
        <strong>Current Directory:</strong><br>
        <?php echo getcwd(); ?>
    </div>
    
    <div>
        <strong>Document Root:</strong><br>
        <?php echo $_SERVER['DOCUMENT_ROOT']; ?>
    </div>
    
    <div>
        <strong>Files in this directory:</strong><br>
        <?php
        $files = scandir('.');
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                $type = is_dir($file) ? '[DIR]' : '[FILE]';
                echo $type . ' ' . htmlspecialchars($file) . '<br>';
            }
        }
        ?>
    </div>
    
    <div>
        <strong>File Checks:</strong><br>
        index.html: <?php echo file_exists('index.html') ? '<span class="success">EXISTS</span>' : '<span class="error">NOT FOUND</span>'; ?><br>
        test.html: <?php echo file_exists('test.html') ? '<span class="success">EXISTS</span>' : '<span class="error">NOT FOUND</span>'; ?><br>
        .htaccess: <?php echo file_exists('.htaccess') ? '<span class="success">EXISTS</span>' : '<span class="warning">NOT FOUND</span>'; ?><br>
    </div>
    
    <div>
        <strong>File Permissions:</strong><br>
        index.html: <?php echo substr(sprintf('%o', fileperms('index.html')), -4); ?> 
        (readable: <?php echo is_readable('index.html') ? '<span class="success">YES</span>' : '<span class="error">NO</span>'; ?>)<br>
    </div>
    
    <div>
        <strong>PHP Version:</strong> <?php echo phpversion(); ?>
    </div>
    
    <div>
        <strong>Web Server:</strong> <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'; ?>
    </div>
    
    <div class="warning">
        <strong>DELETE THIS FILE AFTER DIAGNOSING!</strong>
    </div>
</body>
</html>

