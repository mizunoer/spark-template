# Deployment Guide for cPanel

This guide will help you deploy your static website to a cPanel hosting server.

## Common 404 Error Causes

1. **Files not in the correct directory** - Files must be in `public_html` (or `www` in some cases)
2. **Missing .htaccess file** - The `.htaccess` file configures the server to serve `index.html` as the default page
3. **Incorrect file permissions** - Files should typically be 644, directories 755
4. **Case sensitivity** - Some servers are case-sensitive (Linux servers)

## Step-by-Step Deployment

### 1. Prepare Your Files

Make sure you have all the necessary files:
- `index.html` (main homepage)
- All other HTML pages (about.html, contact.html, etc.)
- `css/` directory with all CSS files
- `js/` directory with all JavaScript files
- `image/` directory with all images
- `font/` directory with all fonts
- `.htaccess` file (included in this project)

### 2. Access cPanel File Manager

1. Log into your cPanel account
2. Navigate to **File Manager**
3. Open the `public_html` directory (or `www` if that's your document root)

### 3. Upload Files

**Option A: Using cPanel File Manager**
1. In File Manager, navigate to `public_html`
2. Click **Upload** button
3. Select all your files and folders
4. Wait for upload to complete

**Option B: Using FTP/SFTP**
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your server using FTP credentials from cPanel
3. Navigate to `public_html` directory
4. Upload all files maintaining the directory structure

### 4. Verify File Structure

Your `public_html` directory should look like this:
```
public_html/
├── .htaccess
├── index.html
├── about.html
├── contact.html
├── services.html
├── (all other HTML files)
├── css/
│   ├── style.css
│   └── (other CSS files)
├── js/
│   ├── script.js
│   └── (other JS files)
├── image/
│   └── (all image files)
├── font/
│   └── (all font files)
└── php/
    └── (PHP files if any)
```

### 5. Set File Permissions

In cPanel File Manager:
1. Right-click on `.htaccess` → **Change Permissions** → Set to `644`
2. Right-click on `index.html` → **Change Permissions** → Set to `644`
3. Right-click on directories → **Change Permissions** → Set to `755`

### 6. Test Your Website

1. Visit your domain name (e.g., `https://yourdomain.com`)
2. The homepage should load automatically
3. Test navigation links to ensure all pages work

## Troubleshooting

### Still Getting 404 Error?

1. **Check Document Root**
   - In cPanel, go to **Domains** → **Your Domain**
   - Verify the document root is set to `public_html` (or `www`)

2. **Verify .htaccess is Uploaded**
   - Make sure `.htaccess` is in the `public_html` directory
   - Some FTP clients hide files starting with a dot
   - In File Manager, enable "Show Hidden Files"

3. **Check File Names**
   - Ensure `index.html` is exactly named `index.html` (case-sensitive on Linux)
   - No extra spaces or characters

4. **Test .htaccess**
   - Temporarily rename `.htaccess` to `.htaccess.bak`
   - If site works, there's an issue with `.htaccess` syntax
   - Check cPanel error logs for specific errors

5. **Check Server Configuration**
   - Some hosts disable `.htaccess` - contact your hosting provider
   - Verify Apache mod_rewrite is enabled

6. **Clear Browser Cache**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Try incognito/private browsing mode

### Common Issues

**Issue: CSS/JS/Images not loading**
- Check file paths in HTML (should be relative: `css/style.css` not `/css/style.css` unless in subdirectory)
- Verify all files uploaded correctly
- Check file permissions

**Issue: PHP forms not working**
- Ensure PHP is enabled on your server
- Check `php/form_process.php` file permissions (should be 644)
- Verify PHP error logs in cPanel

**Issue: Redirect loops**
- Check `.htaccess` rewrite rules
- Verify HTTPS redirect rules if SSL is not configured

## Additional Resources

- cPanel Documentation: https://docs.cpanel.net/
- Apache .htaccess Guide: https://httpd.apache.org/docs/current/howto/htaccess.html

## Need Help?

If you continue to experience issues:
1. Check cPanel error logs (Error Log section in cPanel)
2. Contact your hosting provider's support
3. Verify your domain DNS is pointing to the correct server

