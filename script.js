// Loader
window.onload = function() {
    setTimeout(() => {
        document.getElementById('loader-bg').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader-bg').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            animateProgressBars();
            animateCounters();
            drawRadar();
        }, 300);
    }, 3000);
};

// Theme Toggle (light, dark, auto)
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeAuto = document.getElementById('theme-auto');

function setTheme(theme, persist=true) {
    if(theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        themeIcon.textContent = prefersDark ? '🌙' : '🌞';
        if(persist) localStorage.setItem('theme', 'auto');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'dark' ? '🌙' : '🌞';
        if(persist) localStorage.setItem('theme', theme);
    }
}
themeBtn.addEventListener('click', () => {
    let curTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(curTheme === 'light' ? 'dark' : 'light');
});
themeAuto.addEventListener('click', () => setTheme('auto'));
(function() {
    let savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme, false);
    if(savedTheme === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme('auto', false));
    }
})();

// Accessibility Options
document.getElementById('contrast-toggle').onclick = () => {
    document.body.classList.toggle('high-contrast');
};
document.getElementById('font-size-toggle').onclick = () => {
    document.body.classList.toggle('large-font');
};
document.getElementById('dyslexia-toggle').onclick = () => {
    document.body.classList.toggle('dyslexia');
};

// Typing Effect
const typingPhrases = [
    "Web Developer", "Frontend Specialist", "React Enthusiast", "UI/UX Designer"
];
let typeIdx = 0, charIdx = 0, typingForward = true;
const typingSpan = document.getElementById('typing');
function typeEffect() {
    let current = typingPhrases[typeIdx];
    if (typingForward) {
        charIdx++;
        if (charIdx === current.length + 1) typingForward = false;
    } else {
        charIdx--;
        if (charIdx === 0) {
            typingForward = true;
            typeIdx = (typeIdx + 1) % typingPhrases.length;
        }
    }
    typingSpan.textContent = current.substring(0, charIdx);
    setTimeout(typeEffect, typingForward ? 110 : 40);
}
typeEffect();

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const value = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = value;
        }, 200);
    });
}
// Animated Stats Counters
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = Math.max(1, Math.floor(target / 70));
        function update() {
            if(count < target) {
                count += speed;
                if(count > target) count = target;
                counter.textContent = count;
                setTimeout(update, 18);
            } else {
                counter.textContent = target;
            }
        }
        update();
    });
}

// Radar Chart (Chart.js)
function drawRadar() {
    const ctx = document.getElementById('radarChart');
    if(!ctx) return;
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'UI/UX'],
            datasets: [{
                label: 'Skill Level',
                data: [95, 90, 85, 80, 70, 75],
                backgroundColor: 'rgba(0,123,255,0.15)',
                borderColor: '#007bff',
                borderWidth: 2,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            responsive: false,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 20, color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// Timeline Interactive Details
document.querySelectorAll('.timeline-detail-btn').forEach(btn => {
    btn.onclick = function() {
        this.nextElementSibling.style.display =
            this.nextElementSibling.style.display === "block" ? "none" : "block";
    }
});

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        let tech = btn.getAttribute('data-tech');
        document.querySelectorAll('.project').forEach(proj => {
            if(tech === "all" || proj.getAttribute('data-tech').includes(tech)) {
                proj.style.display = "";
            } else {
                proj.style.display = "none";
            }
        });
    };
});

// Project Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.project-img').forEach(img => {
    img.onclick = () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    };
});
document.getElementById('lightbox-close').onclick = () => {
    lightbox.style.display = 'none';
};
window.onclick = e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
    if (e.target === videoModal) videoModal.style.display = 'none';
    if (e.target === qrModal) qrModal.style.display = 'none';
};

// Project Video Modal
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
document.querySelectorAll('.video-btn').forEach(btn => {
    btn.onclick = function() {
        videoModal.style.display = 'flex';
        modalVideo.src = this.getAttribute('data-video');
        modalVideo.play();
    }
});
document.getElementById('close-video').onclick = function() {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
};

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;
function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}
document.getElementById('prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});
document.getElementById('next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 6000);
showTestimonial(currentTestimonial);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(q => {
    q.onclick = function() {
        this.classList.toggle('open');
        let answer = this.nextElementSibling;
        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    };
});

// Newsletter Form
document.getElementById('newsletter-form').onsubmit = function(e) {
    e.preventDefault();
    const email = this.email.value;
    if(!email) return;
    document.getElementById('newsletter-msg').textContent = "Thank you for subscribing!";
    this.reset();
};
// Contact Form
document.getElementById('contact-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('form-msg').textContent = "Message sent! I'll get back to you soon.";
    this.reset();
};

// QR Code Modal
const qrBtn = document.getElementById('qr-btn');
const qrModal = document.getElementById('qr-modal');
const qrImg = document.getElementById('qr-img');
qrBtn.onclick = function() {
    qrModal.style.display = "flex";
    const url = window.location.href;
    QRCode.toDataURL(url, { width: 200, margin: 2 }, function(err, url) {
        qrImg.src = url;
    });
};
document.getElementById('close-qr').onclick = function() {
    qrModal.style.display = "none";
};

// PWA support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

// Custom 404 page (simulate for demo: open #notfound if hash is #404)
if(window.location.hash === "#404") {
    document.getElementById('main-content').style.display = "none";
    document.getElementById('notfound').style.display = "block";
} else {
    document.getElementById('notfound').style.display = "none";
                            }}
