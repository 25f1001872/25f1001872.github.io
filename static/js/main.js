document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== 1. MOBILE NAVIGATION ====================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation (turning into X)
            burger.classList.toggle('toggle');

            // Animate Links (Fade in effect)
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // [DELETED SECTION 2 TO FIX REDECLARATION ERROR]

    // ==================== 3. SMOOTH SCROLL WITH OFFSET ====================
    // This handles the clicks on navbar links so they don't get hidden behind the fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }

                // Scroll with offset (70px is your navbar height)
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==================== 4. SCROLL REVEAL ANIMATION ====================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const skillsGrids = document.querySelectorAll('.skills-grid');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        // Reveal general elements
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });

        // Animate skill boxes
        skillsGrids.forEach(grid => {
            const gridTop = grid.getBoundingClientRect().top;
            
            if (gridTop < windowHeight - revealPoint) {
                grid.classList.add('animate');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
    // Run once on load
    revealOnScroll();

    // ==================== 5. NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');

    function navbarScrollEffect() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', navbarScrollEffect);

    // ==================== 6. PAGE LOADER (OPTIONAL) ====================
    const pageLoader = document.querySelector('.page-loader');
    
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('loaded');
            }, 500);
        });
    }

    // ==================== 7. ENHANCED PORTFOLIO FILTER ====================
    // This is the version we kept. It defines 'filterBtns' and 'portfolioItems'
    const filterBtns = document.querySelectorAll('.portfolio-nav button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Reset classes for animation
                item.classList.remove('show', 'hide');
                
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    // Slight delay to allow hide animation to finish if switching quickly
                    setTimeout(() => {
                        item.style.display = 'block';
                        // Trigger reflow/repaint so the transition happens
                        setTimeout(() => item.classList.add('show'), 10);
                    }, 300);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
});