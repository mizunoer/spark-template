# Troubleshooting 404 Error on cPanel/LiteSpeed

Since you're still getting a 404 error, let's diagnose step by step.

## Quick Diagnostic Test

1. **Test if the server works at all:**
   - Try visiting: `https://yourdomain.com/test.html`
   - If test.html works → The server is fine, but `index.html` isn't being recognized as default
   - If test.html also gives 404 → Files are in wrong location or domain isn't pointing correctly

2. **Test direct access to index.html:**
   - Try visiting: `https://yourdomain.com/index.html`
   - If this works → The `.htaccess` DirectoryIndex isn't working
   - If this also gives 404 → `index.html` file is missing or in wrong location

## Common Issues & Solutions

### Issue 1: Files in Wrong Directory

**Check this first!**

In cPanel File Manager:
- Look at the URL bar - it should show `/public_html` or `/home/username/public_html`
- Your `index.html` MUST be directly in `public_html/`
- NOT in a subdirectory like `public_html/website/` or `public_html/spark-template/`

**Solution:**
- Move all files to be directly in `public_html/`
- The structure should be:
  ```
  public_html/
    ├── .htaccess
    ├── index.html
    ├── test.html
    ├── about.html
    └── (other files)
  ```

### Issue 2: Domain Document Root Configuration

**How to check:**
1. In cPanel, go to **Domains** (or **Subdomains**)
2. Click on your domain
3. Check what the "Document Root" shows
4. It should be something like: `/home/username/public_html` or `/public_html`

**Solution:**
- If it shows a different directory, you need to either:
  - Move your files to that directory, OR
  - Change the document root to `public_html`

### Issue 3: .htaccess Not Being Read (LiteSpeed Specific)

LiteSpeed web server sometimes requires different syntax. The current `.htaccess` is minimal and should work, but let's verify:

**Check .htaccess is actually on server:**
1. In cPanel File Manager, enable "Show Hidden Files" (gear icon settings)
2. Look for `.htaccess` in `public_html/`
3. Make sure it exists and has content

**If .htaccess exists but doesn't work:**
- Some hosts disable `.htaccess` for security
- Contact your hosting provider to enable `.htaccess` support
- OR use cPanel's "Indexes" feature to set default index files

### Issue 4: Case Sensitivity

Linux servers are case-sensitive. Make sure:
- File is named exactly `index.html` (lowercase 'i')
- NOT `Index.html`, `INDEX.html`, or `index.HTML`

### Issue 5: File Permissions

In cPanel File Manager:
1. Right-click on `index.html` → **Change Permissions**
2. Set to `644` (owner: read/write, group: read, public: read)
3. Make sure the file is readable by the web server

### Issue 6: Alternative - Use cPanel Index Manager

If `.htaccess` doesn't work, you can set default index files in cPanel:

1. In cPanel, search for "Indexes" in the search bar
2. Open **Indexes** tool
3. Navigate to `public_html/`
4. Click "Set index priority"
5. Add `index.html` as the first priority index file

## Step-by-Step Verification Checklist

Go through each item and check it off:

- [ ] Files are in `public_html/` directory (not a subdirectory)
- [ ] `index.html` exists in `public_html/` (not just in a folder)
- [ ] `.htaccess` file exists in `public_html/` (enable "Show Hidden Files" to see it)
- [ ] File permissions: `index.html` is `644`, directories are `755`
- [ ] `test.html` works when accessed directly (`yourdomain.com/test.html`)
- [ ] `index.html` works when accessed directly (`yourdomain.com/index.html`)
- [ ] Domain's document root is set to `public_html` (check in Domains section)
- [ ] Tried accessing the site in incognito/private browser mode
- [ ] Cleared browser cache (Ctrl+F5 or Cmd+Shift+R)

## What to Tell Your Hosting Provider

If nothing above works, contact your host with this information:

1. "I'm getting a 404 error when accessing my domain root"
2. "My `index.html` file is in `public_html/` directory"
3. "I have a `.htaccess` file with `DirectoryIndex index.html`"
4. "When I access `yourdomain.com/index.html` directly, it [works/doesn't work]"
5. "When I access `yourdomain.com/test.html` directly, it [works/doesn't work]"
6. "I'm using LiteSpeed Web Server (as shown in the error page)"

## Last Resort: Create index.php

If nothing else works, create a simple `index.php` file that redirects or includes your HTML:

```php
<?php
// Option 1: Redirect to index.html
header('Location: index.html');
exit;

// OR Option 2: Include the HTML content
readfile('index.html');
?>
```

Since PHP is usually enabled by default, this might work when `.htaccess` doesn't.

