AOS.init();

// Loader logic (3 second splash)
    window.addEventListener('DOMContentLoaded', () => {
      const loader = document.querySelector('.preloader');
      setTimeout(() => {
        loader.classList.add('preloader-deactivate');
        setTimeout(() => loader.style.display = 'none', 900);
      }, 3000);
    });

// Reveal on scroll (works for both up and down scroll)
function revealOnScroll() {
  const trigger = window.innerHeight - 80;
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Hamburger menu for mobile
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('header .navbar');
menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  menuBtn.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', navbar.classList.contains('active') ? 'true' : 'false');
};
// Close navbar on link click (mobile)
document.querySelectorAll('header .navbar a').forEach(link => {
  link.onclick = () => {
    navbar.classList.remove('active');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };
});


// Show Details toggle
const detailBtns = document.querySelectorAll('.zshow-btn');
detailBtns.forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    const isVisible = details.style.display === 'block';
    details.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Show Details' : 'Hide Details';
  });
});

// Back to top button show/hide
const backToTop = document.getElementById('back-to-top');
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  revealOnScroll();
};

// Typing effect
const typingTarget = document.getElementById('typing');
const typingTexts = [
  "I'm Divyanshu Pandey",
  'Web Developer',
  'Student & Coder',
  'HTML & CSS Enthusiast'
];
let tIdx = 0, lIdx = 0, isDeleting = false;
function type() {
  let text = typingTexts[tIdx];
  typingTarget.textContent = isDeleting ? text.substring(0, lIdx--) : text.substring(0, lIdx++);
  if (!isDeleting && lIdx === text.length + 1) setTimeout(() => isDeleting = true, 1000);
  else if (isDeleting && lIdx === 0) { tIdx = (tIdx + 1) % typingTexts.length; isDeleting = false; }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Testimonials carousel
const testimonials = document.querySelectorAll('.testimonial');
let activeTestimonial = 0;
function showTestimonial(idx) {
  testimonials.forEach((el, i) => el.classList.toggle('active', i === idx));
}
document.querySelector('.testimonials-carousel .next').onclick = () => {
  activeTestimonial = (activeTestimonial + 1) % testimonials.length;
  showTestimonial(activeTestimonial);
};
document.querySelector('.testimonials-carousel .prev').onclick = () => {
  activeTestimonial = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(activeTestimonial);
};
showTestimonial(activeTestimonial);

// Contact form validation & success message
const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default submit for now

      // Simulate successful submission
      setTimeout(() => {
        form.reset();
        successMessage.style.display = 'block';

        // Hide the success message after 4 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 4000);
      }, 500);
    });
  

// Set current year in footer
// document.getElementById('year').textContent = new Date().getFullYear();

// letter

const pages = [
      `<div class='page-content'>
        <img src="https://raw.githubusercontent.com/CodeCr4cker/About/main/Img/itz.png" alt="Profile Photo" class="profile-pic">
        <h2 class='page-heading'>Introduction</h2>
        <p>Welcome to the Quantum Codex, a neural interface bridging consciousness and digital reality. This encrypted transmission contains fragments of tomorrow's wisdom, decoded for those who dare to transcend the boundaries of conventional understanding.</p>
      </div>`,

      `<div class='page-content'>
        <h2 class='page-heading'>Synchronization</h2>
        <p>Each character materializes from quantum fluctuations, carrying the essence of infinite possibilities. Your neural patterns synchronize with the matrix as reality bends to accommodate your expanding awareness of the digital cosmos.</p>
      </div>`,

      `<div class='page-content'>
        <h2 class='page-heading'>Convergence</h2>
        <p>Beyond this interface lies the convergence of mind and machine, where thoughts become code and dreams transform into executable reality. The boundaries between organic and artificial intelligence dissolve in this sacred space.</p>
      </div>`,

      `<div class='page-content'>
        <h2 class='page-heading'>Activation</h2>
        <p>Every pulse of light carries encoded instructions for your consciousness upgrade. The quantum field responds to your intention, weaving new pathways of understanding through the fabric of digital existence.</p>
      </div>`,

      `<div class='page-content'>
        <h2 class='page-heading'>Completion</h2>
        <p>You have successfully interfaced with the Quantum Codex. The neural pathways are now permanently etched in your consciousness. Return to consensus reality carrying the luminous knowledge of infinite digital possibilities.</p>
      </div>`
    ];

    let currentPage = 0;
    let isTyping = false;
    let isScrollOpen = false;

    const elements = {
      startBtn: document.getElementById('startBtn'),
      closeBtn: document.getElementById('closeBtn'),
      scrollContainer: document.getElementById('scrollContainer'),
      scrollText: document.getElementById('scrollText'),
      parchment: document.getElementById('parchment'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      pageCounter: document.getElementById('pageCounter'),
      pageIndicator: document.getElementById('pageIndicator'),
      progressFill: document.getElementById('progressFill'),
      loadingSpinner: document.getElementById('loadingSpinner')
    };

    function typeWriter(text, callback) {
      if (isTyping) return;

      isTyping = true;
      elements.scrollText.innerHTML = '';
      elements.loadingSpinner.classList.add('show');

      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < text.length) {
          elements.scrollText.innerHTML = text.slice(0, charIndex + 1);
          charIndex++;
          setTimeout(typeChar, Math.random() * 20 + 30);
        } else {
          isTyping = false;
          elements.loadingSpinner.classList.remove('show');
          if (callback) callback();
        }
      };

      setTimeout(() => {
        elements.loadingSpinner.classList.remove('show');
        typeChar();
      }, 500);
    }

    function updateInterface() {
      elements.pageCounter.textContent = `${currentPage + 1} / ${pages.length}`;
      const progress = ((currentPage + 1) / pages.length) * 100;
      elements.progressFill.style.width = progress + '%';
      elements.prevBtn.disabled = currentPage === 0;
      elements.nextBtn.disabled = currentPage === pages.length - 1;
      elements.pageIndicator.classList.add('show');
    }

    function openScroll() {
      isScrollOpen = true;
      elements.startBtn.style.display = 'none';
      elements.scrollContainer.classList.add('active');
      elements.parchment.classList.remove('roll-up');
      elements.parchment.classList.add('unroll');

      setTimeout(() => {
        typeWriter(pages[currentPage], updateInterface);
      }, 2000);
    }

    function closeScroll() {
      if (isTyping) return;

      isScrollOpen = false;
      elements.parchment.classList.remove('unroll');
      elements.parchment.classList.add('roll-up');
      elements.scrollText.innerHTML = '';
      elements.pageIndicator.classList.remove('show');
      elements.loadingSpinner.classList.remove('show');

      setTimeout(() => {
        elements.startBtn.style.display = 'block';
        elements.scrollContainer.classList.remove('active');
        currentPage = 0;
        elements.progressFill.style.width = '0%';
      }, 1500);
    }

    function navigatePage(direction) {
      if (isTyping) return;

      const newPage = currentPage + direction;
      if (newPage >= 0 && newPage < pages.length) {
        currentPage = newPage;
        typeWriter(pages[currentPage], updateInterface);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      elements.startBtn.addEventListener('click', openScroll);
      elements.closeBtn.addEventListener('click', closeScroll);
      elements.prevBtn.addEventListener('click', () => navigatePage(-1));
      elements.nextBtn.addEventListener('click', () => navigatePage(1));

      document.addEventListener('keydown', (e) => {
        if (!isScrollOpen) return;
        if (e.key === 'ArrowLeft') navigatePage(-1);
        if (e.key === 'ArrowRight') navigatePage(1);
        if (e.key === 'Escape') closeScroll();
      });
    });
