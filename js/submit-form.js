$(function () {
    'use strict';

    // Custom email validation: must have @ and .domain
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Custom phone validation: numbers only, 9 chars unless starts with 1
    // Mobile-friendly: accepts various formats (with/without dashes, spaces, parentheses)
    function validatePhone(phone) {
        if (!phone) return false;
        // Remove all non-numeric characters
        const digitsOnly = phone.replace(/\D/g, '');
        // Must be 9 digits, or 10 digits if starts with 1
        if (digitsOnly.length === 9) {
            return true;
        } else if (digitsOnly.length === 10 && digitsOnly[0] === '1') {
            return true;
        }
        return false;
    }
    
    // Format phone number for display (mobile-friendly)
    function formatPhoneInput(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                input.value = value;
            } else if (value.length <= 6) {
                input.value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 10) {
                input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                input.value = value.slice(0, 1) + '-' + value.slice(1, 4) + '-' + value.slice(4, 7) + '-' + value.slice(7, 11);
            }
        }
    }

    // Add custom validation to email inputs
    $('input[type="email"]').on('blur', function() {
        const email = $(this).val();
        if (email && !validateEmail(email)) {
            this.setCustomValidity('Please enter a valid email address (must include @ and domain)');
        } else {
            this.setCustomValidity('');
        }
    });

    // Add custom validation to phone inputs with mobile-friendly formatting
    $('input[type="tel"]').on('input', function() {
        formatPhoneInput(this);
    });
    
    $('input[type="tel"]').on('blur', function() {
        const phone = $(this).val();
        if (phone && !validatePhone(phone)) {
            this.setCustomValidity('Please enter a valid phone number (9 digits, or 10 digits if starting with 1)');
            $(this).addClass('is-invalid');
        } else {
            this.setCustomValidity('');
            $(this).removeClass('is-invalid');
        }
    });
    
    // Clear validation on input for better UX
    $('input[type="tel"]').on('input', function() {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        }
    });
    
    $('input[type="email"]').on('input', function() {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        }
    });

    // Ambil semua formulir yang ingin kita terapkan gaya validasi kustom Bootstrap
    const forms = $('.needs-validation');

    // Loop melalui formulir dan mencegah pengiriman
    forms.on('submit', function (event) {
        const form = $(this);

        var actionInput = $(this).find("input[name='action']");

        // Validate email and phone before standard validation
        let isValid = true;
        form.find('input[type="email"]').each(function() {
            const email = $(this).val();
            if (email && !validateEmail(email)) {
                this.setCustomValidity('Please enter a valid email address (must include @ and domain)');
                isValid = false;
            } else {
                this.setCustomValidity('');
            }
        });

        form.find('input[type="tel"]').each(function() {
            const phone = $(this).val();
            if (phone && !validatePhone(phone)) {
                this.setCustomValidity('Phone number must be 9 digits, or 10 digits if starting with 1');
                isValid = false;
            } else {
                this.setCustomValidity('');
            }
        });

        if (!isValid || !form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $('.submit_form').html('Sending...');
            $('.submit_subscribe').html('Sending...');
            const toast = new bootstrap.Toast($('.success_msg')[0]);
            const errtoast = new bootstrap.Toast($('.error_msg')[0]);
            var formData = form.serialize();
            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        if (actionInput.length > 0) {
                            if (actionInput.val() === 'subscribe') {
                                $('.submit_subscribe').html('Subscribe');
                                const toast_comment = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                                toast_comment.show();
                            }

                        } else {
                            toast.show()
                            $('.submit_form').html('Send Message');
                        }

                    } else {
                        // Show error toast with improved messaging
                        if (errtoast) {
                            errtoast.show();
                        }
                        console.error('Form submission error:', response);
                        $('.submit_form').html('Send Message');
                        $('.submit_subscribe').html('Subscribe');
                    }
                },
                error: function(xhr, status, error) {
                    // Enhanced error handling for network/server errors
                    console.error('AJAX error:', status, error);
                    if (errtoast) {
                        errtoast.show();
                    }
                    $('.submit_form').html('Send Message');
                    $('.submit_subscribe').html('Subscribe');
                }
                }
            });
        }

        form.addClass('was-validated');
    });
});