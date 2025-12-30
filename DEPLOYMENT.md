# Deployment Guide for cPanel

This guide will help you deploy your Spark Template website to a cPanel hosting server running LiteSpeed or Apache.

## Prerequisites

- Access to your cPanel hosting account
- FTP/SFTP credentials or File Manager access
- Domain name configured to point to your hosting

## Deployment Steps

### Option 1: Using cPanel File Manager

1. **Log in to cPanel**
   - Navigate to your hosting provider's cPanel login page
   - Enter your credentials

2. **Open File Manager**
   - In cPanel, find and click on "File Manager"
   - Navigate to `public_html` (or your domain's document root)

3. **Upload Files**
   - Delete any default files (like `index.html` or `coming-soon.html`)
   - Click "Upload" button
   - Upload ALL files from this repository including:
     - `index.html`
     - `404.html`
     - `.htaccess` (IMPORTANT! This file is required)
     - All folders: `css`, `js`, `image`, `font`, `php`, etc.

4. **Set File Permissions**
   - The `.htaccess` file should have permissions `644` (rw-r--r--)
   - PHP files in the `php` folder should have permissions `644`
   - All folders should have permissions `755` (rwxr-xr-x)

5. **Verify Deployment**
   - Visit your domain in a web browser
   - You should see your homepage (index.html)
   - Test the 404 page by visiting a non-existent page (e.g., `yourdomain.com/test`)

### Option 2: Using FTP/SFTP Client (FileZilla, etc.)

1. **Connect to Your Server**
   - Open your FTP client (FileZilla, WinSCP, etc.)
   - Enter your FTP credentials:
     - Host: `ftp.yourdomain.com` or your server IP
     - Username: Your cPanel username
     - Password: Your cPanel password
     - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to Document Root**
   - On the remote server, navigate to `public_html`
   - Delete any existing default files

3. **Upload All Files**
   - Select ALL files and folders from your local repository
   - **IMPORTANT**: Make sure to upload the `.htaccess` file
   - Drag and drop or use the upload function
   - Wait for all files to transfer

4. **Verify Upload**
   - Check that all files are present on the server
   - Confirm `.htaccess` is visible (you may need to enable "Show hidden files")

5. **Test Your Website**
   - Visit your domain
   - Test various pages and links

## Important Files

### `.htaccess` File
This file is **CRITICAL** for the website to work properly on cPanel. It configures:
- Default index page (`index.html`)
- Custom 404 error page (`404.html`)
- URL rewriting
- Security settings
- Browser caching

**If you're getting a 404 error, make sure the `.htaccess` file is uploaded to your server's root directory (usually `public_html`).**

### Directory Structure
Your server's `public_html` folder should look like this:
```
public_html/
├── .htaccess          # REQUIRED - Server configuration
├── index.html         # Homepage
├── 404.html          # Custom error page
├── about.html
├── contact.html
├── css/              # Stylesheets
├── js/               # JavaScript files
├── image/            # Images
├── font/             # Font files
├── php/              # PHP scripts (if using forms)
└── ... (other HTML files)
```

## Troubleshooting

### Still Getting 404 Errors?

1. **Check `.htaccess` file exists**
   - In cPanel File Manager, click "Settings" (top right)
   - Enable "Show Hidden Files (dotfiles)"
   - Verify `.htaccess` is in the root directory

2. **Check file permissions**
   - Right-click `.htaccess` → Change Permissions
   - Set to `644` (Owner: Read+Write, Group: Read, World: Read)

3. **Check DirectoryIndex**
   - Make sure `index.html` exists in the root directory
   - File names are case-sensitive on Linux servers

4. **Contact Hosting Support**
   - If issues persist, contact your hosting provider
   - Ask them to verify:
     - LiteSpeed/Apache is configured correctly
     - `.htaccess` files are allowed (AllowOverride is On)
     - mod_rewrite module is enabled

### Forms Not Working?

If your contact forms aren't working:
1. Check that PHP files in the `php/` folder are uploaded
2. Verify PHP is enabled on your hosting
3. Check file permissions on PHP files (should be `644`)

### Images or CSS Not Loading?

1. Check file paths are correct (case-sensitive)
2. Verify all folders (`css`, `js`, `image`, `font`) are uploaded
3. Clear your browser cache

## Performance Optimization

The `.htaccess` file already includes:
- GZIP compression for faster loading
- Browser caching for images, CSS, and JavaScript
- Security headers to prevent directory browsing

## SSL/HTTPS Configuration

If you have an SSL certificate installed:
1. Open the `.htaccess` file
2. Find the "Force HTTPS" section (around line 14)
3. Uncomment lines 15-16 by removing the `#` at the beginning:
   ```apache
   # Force HTTPS (uncomment the next 2 lines if you have SSL certificate)
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
4. All HTTP traffic will be automatically redirected to HTTPS

## Need Help?

If you continue to experience issues after following this guide:
1. Check your hosting provider's documentation
2. Contact your hosting support team
3. Verify your domain is correctly pointed to your hosting server

## Summary

**The main fix for the 404 error is the `.htaccess` file.** This file tells the LiteSpeed/Apache web server:
- Which file to serve as the homepage (`index.html`)
- What to show when a page isn't found (`404.html`)
- How to handle URL requests

Make sure this file is uploaded to your server's root directory along with all other files.
