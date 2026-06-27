document.addEventListener("DOMContentLoaded", function() {

    // =================================
    // 1. WELCOME SCREEN & INITIALIZATION
    // =================================
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const body = document.body;

    // Initially, prevent the main page from scrolling
    body.classList.add('no-scroll');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
            body.classList.remove('no-scroll');
            
            // Initialize animations after entering
            initTypingAnimation();
            initScrollReveal();
            initContactAlternative();
            initCounters();
        });
    }

    // Fallback if user has no JS or it fails
    setTimeout(() => {
        if (!welcomeScreen.classList.contains('hidden')) {
            welcomeScreen.classList.add('hidden');
            body.classList.remove('no-scroll');
        }
    }, 3000);

    // =================================
    // 2. CUSTOM CURSOR & PARTICLES
    // =================================
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Upgraded particles.js config for a more attractive "nebula" effect
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100, // Increased particle count
                density: { enable: true, value_area: 800 }
            },
            color: {
                value: ["#2563eb", "#ffffff", "#60a5fa"] // Array of colors for variety
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.5, sync: false } // Twinkling effect
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#60a5fa",
                opacity: 0.15, // More subtle lines
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5, // Slightly slower, more majestic movement
                direction: "none",
                random: true, // Random movement direction
                straight: false,
                out_mode: "out",
                bounce: false
            },
        },
        interactivity: {
            events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: {
                grab: { distance: 140, line_opacity: 0.5 },
                push: { particles_nb: 4 },
            },
        },
        retina_detect: true,
    });

    // =================================
    // 4. NAVBAR & MOBILE MENU
    // =================================
    const header = document.querySelector('header');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // =================================
    // 5. HERO SECTION TYPING ANIMATION
    // =================================
    function initTypingAnimation() {
        const elementsToAnimate = document.querySelectorAll('.hero-content .animate-text');
        let delay = 500; // Initial delay

        elementsToAnimate.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay);
            
            // Increase delay for subsequent elements
            if (index < 3) { // Faster for h3, h1, h2
                delay += 300;
            } else { // Slower for p, buttons, social
                delay += 500;
            }
        });
    }

    // =================================
    // 6. SCROLL-BASED FUNCTIONALITY
    // =================================
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.querySelector('.back-to-top');

    function handleScroll() {
        // Back to top button visibility
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);

        // Active nav link highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // =================================
    // 7. SCROLL REVEAL ANIMATION
    // =================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .certificate-card, .counter-card');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => { 
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => {
            // Set initial state for timeline items based on position
            if (el.classList.contains('timeline-item')) {
                const isOdd = Array.from(el.parentElement.children).indexOf(el) % 2 === 0;
                if (window.innerWidth > 992) {
                    el.style.transform = isOdd ? 'translateX(-100px)' : 'translateX(100px)';
                } else {
                    el.style.transform = 'translateX(-30px)';
                }
            }
            revealObserver.observe(el);
        });
    }

    // =================================
    // 8. ABOUT SECTION COUNTERS
    // =================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter-card h3');
        const speed = 200; // The lower the faster

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText.replace('+', '');
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc) + '+';
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    updateCount();
                    observer.unobserve(counter); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // =================================
    // 10. CERTIFICATE CLICK HANDLER
    // =================================
    function initCertificateHandler() {
        const certificateCards = document.querySelectorAll('.certificate-card');
        const toast = document.getElementById('toast-notification');
        let toastTimeout;

        certificateCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default link behavior

                // Show the toast
                toast.classList.add('visible');

                // Clear any existing timer and set a new one to hide the toast
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('visible');
                }, 3000); // Hide after 3 seconds
            });
        });
    }

    // =================================
    // 11. CONTACT ALTERNATIVE (COPY EMAIL)
    // =================================
    function initContactAlternative() {
        const copyBtn = document.getElementById('copy-email-btn');
        const emailAddress = document.getElementById('email-address').innerText;
        const copyToast = document.getElementById('copy-toast');

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Show toast notification
                copyToast.style.opacity = '1';
                copyToast.style.visibility = 'visible';

                // Change button text
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';

                // Hide toast and reset button after 3 seconds
                setTimeout(() => {
                    copyToast.style.opacity = '0';
                    copyToast.style.visibility = 'hidden';
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
                }, 3000);
            });
        });
    }

    initCertificateHandler(); // Initialize the handler
});