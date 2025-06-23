// === Loader ===
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    setTimeout(() => {
      document.getElementById('loader').style.display = "none";
      document.body.style.overflow = "";
    }, 300);
  }, 3000);
});

// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
function updateThemeIcon() {
  if (document.body.getAttribute('data-theme') === 'dark') {
    themeToggle.querySelector('.icon-sun').style.opacity = 1;
    themeToggle.querySelector('.icon-sun').style.transform = 'scale(1)';
    themeToggle.querySelector('.icon-moon').style.opacity = 0;
    themeToggle.querySelector('.icon-moon').style.transform = 'scale(0)';
  } else {
    themeToggle.querySelector('.icon-sun').style.opacity = 0;
    themeToggle.querySelector('.icon-sun').style.transform = 'scale(0)';
    themeToggle.querySelector('.icon-moon').style.opacity = 1;
    themeToggle.querySelector('.icon-moon').style.transform = 'scale(1)';
  }
}
themeToggle.onclick = () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();
};
updateThemeIcon();

// === Hamburger menu for mobile ===
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('header .navbar');
menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  menuBtn.classList.toggle('fa-xmark');
  menuBtn.classList.toggle('fa-bars');
};
document.querySelectorAll('header .navbar a').forEach(link => {
  link.onclick = () => {
    navbar.classList.remove('active');
    menuBtn.classList.remove('fa-xmark');
    menuBtn.classList.add('fa-bars');
  };
});

// === Back to top button show/hide ===
const backToTop = document.getElementById('back-to-top');
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
};

// === Typing effect ===
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

// === Testimonials carousel ===
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

// === Contact form validation & success message ===
document.getElementById('contact-form').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('contact-success').style.display = 'block';
  this.reset();
  setTimeout(() => {
    document.getElementById('contact-success').style.display = 'none';
  }, 5000);
};

// === Footer year ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Firebase Init ===
// Import the functions you need from the SDKs you need
  // Import from CDN
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

  // Your Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyB5B4QX1tUIw0lSYsjy-HW7pvHOe4nMmL4",
    authDomain: "website-1f91d.firebaseapp.com",
    projectId: "website-1f91d",
    storageBucket: "website-1f91d.appspot.com", // ✅ fixed
    messagingSenderId: "176653839690",
    appId: "1:176653839690:web:55bec54b6f2d3895c9e5b3",
    measurementId: "G-F5TKYBL0R2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const storage = getStorage(app);
// === Admin Login & Dashboard ===
const adminBtn = document.getElementById('admin-login-btn');
const adminModal = document.getElementById('admin-modal');
const adminForm = document.getElementById('admin-login-form');
const adminStatus = document.getElementById('admin-login-status');
const adminClose = document.getElementById('admin-close');
const adminDashboard = document.getElementById('admin-dashboard');
const dashboardContent = document.getElementById('dashboard-content');
const adminLogout = document.getElementById('admin-logout');
const sendOtpBtn = document.getElementById('send-otp-btn');
let confirmationResult = null;
let currentAdminUser = null;

// Show login modal
adminBtn.onclick = () => {
  adminModal.style.display = 'flex';
  adminStatus.textContent = '';
  adminForm.reset();
  document.getElementById('admin-otp').value = "";
};

// Close login modal
adminClose.onclick = () => { adminModal.style.display = 'none'; };

// Send OTP using Firebase Phone Auth
sendOtpBtn.onclick = function(e) {
  e.preventDefault();
  const phone = document.getElementById('admin-phone').value.trim();
  if (!/^\+?\d{10,15}$/.test(phone)) {
    adminStatus.textContent = "Enter a valid phone number with country code.";
    return;
  }
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible'
  });
  firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(function (result) {
      confirmationResult = result;
      adminStatus.textContent = "OTP sent! Please check your phone.";
    })
    .catch(function (error) {
      adminStatus.textContent = "Error: " + error.message;
    });
};

// Handle admin login (verify OTP)
adminForm.onsubmit = function(e) {
  e.preventDefault();
  const otp = document.getElementById('admin-otp').value.trim();
  if (!otp || !confirmationResult) {
    adminStatus.textContent = "Please request OTP first!";
    return;
  }
  confirmationResult.confirm(otp).then(function(result) {
    currentAdminUser = result.user;
    adminModal.style.display = 'none';
    loadAdminDashboard();
  }).catch(function(error) {
    adminStatus.textContent = "Invalid OTP. Try again.";
  });
};

adminLogout.onclick = () => {
  firebase.auth().signOut();
  currentAdminUser = null;
  adminDashboard.style.display = 'none';
};

// Admin Dashboard (Home as sample, you can extend for other sections)
function loadAdminDashboard() {
  adminDashboard.style.display = 'flex';
  dashboardContent.innerHTML = `
    <h3>Edit Home Section</h3>
    <label>Greeting: <input id="edit-home-greeting"></label>
    <label>Subtitle: <input id="edit-home-subtitle"></label>
    <label>Paragraph: <textarea id="edit-home-paragraph"></textarea></label>
    <label>Image URL: <input id="edit-home-image"></label>
    <label>Enable: <input type="checkbox" id="toggle-home"></label>
    <button id="save-home-btn" class="primary-btn">Save</button>
  `;
  // Load current values
  db.ref("websiteContent/home").once("value").then((snap) => {
    const data = snap.val() || {};
    document.getElementById('edit-home-greeting').value = data.greeting || '';
    document.getElementById('edit-home-subtitle').value = data.subtitle || '';
    document.getElementById('edit-home-paragraph').value = data.paragraph || '';
    document.getElementById('edit-home-image').value = data.image || '';
    document.getElementById('toggle-home').checked = data.enabled !== false;
  });
  document.getElementById('save-home-btn').onclick = function() {
    const updated = {
      greeting: document.getElementById('edit-home-greeting').value,
      subtitle: document.getElementById('edit-home-subtitle').value,
      paragraph: document.getElementById('edit-home-paragraph').value,
      image: document.getElementById('edit-home-image').value,
      enabled: document.getElementById('toggle-home').checked,
    };
    db.ref("websiteContent/home").set(updated);
    alert('Home section updated!');
  };
}
