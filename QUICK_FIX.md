# Quick Fix Guide - Files in Wrong Location

Since `test.html` doesn't work, your files are definitely in the wrong directory.

## The Problem

Your domain is looking in one directory, but your files are in a different directory.

## The Solution (3 Steps)

### Step 1: Find Where Domain Points

1. **Log into cPanel**
2. Click **"Domains"** (or **"Subdomains"** if using a subdomain)
3. Find your domain in the list
4. **Write down the "Document Root"** - it will look like:
   - `/home/username/public_html` ← This is what we need!

### Step 2: Upload info.php to Check

1. Upload the `info.php` file to where you currently have your files
2. Visit: `https://yourdomain.com/info.php`
3. Look at the "Document Root" shown on the page
4. **Compare it to where your files are**

### Step 3: Move Files to Match Document Root

**If Document Root shows:** `/home/username/public_html`

**Then your files MUST be in:** `public_html/` directory

**How to move files in cPanel File Manager:**

1. Navigate to where your files currently are
2. Select ALL files and folders (index.html, .htaccess, css/, js/, image/, etc.)
3. Right-click → **Move**
4. Enter: `/home/username/public_html` (or just `public_html` if already in home directory)
5. Click **Move File(s)**
6. Confirm the move

**OR use drag and drop:**
1. In File Manager, open two tabs/windows
2. One tab: where files currently are
3. Other tab: navigate to `public_html` (the Document Root)
4. Drag files from first tab to second tab

## Verification

After moving files:

1. Visit: `https://yourdomain.com/test.html` ← Should work now!
2. Visit: `https://yourdomain.com/index.html` ← Should work!
3. Visit: `https://yourdomain.com/` ← Should show homepage!

## Common Scenarios

### Scenario 1: Files in Home Directory
**Current location:** `/home/username/index.html`  
**Should be:** `/home/username/public_html/index.html`  
**Fix:** Move everything into `public_html/` folder

### Scenario 2: Files in Subdirectory
**Current location:** `/home/username/public_html/mywebsite/index.html`  
**Should be:** `/home/username/public_html/index.html`  
**Fix:** Move files up one level to `public_html/`

### Scenario 3: Using Subdomain
**Document Root:** `/home/username/public_html/subdomain`  
**Files should be:** In that subdomain directory  
**Fix:** Move files to match the subdomain's document root

## Still Confused?

Upload `info.php` and tell me:
1. What "Document Root" shows
2. What "Current Directory" shows
3. Whether index.html shows as "exists" or "NOT found"

Then I can give you exact instructions!

