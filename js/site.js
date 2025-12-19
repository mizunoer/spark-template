// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Mythic Rx theme toggles
document.addEventListener('DOMContentLoaded', () => {
    const rootBody = document.body;
    const themeButtons = document.querySelectorAll('[data-theme]');

    themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            rootBody.classList.remove('theme-grey', 'theme-brown');

            if (theme === 'grey') {
                rootBody.classList.add('theme-grey');
            } else if (theme === 'brown') {
                rootBody.classList.add('theme-brown');
            }
        });
    });
});
