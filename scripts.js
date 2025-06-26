

// read more mobile-friendly 
    const openBtn = document.getElementById('openPopup');
const closeBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

openBtn.addEventListener('click', () => {
  popup.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden'; // 🚫 disables scroll
});

const closePopup = () => {
  popup.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = 'auto'; // ✅ re-enables scroll
};

closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);


// Dark/Light mode toggle

  // const zthemeToggle = document.getElementById('zthemeToggle');
  // const isDarkMode = localStorage.getItem('theme') === 'dark';

  // if (isDarkMode) {
  //   document.body.classList.add('dark-mode');
  // }

  // zthemeToggle.addEventListener('click', () => {
  //   document.body.classList.toggle('dark-mode');
  //   const isDark = document.body.classList.contains('dark-mode');
  //   localStorage.setItem('theme', isDark ? 'dark' : 'light');
  //   zthemeToggle.textContent = isDark ? '☀ Toggle Theme' : '🌙 Toggle Theme';
  // });

// other
  const revealElements = document.querySelectorAll('.track-node');
  const revealOnScroll = () => {
    for (const el of revealElements) {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    }
  };
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);


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
// Hamburger menu for mobile
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('header .navbar');
menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  menuBtn.classList.toggle('fa-xmark');
  menuBtn.classList.toggle('fa-bars');
};
// Close navbar on link click (mobile)
document.querySelectorAll('header .navbar a').forEach(link => {
  link.onclick = () => {
    navbar.classList.remove('active');
    menuBtn.classList.remove('fa-xmark');
    menuBtn.classList.add('fa-bars');
  };
}); 

//  function toggleTheme() {
//       document.body.classList.toggle('dark');
//     }

// Back to top button show/hide
const backToTop = document.getElementById('back-to-top');
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
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
document.getElementById('contact-form').onsubmit = function(e) {
  e.preventDefault();
  // Here, add your AJAX/formspree/emailjs integration if needed
  document.getElementById('contact-success').style.display = 'block';
  this.reset();
  setTimeout(() => {
    document.getElementById('contact-success').style.display = 'none';
  }, 5000);
};

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
