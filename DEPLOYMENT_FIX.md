# Deployment Fix - Custom Document Root

## Your Configuration

- **Domain:** mythic-rx.com
- **Document Root:** `/repositories/mythic-rx.com`
- **Issue:** Files are probably in `public_html/` but need to be in `/repositories/mythic-rx.com/`

## The Fix

Your files MUST be in: `/repositories/mythic-rx.com/`

NOT in `public_html/` (which is the standard location, but not yours!)

## Steps to Fix

### Step 1: Access the Correct Directory in cPanel File Manager

1. Log into cPanel
2. Open **File Manager**
3. In the navigation/address bar, you need to navigate to: `/repositories/mythic-rx.com`
   - You might need to go up to root level first
   - Then navigate into `repositories/` folder
   - Then into `mythic-rx.com/` folder

**OR** use the path box at the top of File Manager:
- Type or paste: `/repositories/mythic-rx.com`
- Press Enter

### Step 2: Check What's Currently There

Once you're in `/repositories/mythic-rx.com/`:
- Do you see any files there already?
- Is the directory empty?
- Are there other files/folders?

### Step 3: Move Your Files

You have two options:

#### Option A: Move Files from Current Location

If your files are currently in `public_html/` or another location:

1. In File Manager, navigate to where your files currently are
2. Select ALL files and folders:
   - index.html
   - .htaccess
   - test.html
   - info.php
   - css/ folder
   - js/ folder
   - image/ folder
   - font/ folder
   - php/ folder
   - All other HTML files
3. Right-click → **Move**
4. Enter destination: `/repositories/mythic-rx.com`
5. Click **Move File(s)**

#### Option B: Upload Directly to Correct Location

1. Navigate to `/repositories/mythic-rx.com/` in File Manager
2. Click **Upload** button
3. Upload all your files directly here
4. Make sure to maintain folder structure (css/, js/, image/, etc.)

### Step 4: Verify File Structure

After moving/uploading, `/repositories/mythic-rx.com/` should contain:

```
/repositories/mythic-rx.com/
  ├── .htaccess
  ├── index.html
  ├── test.html
  ├── info.php
  ├── about.html
  ├── contact.html
  ├── services.html
  ├── (all other HTML files)
  ├── css/
  │   └── (CSS files)
  ├── js/
  │   └── (JS files)
  ├── image/
  │   └── (image files)
  ├── font/
  │   └── (font files)
  └── php/
      └── (PHP files)
```

### Step 5: Test

1. Visit: `https://mythic-rx.com/test.html` ← Should work now!
2. Visit: `https://mythic-rx.com/index.html` ← Should work!
3. Visit: `https://mythic-rx.com/` ← Should show homepage!

## Important Notes

- **This is NOT the standard `public_html` location** - your hosting uses a custom setup
- All future files must go in `/repositories/mythic-rx.com/`
- The `.htaccess` file should still work fine once it's in the correct location

## If You Can't Find /repositories/ Directory

Some hosts require you to:
1. Go to the root directory first (click "Go to Root" or navigate to `/`)
2. Then look for `repositories/` folder
3. Then navigate into `mythic-rx.com/`

If you absolutely cannot find this directory, contact your hosting provider and ask:
- "How do I access the `/repositories/mythic-rx.com` directory in File Manager?"
- "My domain's Document Root is `/repositories/mythic-rx.com` - where do I upload files?"

## Alternative: Change Document Root (if possible)

If you prefer to use standard `public_html/`:
1. In cPanel, go to **Domains**
2. Click on `mythic-rx.com`
3. See if you can change the Document Root to `/home/username/public_html`
4. Then move files to `public_html/` instead

But the easiest fix is to just move files to match the current Document Root!

