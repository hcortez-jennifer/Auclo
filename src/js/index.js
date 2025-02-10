// NAVBAR DROPDOWN
document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseenter', () => menu.classList.add('show'));
    dropdown.addEventListener('mouseleave', () => menu.classList.remove('show'));
});


// NAVBAR SCROLL COLOR CHANGE
window.addEventListener('scroll', () => {
    let navbar = document.querySelector('.navbar');
    let navbarTogglerIcon = document.querySelector('.navbar-toggler-icon');
    let navbarBrand = document.querySelector('.navbar-brand');
    let navLinks = document.querySelectorAll('.nav-link')
    let navIcons = document.querySelectorAll('.nav-link .bx')
    let dropdownMenu = document.querySelectorAll('.dropdown-menu')
    let scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        navbar.classList.add('navbar__scrolled');
        navbarTogglerIcon.classList.add('navbar-toggler-icon__scrolled');
        navbarBrand.classList.add('navbar-brand__scrolled');
        navLinks.forEach(navLink => navLink.classList.add('nav-links__scrolled'));
        navIcons.forEach(navIcon => navIcon.classList.add('nav-icons__scrolled'));
        dropdownMenu.forEach(dropMenu => dropMenu.classList.add('dropdown-menu__scrolled'));
    } else {
        navbar.classList.remove('navbar__scrolled');
        navbarTogglerIcon.classList.remove('navbar-toggler-icon__scrolled');
        navbarBrand.classList.remove('navbar-brand__scrolled');
        navLinks.forEach(link => link.classList.remove('nav-links__scrolled'));
        navIcons.forEach(navIcon => navIcon.classList.remove('nav-icons__scrolled'));
        dropdownMenu.forEach(dropMenu => dropMenu.classList.remove('dropdown-menu__scrolled'));
    }
});

