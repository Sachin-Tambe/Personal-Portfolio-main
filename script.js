document.addEventListener('DOMContentLoaded', () => {

    /**
     * Initializes all the interactive scripts for the portfolio.
     * This function is the single entry point called when the DOM is ready.
     */
    const initPortfolio = () => {
        initLandingAnimations();
        initMobileMenu();
        initHeaderScroll(); // Restored the call to the function
        initScrollReveal();
    };

    /**
     * Handles the animations that play when the page first loads.
     * 1. Animates the main hero title with a letter-by-letter reveal.
     * 2. The other hero elements are animated purely by CSS.
     */
    const initLandingAnimations = () => {
        const heroTitle = document.getElementById('hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.innerHTML = ''; // Clear original text to prepare for spans

        // Wrap each letter in a <span> to animate it individually
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            // Use a non-breaking space for spaces to ensure they are rendered and animated
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            
            // Apply a staggered animation delay based on the letter's position
            span.style.animationDelay = `${index * 0.05}s`;
            
            heroTitle.appendChild(span);
        });
    };

    /**
     * Sets up the mobile navigation menu (hamburger button).
     * Toggles an 'active' class to show/hide the menu.
     */
    const initMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;

        // Toggle the menu when the hamburger button is clicked
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close the menu automatically when a navigation link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    };

    /**
     * RESTORED FUNCTION
     * Makes the header hide on scroll down and appear on scroll up.
     * This maximizes screen space for the content.
     */
    const initHeaderScroll = () => {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (lastScrollY < window.scrollY && window.scrollY > 100) {
                // Scrolling down and past 100px: hide the header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up or at the top of the page: show the header
                header.classList.remove('header-hidden');
            }
            // Update the last scroll position for the next scroll event
            lastScrollY = window.scrollY;
        });
    };

    /**
     * Animates sections and elements to fade in as they enter the viewport.
     * Uses the Intersection Observer API for high performance.
     */
    const initScrollReveal = () => {
        const elementsToReveal = document.querySelectorAll('.about-section, .experience-section, .projects-section, .skills-section, .certifications-section, .main-footer');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the element is intersecting (in view), add the 'visible' class
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing the element once it has been revealed
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger the animation when 10% of the element is visible
        });

        elementsToReveal.forEach(element => {
            observer.observe(element);
        });
    };

    // Run the main initialization function to start all scripts
    initPortfolio();
});