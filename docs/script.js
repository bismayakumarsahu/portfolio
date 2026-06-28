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
    // 9. CASE STUDY MODAL
    // =================================
    function initCaseStudyModal() {
        const modal = document.getElementById('case-study-modal');
        if (!modal) return;

        const knowMoreBtns = document.querySelectorAll('.know-more-btn');
        const closeModalBtn = document.querySelector('.close-btn');

        const caseStudies = {
            'EduTrack': {
                img: 'assets/edutrack.png',
                title: 'EduTrack - AI Student Performance Predictor',
                challenge: 'Many schools and colleges still rely on traditional methods to manage student records and evaluate performance. Teachers often struggle to track attendance manually, identify weak students early, analyze academic performance, and maintain records securely. As a result, students at academic risk are often identified too late.',
                solution: 'EduTrack provides a complete academic management system with intelligent analytics. The platform enables teachers to record attendance, upload marks, monitor student progress, and automatically generate performance insights using AI. Students can access their attendance, marks, and personalized improvement suggestions through their dashboard.',
                features: [
                    '<b>Student Management:</b> Centralized profiles, academic records, and attendance history.',
                    '<b>Teacher Dashboard:</b> Tools for marking attendance, uploading marks, and viewing student reports with performance charts.',
                    '<b>Admin Dashboard:</b> Full control to manage students, teachers, classes, and generate system-wide reports.',
                    '<b>AI-Powered Insights:</b> Performance prediction, risk level detection, weak subject analysis, and personalized improvement suggestions.'
                ],
                results: 'EduTrack successfully provides faster attendance management, improved academic monitoring, and early identification of at-risk students. It transforms traditional student management into a smart, AI-assisted platform that improves academic monitoring, enhances teacher productivity, and helps students achieve better outcomes through early intervention and personalized insights.',
                badges: ['Node.js', 'Express.js', 'MySQL', 'Bootstrap', 'Chart.js', 'AI'],
                github: 'https://github.com/bismayakumarsahu/EduTrack-AI-Student-Performance',
                live: '#'
            },
            'HealthMate': {
                img: 'assets/healthmate.png',
                title: 'HealthMate - Android Fitness Companion',
                challenge: 'Many people struggle to maintain a healthy lifestyle because they don\'t consistently monitor their daily health activities. Existing fitness apps are often expensive, overloaded with features, or require wearable devices. Users need a simple and affordable solution that helps them track daily health goals in one place.',
                solution: 'HealthMate combines essential health-tracking features into a clean, easy-to-use Android application. It enables users to track water intake, daily steps, BMI, calories burned, and overall activity while providing progress reports and health insights. The app was built using Material Design principles for an intuitive user experience.',
                features: [
                    '<b>Water Intake Tracker:</b> Set daily goals, log intake with one tap, and receive reminders.',
                    '<b>Step Counter:</b> Uses the phone\'s built-in sensor to accurately track daily steps, distance, and calories burned.',
                    '<b>BMI Calculator:</b> Calculate Body Mass Index and receive personalized health recommendations.',
                    '<b>Progress Analytics:</b> Interactive charts display weekly water intake, daily steps, and monthly fitness progress.'
                ],
                results: 'HealthMate provides users with a simple yet powerful platform for managing their daily health and fitness. By combining activity tracking, hydration monitoring, BMI analysis, and progress visualization, it encourages healthier lifestyles and helps users achieve their wellness goals.',
                badges: ['Java', 'Android Studio', 'XML', 'Material Design', 'Firebase'],
                github: 'https://github.com/bismayakumarsahu',
                live: '#'
            },
            'ArchiGen': {
                img: 'assets/archigen.png',
                title: 'ArchiGen - AI Architectural Plan Generator',
                challenge: 'Designing a house is often expensive and time-consuming, requiring multiple meetings with architects. Many homeowners struggle to visualize their dream home, and modifying designs involves repeated manual work. There was a need for a platform to quickly generate, customize, and visualize house plans without professional software.',
                solution: 'ArchiGen is an AI-powered platform where users describe their desired home (rooms, plot size, style). The AI generates an initial floor plan that users can customize with an interactive editor. The final design can be viewed in both 2D and 3D and exported for future reference.',
                features: [
                    '<b>AI Floor Plan Generation:</b> Automatically generates optimized house layouts from user requirements.',
                    '<b>Interactive Floor Plan Editor:</b> Allows users to drag, move, resize, add, or delete rooms in real-time.',
                    '<b>2D & 3D Visualization:</b> Provides both a professional 2D floor plan view and an interactive 3D model for immersive visualization.',
                    '<b>Export & Save:</b> Users can save their projects to a personal dashboard and export designs as PDF or image files.'
                ],
                results: 'ArchiGen successfully enables users to generate house designs in seconds, customize floor plans without technical expertise, and visualize homes in both 2D and 3D. It significantly reduces the time for initial architectural planning and improves communication between homeowners and architects.',
                badges: ['Node.js', 'AI', 'Three.js', 'Canvas API', 'Express.js'],
                github: 'https://github.com/bismayakumarsahu',
                live: '#'
            },
            'ResumeIQ': {
                img: 'assets/resumeai.png',
                title: 'ResumeIQ - Smart AI Resume Builder',
                challenge: 'Job seekers often struggle to tailor their resumes for each application, especially to pass through automated Applicant Tracking Systems (ATS). The task was to build a tool that not only helps create resumes but also intelligently optimizes them for specific jobs.',
                solution: 'I built ResumeIQ using the MERN stack (MongoDB, Express.js, React, Node.js). The core feature is an NLP engine that takes a user\'s resume and a job description, performs a keyword analysis, and suggests improvements. The React frontend provides a real-time editor and a scoring system to guide the user toward a more effective, ATS-friendly resume.',
                features: [
                    '<b>Real-Time Resume Editor:</b> A clean, modern interface for building and editing resumes.',
                    '<b>AI-Powered Job Matching:</b> Analyzes job descriptions to provide keyword and content suggestions.',
                    '<b>ATS Optimization Score:</b> Gives users instant feedback on how well their resume is tailored for a specific role.',
                    '<b>MERN Stack Architecture:</b> A robust and scalable full-stack application.'
                ],
                results: 'ResumeIQ empowers job seekers by giving them the tools to create highly targeted, professional resumes that are optimized for modern recruitment processes, significantly increasing their chances of landing an interview.',
                badges: ['React.js', 'Node.js', 'NLP', 'MongoDB', 'Express.js'],
                github: 'https://github.com/bismayakumarsahu',
                live: '#'
            }
        };

        knowMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectName = btn.closest('.project-content').querySelector('h3').innerText;
                const data = caseStudies[projectName];
                if (!data) return;

                document.getElementById('case-study-modal-title').innerText = data.title;
                document.getElementById('case-study-modal-img').src = data.img;
                document.getElementById('case-study-modal-challenge').innerText = data.challenge;
                document.getElementById('case-study-modal-solution').innerText = data.solution;
                document.getElementById('case-study-modal-features').innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');
                document.getElementById('case-study-modal-results').innerText = data.results;
                document.getElementById('modal-github').href = data.github;
                document.getElementById('modal-live').href = data.live;
                document.getElementById('case-study-modal-badges').innerHTML = data.badges.map(badge => `<span class="tech-badge">${badge}</span>`).join('');
                
                modal.classList.add('visible');
            });
        });

        const closeModal = () => modal.classList.remove('visible');
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
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

    initCaseStudyModal();
    initCertificateHandler(); // Initialize the handler
});