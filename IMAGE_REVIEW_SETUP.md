# Image Review System - Setup Guide

## Quick Setup

### 1. Create Upload Directories

Create the upload directory structure in your project root:

```bash
mkdir -p uploads/pending
mkdir -p uploads/updates
mkdir -p uploads/banners
mkdir -p uploads/logos
mkdir -p uploads/team
mkdir -p uploads/facility
```

Or on Windows:
```powershell
mkdir uploads\pending
mkdir uploads\updates
mkdir uploads\banners
mkdir uploads\logos
mkdir uploads\team
mkdir uploads\facility
```

### 2. Set Directory Permissions

On Linux/Mac (via SSH or cPanel File Manager):
```bash
chmod 755 uploads
chmod 755 uploads/*
```

On Windows, right-click each folder → Properties → Security → Edit permissions to allow write access.

### 3. Create .htaccess Files

Each upload subdirectory needs a `.htaccess` file to prevent direct access. The PHP upload script will create these automatically, but you can also create them manually:

**uploads/pending/.htaccess:**
```
Order Deny,Allow
Deny from all
```

Copy this file to all other subdirectories (updates, banners, logos, team, facility).

### 4. Test the System

1. Open `image-review.html` in your browser
2. Try uploading a test image
3. Select a category (e.g., "Pending Review")
4. Click "Select Images" and choose an image file
5. Click "Upload Images"
6. Check that the image appears in the correct category tab

### 5. Verify File Structure

Your directory structure should look like this:

```
your-project/
├── image-review.html
├── uploads/
│   ├── pending/
│   │   ├── .htaccess
│   │   └── [uploaded images]
│   ├── updates/
│   │   ├── .htaccess
│   │   └── [uploaded images]
│   ├── banners/
│   ├── logos/
│   ├── team/
│   └── facility/
├── php/
│   ├── upload_images.php
│   ├── get_images.php
│   └── serve_image.php
└── js/
    └── image-review.js
```

## Troubleshooting

### Upload Fails

**Check PHP Settings:**
- `upload_max_filesize` in php.ini should be at least 10M
- `post_max_size` should be at least 12M
- `file_uploads` should be On

**Check File Permissions:**
- Upload directories must be writable (755 for directories, 644 for files)
- PHP process needs write access

**Check Error Logs:**
- Check PHP error log for specific error messages
- Check browser console for JavaScript errors

### Images Not Displaying

**Verify Paths:**
- Ensure `serve_image.php` can access the uploads directory
- Check that image files actually exist in the directories
- Verify `.htaccess` files are present (they block direct access but allow PHP scripts)

**Check Browser Console:**
- Look for 404 errors when loading images
- Verify AJAX calls to `get_images.php` are successful

### Voting Not Working

- Votes are currently stored in browser localStorage (client-side only)
- For production, implement server-side voting (see `IMAGE_REVIEW_SECURITY.md`)
- Check browser console for JavaScript errors

## Security Checklist Before Production

- [ ] Move uploads directory outside web root (recommended)
- [ ] Add authentication/authorization
- [ ] Implement rate limiting
- [ ] Set up virus scanning
- [ ] Configure proper file permissions
- [ ] Review and test all security measures in `IMAGE_REVIEW_SECURITY.md`

## Adding the Page to Navigation

To add the Image Review page to your main navigation, update `index.html` and other pages:

```html
<li class="nav-item">
    <a class="nav-link" href="image-review.html">Image Review</a>
</li>
```

Or add it to a dropdown menu if you prefer.

## Customization

### Adding New Categories

1. Add category to `$allowedCategories` array in:
   - `php/upload_images.php`
   - `php/get_images.php`
   - `php/serve_image.php`

2. Create directory: `mkdir uploads/your-category`

3. Add tab to `image-review.html`:
```html
<li class="nav-item">
    <button class="nav-link" id="your-category-tab" data-bs-toggle="tab" 
            data-bs-target="#your-category" type="button" role="tab">
        Your Category
    </button>
</li>
```

4. Add tab content:
```html
<div class="tab-pane fade" id="your-category" role="tabpanel">
    <div class="image-grid" id="your-categoryGrid"></div>
</div>
```

5. Add category to upload form dropdown:
```html
<option value="your-category">Your Category</option>
```

### Changing File Size Limits

Edit `php/upload_images.php`:
```php
$maxFileSize = 10 * 1024 * 1024; // Change 10 to your desired MB
```

Also update `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 12M
```

## Support

For security questions, refer to `IMAGE_REVIEW_SECURITY.md`.

For deployment questions, refer to `DEPLOYMENT.md`.

