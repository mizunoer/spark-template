// Image Upload and Review System
$(document).ready(function() {
    'use strict';

    // Initialize
    const categories = ['pending', 'updates', 'banners', 'logos', 'team', 'facility'];
    const uploadedImages = [];
    let selectedFiles = [];

    // Load images from server
    function loadImages(category) {
        const gridId = category + 'Grid';
        const $grid = $('#' + gridId);
        $grid.html('<div class="text-center p-5"><i class="fa-solid fa-spinner fa-spin"></i> Loading images...</div>');
        getImagesByCategory(category);
    }

    // Get images by category from server
    function getImagesByCategory(category) {
        // Make AJAX call to get images from server
        $.ajax({
            url: 'php/get_images.php',
            method: 'GET',
            data: { category: category },
            dataType: 'json',
            success: function(response) {
                if (response.success && response.images) {
                    displayImages(category, response.images);
                } else {
                    displayEmptyState(category);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading images for category: ' + category);
                console.error('Status: ' + status);
                console.error('Error: ' + error);
                if (xhr.responseText) {
                    console.error('Response: ' + xhr.responseText);
                }
                displayEmptyState(category);
            }
        });
    }

    // Display images in grid
    function displayImages(category, images) {
        const gridId = category + 'Grid';
        const $grid = $('#' + gridId);
        $grid.empty();

        if (images.length === 0) {
            displayEmptyState(category);
            return;
        }

        images.forEach(function(image) {
            const voteData = getVoteData(image.id);
            const upvotes = voteData.upvotes || 0;
            const downvotes = voteData.downvotes || 0;
            const totalVotes = upvotes + downvotes;
            
            const card = `
                <div class="image-card" data-image-id="${image.id}">
                    <img src="php/serve_image.php?path=${encodeURIComponent(image.path)}&category=${encodeURIComponent(category)}" alt="${image.name}" loading="lazy">
                    <div class="image-card-body">
                        <div class="image-meta">
                            <strong>${image.name}</strong><br>
                            <small>Uploaded: ${image.date || 'Unknown'}</small>
                            ${image.width && image.height ? '<br><small>Dimensions: ' + image.width + ' × ' + image.height + ' px</small>' : ''}
                        </div>
                        <div class="vote-section">
                            <div class="vote-buttons">
                                <button class="btn-vote vote-up" 
                                        data-image-id="${image.id}" data-vote="up">
                                    <i class="fa-solid fa-thumbs-up"></i> <span class="vote-up-count">${upvotes}</span>
                                </button>
                                <button class="btn-vote vote-down" 
                                        data-image-id="${image.id}" data-vote="down">
                                    <i class="fa-solid fa-thumbs-down"></i> <span class="vote-down-count">${downvotes}</span>
                                </button>
                            </div>
                            <div class="vote-count">
                                <small>Total: ${totalVotes}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $grid.append(card);
        });
    }

    // Display empty state
    function displayEmptyState(category) {
        const gridId = category + 'Grid';
        const $grid = $('#' + gridId);
        $grid.html(`
            <div class="empty-state w-100">
                <i class="fa-solid fa-images"></i>
                <p>No images in this category yet.</p>
            </div>
        `);
    }

    // Get vote data for an image
    function getVoteData(imageId) {
        const stored = localStorage.getItem('votes_' + imageId);
        return stored ? JSON.parse(stored) : { upvotes: 0, downvotes: 0, userVote: null };
    }

    // Save vote data
    function saveVoteData(imageId, voteData) {
        localStorage.setItem('votes_' + imageId, JSON.stringify(voteData));
    }

    // Handle voting - aggregate counts (each click adds to count)
    $(document).on('click', '.btn-vote', function() {
        const $btn = $(this);
        const imageId = $btn.data('image-id');
        const vote = $btn.data('vote');
        const $card = $btn.closest('.image-card');
        
        let voteData = getVoteData(imageId);

        // Aggregate votes - each click increments the count
        if (vote === 'up') {
            voteData.upvotes = (voteData.upvotes || 0) + 1;
        } else {
            voteData.downvotes = (voteData.downvotes || 0) + 1;
        }

        saveVoteData(imageId, voteData);

        // Update UI with aggregate counts
        const upvotes = voteData.upvotes || 0;
        const downvotes = voteData.downvotes || 0;
        const totalVotes = upvotes + downvotes;
        
        $card.find('.vote-up-count').text(upvotes);
        $card.find('.vote-down-count').text(downvotes);
        $card.find('.vote-count small').text('Total: ' + totalVotes);
        
        // Brief visual feedback on click
        $btn.addClass('voted-' + vote);
        setTimeout(function() {
            $btn.removeClass('voted-' + vote);
        }, 300);

        // In production, send vote to server
        // $.ajax({
        //     url: 'php/vote.php',
        //     method: 'POST',
        //     data: { imageId: imageId, vote: vote },
        //     success: function(response) { console.log('Vote saved'); }
        // });
    });

    // File upload handling
    const $dropzone = $('#dropzone');
    const $fileInput = $('#imageFiles');
    const $preview = $('#uploadPreview');
    const $uploadForm = $('#imageUploadForm');
    const $cancelBtn = $('#cancelUpload');

    // Click to select files
    $dropzone.on('click', function() {
        $fileInput.click();
    });

    // File input change
    $fileInput.on('change', function(e) {
        handleFiles(e.target.files);
    });

    // Drag and drop
    $dropzone.on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('dragover');
    });

    $dropzone.on('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragover');
    });

    $dropzone.on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragover');
        
        const files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    // Handle selected files
    function handleFiles(files) {
        selectedFiles = Array.from(files);
        $preview.empty().show();
        $cancelBtn.show();

        selectedFiles.forEach(function(file, index) {
            if (!file.type.match('image.*')) {
                alert(file.name + ' is not an image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = `
                    <div class="upload-preview-item" data-index="${index}">
                        <img src="${e.target.result}" alt="${file.name}">
                        <button type="button" class="remove-btn" data-index="${index}">×</button>
                    </div>
                `;
                $preview.append(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }

    // Remove preview item
    $(document).on('click', '.remove-btn', function() {
        const index = parseInt($(this).data('index'));
        selectedFiles.splice(index, 1);
        $(this).closest('.upload-preview-item').remove();
        
        // Re-index remaining items
        $preview.find('.upload-preview-item').each(function(i) {
            $(this).attr('data-index', i);
            $(this).find('.remove-btn').attr('data-index', i);
        });

        if (selectedFiles.length === 0) {
            $preview.hide();
            $cancelBtn.hide();
        }
    });

    // Cancel upload
    $cancelBtn.on('click', function() {
        selectedFiles = [];
        $preview.empty().hide();
        $fileInput.val('');
        $(this).hide();
    });

    // Form submission
    $uploadForm.on('submit', function(e) {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            alert('Please select at least one image to upload.');
            return;
        }

        const category = $('#imageCategory').val();
        const formData = new FormData();
        formData.append('category', category);

        selectedFiles.forEach(function(file, index) {
            formData.append('images[]', file);
        });

        const $uploadBtn = $('#uploadBtn');
        const $progress = $('#uploadProgress');
        const $progressBar = $progress.find('.progress-bar');
        const $message = $('#uploadMessage');

        $uploadBtn.prop('disabled', true).html('<span>Uploading...</span>');
        $progress.show();
        $message.html('').hide();

        $.ajax({
            url: 'php/upload_images.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            xhr: function() {
                const xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        const percentComplete = (e.loaded / e.total) * 100;
                        $progressBar.css('width', percentComplete + '%');
                    }
                }, false);
                return xhr;
            },
            success: function(response) {
                try {
                    const data = typeof response === 'string' ? JSON.parse(response) : response;
                    
                    if (data.success) {
                        $message.html('<div class="alert alert-success">Images uploaded successfully!</div>').show();
                        $progress.hide();
                        
                        // Clear form
                        selectedFiles = [];
                        $preview.empty().hide();
                        $fileInput.val('');
                        $cancelBtn.hide();
                        
                        // Clear form
                        setTimeout(function() {
                            // Reload images for the category
                            loadImages(category);
                            
                            // Switch to the uploaded category tab
                            $('#' + category + '-tab').tab('show');
                        }, 1000);
                    } else {
                        $message.html('<div class="alert alert-danger">Error: ' + (data.message || 'Upload failed') + '</div>').show();
                    }
                } catch (e) {
                    $message.html('<div class="alert alert-danger">Error processing server response.</div>').show();
                }
                
                $uploadBtn.prop('disabled', false).html('<span>Upload Images</span>');
                $progressBar.css('width', '0%');
            },
            error: function(xhr, status, error) {
                $message.html('<div class="alert alert-danger">Upload failed: ' + error + '</div>').show();
                $uploadBtn.prop('disabled', false).html('<span>Upload Images</span>');
                $progressBar.css('width', '0%');
                $progress.hide();
            }
        });
    });

    // Load images when tab is shown
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
        const target = $(e.target).data('bs-target');
        const category = target.replace('#', '');
        loadImages(category);
    });

    // Load initial images for active tab
    const activeTab = $('.nav-link.active').data('bs-target');
    if (activeTab) {
        const category = activeTab.replace('#', '');
        loadImages(category);
    }
});

