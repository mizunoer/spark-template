$(function () {
    'use strict';

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // US / NANP: 10 digits (e.g. 8018985536), or 11 digits with country code 1 (e.g. 18018985536)
    var PHONE_HINT = 'Enter 10 digits, or 11 digits starting with 1 (e.g. 1-801-898-5536).';

    function validatePhone(phone) {
        if (!phone) return false;
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length === 10) {
            return true;
        }
        if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
            return true;
        }
        return false;
    }

    function formatPhoneInput(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (value.length === 0) {
            input.value = '';
            return;
        }
        if (value[0] === '1') {
            const rest = value.slice(1);
            if (rest.length === 0) {
                input.value = '1';
            } else if (rest.length <= 3) {
                input.value = '1-' + rest;
            } else if (rest.length <= 6) {
                input.value = '1-' + rest.slice(0, 3) + '-' + rest.slice(3);
            } else {
                input.value = '1-' + rest.slice(0, 3) + '-' + rest.slice(3, 6) + '-' + rest.slice(6, 10);
            }
        } else if (value.length <= 3) {
            input.value = value;
        } else if (value.length <= 6) {
            input.value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
    }

    $('input[type="email"]').on('blur', function() {
        const email = $(this).val();
        if (email && !validateEmail(email)) {
            this.setCustomValidity('Please enter a valid email address (must include @ and domain)');
        } else {
            this.setCustomValidity('');
        }
    });

    $('input[type="tel"]').on('input', function() {
        formatPhoneInput(this);
    });

    $('input[type="tel"]').on('blur', function() {
        const phone = $(this).val();
        if (phone && !validatePhone(phone)) {
            this.setCustomValidity(PHONE_HINT);
            $(this).addClass('is-invalid');
        } else {
            this.setCustomValidity('');
            $(this).removeClass('is-invalid');
        }
    });

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

    const forms = $('.needs-validation');

    forms.on('submit', function (event) {
        const form = $(this);

        var actionInput = $(this).find("input[name='action']");

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
                this.setCustomValidity(PHONE_HINT);
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
            event.stopPropagation();

            const $submit = form.find('.submit_form');
            const defaultBtnHtml = $submit.data('defaultHtml') || $submit.html();
            $submit.data('defaultHtml', defaultBtnHtml);
            $submit.html('Sending...');

            $('.submit_subscribe').not('.submit_form').each(function () {
                const $s = $(this);
                const d = $s.data('defaultHtml') || $s.html();
                $s.data('defaultHtml', d);
                $s.html('Sending...');
            });

            var formData = form.serialize();

            // Toasts live in the same column wrapper as the form (sibling to form)
            const $toastScope = form.parent();
            const successEl = $toastScope.find('.success_msg').get(0);
            const errEl = $toastScope.find('.error_msg').get(0);
            const toast = successEl ? new bootstrap.Toast(successEl) : null;
            const errtoast = errEl ? new bootstrap.Toast(errEl) : null;

            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                dataType: 'text',
                success: function (response) {
                    const ok = String(response).trim() === 'success';
                    $submit.html($submit.data('defaultHtml') || defaultBtnHtml);
                    $('.submit_subscribe').each(function () {
                        const $s = $(this);
                        $s.html($s.data('defaultHtml') || 'Subscribe');
                    });

                    if (ok) {
                        if (actionInput.length > 0 && actionInput.val() === 'subscribe') {
                            const subEl = $('.success_msg_subscribe')[0];
                            if (subEl) {
                                new bootstrap.Toast(subEl).show();
                            }
                        } else {
                            if (toast) {
                                toast.show();
                            } else if (successEl) {
                                successEl.classList.add('show');
                            }
                            form[0].reset();
                            form.removeClass('was-validated');
                        }
                    } else {
                        if (errtoast) {
                            errtoast.show();
                        }
                        console.error('Form submission error:', response);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('AJAX error:', status, error, xhr.status);
                    $submit.html($submit.data('defaultHtml') || defaultBtnHtml);
                    $('.submit_subscribe').each(function () {
                        const $s = $(this);
                        $s.html($s.data('defaultHtml') || 'Subscribe');
                    });
                    if (errtoast) {
                        errtoast.show();
                    } else {
                        alert('Could not send. Check your connection, or email info@mythic-rx.com directly.');
                    }
                }
            });
        }

        form.addClass('was-validated');
    });
});
