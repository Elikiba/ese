document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const nav = document.querySelector('nav');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    const modalContainer = document.getElementById('projectModals');
    const modals = document.querySelectorAll('.modal');
    const projectCards = document.querySelectorAll('.project-card');

    // Nav: change background when scrolled
    const handleScroll = () => {
        if (!nav) return;
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile menu toggle
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.addEventListener('click', (e) => {
            if (e.target.classList && e.target.classList.contains('nav-link')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    // Intersection observer for entrance animations
    try {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.expertise-card, .project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    } catch (err) {
        // ignore if IntersectionObserver is not supported
    }

    // Contact form (simple client-side feedback)
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (!submitBtn) return;
            const originalText = submitBtn.querySelector('span') ? submitBtn.querySelector('span').textContent : submitBtn.textContent;
            submitBtn.querySelector('span') && (submitBtn.querySelector('span').textContent = 'Sending...');
            submitBtn.disabled = true;

            // Simulate send
            setTimeout(() => {
                submitBtn.querySelector('span') && (submitBtn.querySelector('span').textContent = 'Message Sent!');
                contactForm.reset();
                setTimeout(() => {
                    if (submitBtn.querySelector('span')) submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }, 1000);
        });
    }

    // Modal helpers
    function showModal(modalId) {
        if (!modalContainer) return;
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modalContainer.style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModals() {
        if (!modalContainer) return;
        modalContainer.style.display = 'none';
        modals.forEach(m => (m.style.display = 'none'));
        document.body.style.overflow = '';
    }

    // Attach click to project cards (expects project1Modal, project2Modal, ...)
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showModal(`project${index + 1}Modal`);
        });
    });

    // Close modal on container click (outside modal) or specific close buttons
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) hideModals();
            if (e.target.classList && (e.target.classList.contains('close-modal') || e.target.classList.contains('close-btn'))) {
                hideModals();
            }
        });
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModals();
    });
});

