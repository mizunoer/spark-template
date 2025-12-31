# Git Repository Deployment Fix

## The Problem

- Site worked when files were at root
- After adding git and moving to repo, it broke
- Getting default LiteSpeed 404 (not your custom 404.html)
- Document Root is `/repositories/mythic-rx.com`

This means files are probably in a **subdirectory** within the git repository!

## Diagnosis: Check File Structure

In cPanel File Manager, navigate to `/repositories/mythic-rx.com/` and check:

**Are your files directly there?**
```
/repositories/mythic-rx.com/
  ├── index.html  ← Files here?
  ├── .htaccess
  └── css/
```

**OR are they in a subdirectory?**
```
/repositories/mythic-rx.com/
  ├── .git/  ← Git repository folder
  ├── spark-template/  ← Files might be HERE!
  │   ├── index.html
  │   ├── .htaccess
  │   └── css/
  └── (other git-related files)
```

## Solution Options

### Option 1: Move Files to Repository Root (Recommended)

If your files are in a subdirectory like `spark-template/`:

1. **In File Manager, navigate to:** `/repositories/mythic-rx.com/spark-template/` (or whatever subdirectory)
2. **Select ALL files and folders** (index.html, .htaccess, css/, js/, image/, etc.)
3. **Right-click → Move**
4. **Destination:** `/repositories/mythic-rx.com` (the parent directory)
5. **Move the files**

**Important:** Don't move the `.git/` folder, just the website files!

### Option 2: Update Document Root to Point to Subdirectory

If you want to keep files in the subdirectory:

1. **In cPanel, go to Domains**
2. **Click on `mythic-rx.com`**
3. **Change Document Root** from:
   - `/repositories/mythic-rx.com`
   
   To:
   - `/repositories/mythic-rx.com/spark-template` (or whatever subdirectory has your files)

4. **Save the changes**

### Option 3: Use Git Deployment Hook (Advanced)

If you're using git deployment with a hook:

1. The deployment hook might be copying files to a different location
2. Check if there's a `.git/hooks/post-receive` or similar hook
3. It might need to be configured to copy files to the repository root

## Quick Check List

Before fixing, verify:

- [ ] Where are the files actually located? (`/repositories/mythic-rx.com/` or a subdirectory?)
- [ ] Is there a `.git/` folder in `/repositories/mythic-rx.com/`?
- [ ] Are `index.html` and `.htaccess` in the same directory as `.git/` or in a subdirectory?
- [ ] What does the directory structure look like?

## After Moving Files

Once files are in the correct location:

1. **Verify structure:**
   ```
   /repositories/mythic-rx.com/
     ├── .git/  (git folder, leave it)
     ├── index.html
     ├── .htaccess
     ├── css/
     ├── js/
     └── (other files)
   ```

2. **Test:**
   - `https://mythic-rx.com/index.html` should work
   - `https://mythic-rx.com/` should show homepage
   - Should see YOUR custom 404 page (not LiteSpeed default)

## Why This Happened

When you set up git, the repository was probably created as:
- `/repositories/mythic-rx.com/` (the repo root)

But you cloned/pushed files into:
- `/repositories/mythic-rx.com/spark-template/` (a subdirectory)

The Document Root still points to `/repositories/mythic-rx.com/`, so it can't find files in the subdirectory!

## Recommendation

**Use Option 1** - Move website files to the repository root. This keeps git and website files together, but ensures the Document Root can find them.

