# How to Handle Images in Git

## Current Situation

The `.gitignore` file is set to ignore all files in the `uploads/` directory (except `.htaccess` and `.gitkeep` files). This is intentional to prevent large uploaded files from bloating your repository.

## Options for Committing Images

### Option 1: Force Add Specific Images (Recommended for Initial Setup)

If you want to commit specific images that you've manually added, you can force-add them:

```bash
# Force add all images in a specific folder
git add -f uploads/facility/*.jpg
git add -f uploads/facility/*.JPG
git add -f uploads/logos/*.png
git add -f uploads/team/*.png

# Or add all images in all upload folders
git add -f uploads/**/*.jpg uploads/**/*.JPG uploads/**/*.png uploads/**/*.PNG

# Then commit
git commit -m "Add initial facility, logo, and team images"
git push
```

**Note:** After force-adding, these specific images will be tracked even though they match the `.gitignore` pattern.

### Option 2: Update .gitignore to Allow Specific Files

If you want to track specific types of images permanently, you can modify `.gitignore`:

```gitignore
# Uploaded images (exclude from git but keep directory structure)
uploads/**/*
!uploads/**/.htaccess
!uploads/**/.gitkeep

# Allow specific image files you want to track
!uploads/facility/*.jpg
!uploads/facility/*.JPG
!uploads/logos/*.png
!uploads/team/*.png
```

### Option 3: Use Website Upload Interface (For User-Generated Content)

For images that users/clients will upload through the website:
- Use the upload interface on `image-review.html`
- These will be stored in `uploads/` but NOT committed to git
- This is the intended workflow for user-generated content

### Option 4: Separate Folders (Best for Mixed Content)

Create separate folders:
- `uploads/` - User-uploaded images (ignored by git)
- `assets/images/` - Version-controlled images (committed to git)

Then update your PHP scripts to check both locations.

## Recommendation

For your current situation where you've manually added images that you want to be part of the repository:

**Use Option 1 (Force Add)** - This is the quickest solution:

```bash
git add -f uploads/facility/*.jpg uploads/facility/*.JPG
git add -f uploads/logos/*.png
git add -f uploads/team/*.png uploads/team/*.jpeg
git commit -m "Add initial facility, logo, and team images for review"
git push
```

These images will then be tracked and pushed to your repository.
