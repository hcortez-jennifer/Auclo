// NAVBAR DROPDOWN
document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseenter', () => menu.classList.add('show'));
    dropdown.addEventListener('mouseleave', () => menu.classList.remove('show'));
});


