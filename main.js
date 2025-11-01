document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('nav');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    // Handle scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    };

    // Close mobile menu when clicking a link
    const closeMenuOnClick = (e) => {
        if (e.target.classList.contains('nav-link')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    navLinks.addEventListener('click', closeMenuOnClick);
});