# Configuration Check for 404 Error

Since `test.html` also doesn't work, the files are either:
1. In the wrong directory
2. Your domain is pointing to the wrong directory

## Step 1: Find Where Your Domain Points

### Option A: Check Domain/Subdomain Settings in cPanel

1. Log into cPanel
2. Look for **"Domains"** or **"Subdomains"** in the main menu
3. Click on it
4. Find your domain name in the list
5. **Look at the "Document Root"** column - this tells you where your domain is looking for files

Common document root paths:
- `/home/username/public_html` (for main domain)
- `/home/username/public_html/subdomain` (for subdomains)
- `/home/username/subdomain` (for some subdomain configs)

### Option B: Check What Directory You're Actually Using

In cPanel File Manager:
1. Look at the top - what directory path is shown?
2. Common locations:
   - `/home/username/public_html/` ← Files should be here for main domain
   - `/home/username/public_html/subdomain/` ← Files should be here for subdomains
   - `/home/username/` ← Files are in wrong place!

## Step 2: Match Files to Document Root

**The document root shown in Domains MUST match where your files are located.**

### Scenario A: Using Main Domain (yourdomain.com)

**Document Root should be:** `/home/username/public_html` or just `public_html`

**Your files should be directly in:** `public_html/`
```
public_html/
  ├── .htaccess
  ├── index.html
  ├── test.html
  └── (all other files)
```

### Scenario B: Using a Subdomain (subdomain.yourdomain.com)

**Document Root might be:** `/home/username/public_html/subdomain` or `/home/username/subdomain`

**Your files should be in that specific subdomain directory:**
```
public_html/
  └── subdomain/
      ├── .htaccess
      ├── index.html
      ├── test.html
      └── (all other files)
```

## Step 3: Check Your Current File Location

In cPanel File Manager:

1. **Navigate to where your files currently are**
   - Can you see `index.html` and `test.html`?
   - What's the full path shown at the top?

2. **Compare to Document Root**
   - Does the path match what's shown in Domains → Document Root?

## Step 4: Move Files to Correct Location

### If Files Are in Wrong Location:

**In File Manager:**
1. Select all your files (index.html, .htaccess, css folder, js folder, image folder, etc.)
2. Right-click → **Move**
3. Enter the correct path (the Document Root from Step 1)
4. Click **Move File(s)**

**OR use the drag-and-drop:**
1. Navigate to where files currently are
2. Select all files
3. Drag them to the correct directory (the Document Root)

## Common Mistakes:

### ❌ Wrong: Files in home directory
```
/home/username/
  └── index.html  ← WRONG!
```

### ✅ Correct: Files in public_html
```
/home/username/public_html/
  └── index.html  ← CORRECT!
```

### ❌ Wrong: Files in subdirectory
```
/home/username/public_html/mywebsite/
  └── index.html  ← WRONG! (unless subdomain points here)
```

### ✅ Correct: Files directly in public_html
```
/home/username/public_html/
  └── index.html  ← CORRECT!
```

## Quick Check: What URL Are You Using?

- **Main domain:** `https://yourdomain.com` → Files in `public_html/`
- **Subdomain:** `https://www.yourdomain.com` → Check document root, might need files in `public_html/www/` or different location
- **Subdomain:** `https://subdomain.yourdomain.com` → Files in subdomain directory

## Still Not Sure?

Take a screenshot of:
1. The Domains/Subdomains page showing the Document Root
2. File Manager showing where your files currently are

Or tell me:
- What domain/subdomain URL you're trying to access
- What the Document Root shows in cPanel
- Where your files currently are (the path shown in File Manager)

