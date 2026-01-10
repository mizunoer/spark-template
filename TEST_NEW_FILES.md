# Testing New File Detection

To verify that new files in `uploads/facility/`, `uploads/logos/`, or `uploads/team/` will be automatically tracked:

1. Add a new image file to one of these folders (e.g., `uploads/facility/test-image.jpg`)
2. Run `git status` - the file should appear as untracked
3. Run `git add uploads/facility/test-image.jpg` - it should add without needing `-f`
4. The file should now be ready to commit

If new files still aren't showing up, it might be because:
- They're in a subdirectory (current patterns only match files directly in facility/logos/team, not subdirectories)
- The file extension doesn't match (only .jpg, .JPG, .png, .PNG, .gif, .webp, .jpeg, .JPEG are allowed)
- There's a case sensitivity issue with the filename
