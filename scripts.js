  // Theme toggle logic (primary and footer)
        function setTheme(mode) {
            if (mode === 'night') {
                document.body.classList.add('night');
                document.getElementById('themeToggle').classList.add('night');
                document.getElementById('footerThemeToggle').classList.add('night');
                localStorage.setItem('theme', 'night');
            } else {
                document.body.classList.remove('night');
                document.getElementById('themeToggle').classList.remove('night');
                document.getElementById('footerThemeToggle').classList.remove('night');
                localStorage.setItem('theme', 'day');
            }
        }
        if (localStorage.getItem('theme') === 'night') setTheme('night');
        document.getElementById('themeToggle').addEventListener('click', () => {
            setTheme(document.body.classList.contains('night') ? 'day' : 'night');
        });
        document.getElementById('footerThemeToggle').addEventListener('click', () => {
            setTheme(document.body.classList.contains('night') ? 'day' : 'night');
        });

        // Loader and initialization
        window.addEventListener('load', function() {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                const mainContent = document.getElementById('mainContent');
                loader.classList.add('hide');
                mainContent.classList.add('show');
                setTimeout(() => {
                    startTypingAnimation();
                }, 500);
            }, 3000); // 3 second loader
        });

        // Enhanced typing animation with multiple phrases
        function startTypingAnimation() {
            const titles = [
                'Full Stack Developer',
                'React Specialist',
                'Node.js Expert',
                'UI/UX Designer',
                'Cloud Architect'
            ];
            let currentTitleIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            const heroTitle = document.getElementById('heroTitle');
            const cursor = heroTitle.querySelector('.typing-cursor');
            function typeText() {
                const currentTitle = titles[currentTitleIndex];
                if (isDeleting) {
                    heroTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    if (currentCharIndex === 0) {
                        isDeleting = false;
                        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                        setTimeout(typeText, 500);
                        return;
                    }
                } else {
                    heroTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    if (currentCharIndex === currentTitle.length) {
                        setTimeout(() => {
                            isDeleting = true;
                            typeText();
                        }, 2000);
                        return;
                    }
                }
                heroTitle.appendChild(cursor);
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(typeText, typingSpeed);
            }
            typeText();
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Intersection Observer for animations and progress bars
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    entry.target.classList.remove('fade-out');
                    if (entry.target.closest('.skills')) animateProgressBars();
                }
            });
        }, observerOptions);

        // Progress bar animation
        function animateProgressBars() {
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach((fill, index) => {
                setTimeout(() => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width;
                    fill.classList.add('animate');
                }, index * 200);
            });
        }
        // Observe elements for animations
        document.querySelectorAll('.skill-card, .project-card, .certificate-card, .progress-section, .testimonial-card, .timeline-item, .blog-card').forEach(el => {
            observer.observe(el);
        });

        // Visibility animation on scroll up/down
        let lastScroll = window.scrollY;
        let ticking = false;
        function handleAnimatedHideShow() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollNow = window.scrollY;
                    // Down: fade-in, Up: fade-out
                    const fadeEls = document.querySelectorAll('.fade-in');
                    if (scrollNow > lastScroll) {
                        fadeEls.forEach(el => el.classList.remove('fade-out'));
                    } else {
                        if (scrollNow < 100) {
                            fadeEls.forEach((el, idx) => {
                                setTimeout(() => el.classList.add('fade-out'), idx * 80);
                            });
                        } else {
                            fadeEls.forEach(el => el.classList.remove('fade-out'));
                        }
                    }
                    lastScroll = scrollNow;
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', handleAnimatedHideShow);

        // Form submission with validation
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Project card interactive hover
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        // Certificate card hover effects
        document.querySelectorAll('.certificate-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.certificate-icon');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            });
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.certificate-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
        // Floating animation to skill icons
        document.querySelectorAll('.skill-icon').forEach((icon, index) => {
            icon.style.animation = `float 3s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.5}s`;
        });
        // CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        // Add particle effect to hero section
        function createParticles() {
            const hero = document.querySelector('.hero');
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--primary);
                    border-radius: 50%;
                    opacity: 0.3;
                    animation: floatParticle ${5 + Math.random() * 5}s infinite linear;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                hero.appendChild(particle);
            }
        }
        // Add particle animation CSS
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatParticle {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translate(-100px, -100px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(particleStyle);
        // Initialize particles after loader
        setTimeout(() => {
            createParticles();
        }, 3500);

        // Add scroll progress indicator
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollProgress);
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Project filtering logic
        const filterBtns = document.querySelectorAll('.project-filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if(filter === 'all' || card.getAttribute('data-tags').includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Animated statistics counters
        function animateStats() {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const update = () => {
                    const target = +stat.getAttribute('data-count');
                    let current = +stat.textContent.replace('+','');
                    const increment = Math.ceil(target / 40);
                    if(current < target) {
                        stat.textContent = current + increment > target ? target : current + increment;
                        setTimeout(update, 35);
                    } else {
                        stat.textContent = target + (target >= 10 ? '+' : '');
                    }
                };
                update();
            });
        }
        // Animate stats when visible
        let statsAnimated = false;
        const statsSection = document.getElementById('stats');
        if(statsSection) {
            const statsObs = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }
            }, { threshold: 0.3 });
            statsObs.observe(statsSection);
        }

        // Testimonial Carousel (Auto-scroll + dots)
        (function() {
            const carousel = document.getElementById('testimonialCarousel');
            const cards = carousel.querySelectorAll('.testimonial-card');
            const dotsContainer = document.getElementById('testimonialDots');
            let current = 0;
            let interval = null;
            function showTestimonial(idx) {
                cards.forEach((card, i) => {
                    card.style.display = (i === idx) ? 'block' : 'none';
                });
                dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === idx);
                });
                current = idx;
            }
            function nextTestimonial() {
                showTestimonial((current + 1) % cards.length);
            }
            // Create dots
            cards.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    showTestimonial(i);
                    restartInterval();
                });
                dotsContainer.appendChild(dot);
            });
            function startInterval() {
                interval = setInterval(nextTestimonial, 4000);
            }
            function stopInterval() {
                clearInterval(interval);
            }
            function restartInterval() {
                stopInterval();
                startInterval();
            }
            carousel.addEventListener('mouseenter', stopInterval);
            carousel.addEventListener('mouseleave', startInterval);
            showTestimonial(0);
            startInterval();
        })();

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if(window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({top:0, behavior:'smooth'});
        });

        // Keyboard navigation accessibility (for navigation links and filter buttons)
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
