document.addEventListener('DOMContentLoaded', function() {
    const menuBarIcon = document.querySelector('.menu-bar-icon');
    const menuBar = document.querySelector('.menu-bar');

    menuBarIcon.addEventListener('click', function() {
        if (menuBar.style.display === 'block') {
            menuBar.style.display = 'none';
        } else {
            menuBar.style.display = 'block';
        }
    });

});
