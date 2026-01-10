# Image Review & Voting System

A secure image review and voting system for client image approval workflows.

## Features

✅ **Image Upload** - Secure file upload with validation
✅ **Category Organization** - Organize images by category (Pending, Updates, Banners, Logos, Team, Facility)
✅ **Voting System** - Upvote/downvote images for review
✅ **Tabbed Interface** - Easy navigation between categories
✅ **Security** - Isolated upload directory with .htaccess protection
✅ **Responsive Design** - Works on desktop and mobile devices

## Quick Start

1. **Access the page**: Navigate to `image-review.html` in your browser

2. **Upload images**:
   - Click "Select Images" or drag and drop files
   - Choose a category
   - Click "Upload Images"

3. **Review images**:
   - Click on category tabs to view images
   - Use thumbs up/down buttons to vote
   - View vote counts for each image

## File Structure

```
├── image-review.html          # Main review page
├── js/
│   └── image-review.js        # Voting and upload functionality
├── php/
│   ├── upload_images.php      # Secure upload handler
│   ├── get_images.php         # Image retrieval API
│   └── serve_image.php        # Secure image serving
├── uploads/                   # Isolated upload directory
│   ├── pending/
│   ├── updates/
│   ├── banners/
│   ├── logos/
│   ├── team/
│   └── facility/
└── IMAGE_REVIEW_SECURITY.md   # Security documentation
```

## Security

All uploaded images are:
- Validated for file type and size
- Stored in isolated directories with .htaccess protection
- Served through secure PHP scripts (no direct access)
- Sanitized filenames to prevent directory traversal

**See `IMAGE_REVIEW_SECURITY.md` for complete security details.**

## Categories

- **Pending Review** - New images awaiting approval
- **Possible Updates** - Images being considered for updates
- **Banners** - Banner/hero images
- **Logos** - Logo variations and alternatives
- **Team Photos** - Staff and team member photos
- **Facility Photos** - Facility and laboratory images

## Voting

- Click thumbs up 👍 to approve/recommend an image
- Click thumbs down 👎 to reject/not recommend
- Click again to remove your vote
- Vote counts are displayed as net score (upvotes - downvotes)

**Note**: Current implementation uses browser localStorage. For production, implement server-side voting (see security docs).

## Setup

See `IMAGE_REVIEW_SETUP.md` for detailed setup instructions.

## Support

- **Security Questions**: See `IMAGE_REVIEW_SECURITY.md`
- **Setup Help**: See `IMAGE_REVIEW_SETUP.md`
- **General Issues**: Check browser console and PHP error logs

