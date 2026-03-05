document.addEventListener('DOMContentLoaded', () => {

    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');
    const navIcon = navToggle.querySelector('i');

    navToggle.addEventListener('click', () => {
        const isVisible = primaryNav.getAttribute('data-visible');

        if (isVisible === 'false') {
            primaryNav.setAttribute('data-visible', 'true');
            navToggle.setAttribute('aria-expanded', 'true');
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-xmark');
        } else {
            primaryNav.setAttribute('data-visible', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
            navIcon.classList.remove('fa-xmark');
            navIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.primary-navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                primaryNav.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
                navIcon.classList.remove('fa-xmark');
                navIcon.classList.add('fa-bars');
            }
        });
    });

    // Sticky Header Color Change on Scroll
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: to animate only once, uncomment next line
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    const instaFeedElement = document.getElementById('insta-feed');
    if (instaFeedElement && window.Instafeed) {
        const accessToken = instaFeedElement.getAttribute('data-access-token');

        if (accessToken) {
            const feed = new Instafeed({
                accessToken,
                target: 'insta-feed',
                limit: 8,
                template: '<a href="{{link}}" target="_blank" rel="noopener noreferrer" class="insta-item"><img src="{{image}}" alt="Instagram post"><div class="insta-overlay"><div class="insta-stats"><span><i class="fa-brands fa-instagram"></i></span></div></div></a>'
            });

            feed.run();
        }
    }

    // Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        // Calculate if we've reached the bottom of the document
        const documentHeight = Math.max(
            document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
        );
        const windowBottom = window.innerHeight + window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Add a small offset so it triggers slightly before hitting the exact top
            if (scrollPosition >= (sectionTop - header.clientHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        // Ensure the last section is selected if scrolled all the way to the bottom
        if (windowBottom >= documentHeight - 10) {
            const lastSection = sections[sections.length - 1];
            current = lastSection.getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
});
