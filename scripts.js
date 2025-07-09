// INIT AOS
AOS.init();

// PRELOADER (3 seconds splash screen)
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.preloader');
  setTimeout(() => {
    loader.classList.add('preloader-deactivate');
    setTimeout(() => loader.style.display = 'none', 900);
  }, 3000);
});

// REVEAL ON SCROLL
function revealOnScroll() {
  const trigger = window.innerHeight - 80;
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    el.classList.toggle('visible', rect.top < trigger);
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// HAMBURGER MENU
(() => {
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.querySelector('header .navbar');

  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', navbar.classList.contains('active') ? 'true' : 'false');
  });

  document.querySelectorAll('header .navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// DETAILS TOGGLE
(() => {
  const detailBtns = document.querySelectorAll('.zshow-btn');
  detailBtns.forEach(button => {
    button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      const isVisible = details.style.display === 'block';
      details.style.display = isVisible ? 'none' : 'block';
      button.textContent = isVisible ? 'Show Details' : 'Hide Details';
    });
  });
})();

// BACK TO TOP BUTTON
(() => {
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    revealOnScroll(); // avoid duplication
  });
})();

// TYPING EFFECT
(() => {
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

    if (!isDeleting && lIdx === text.length + 1) {
      setTimeout(() => isDeleting = true, 1000);
    } else if (isDeleting && lIdx === 0) {
      tIdx = (tIdx + 1) % typingTexts.length;
      isDeleting = false;
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }
  type();
})();

// // TYPING EFFECT
// (() => {
//   const typingTarget = document.getElementById('type');
//   const typingTexts = [
//     " I’m a 12<sup>th</sup> standard student who’s deeply passionate about coding and creativity. My journey in tech started with curiosity and grew into a strong desire to build, solve, and innovate. I love spending time exploring new web technologies and turning ideas into interactive digital experiences. "
 
//   ];
//   let tIdx = 0, lIdx = 0, isDeleting = false;

//   function type() {
//     let text = typingTexts[tIdx];
//     typingTarget.textContent = isDeleting ? text.substring(0, lIdx--) : text.substring(0, lIdx++);

//     if (!isDeleting && lIdx === text.length + 1) {
//       setTimeout(() => isDeleting = true, 1000);
//     } else if (isDeleting && lIdx === 0) {
//       tIdx = (tIdx + 1) % typingTexts.length;
//       isDeleting = false;
//     }

//     setTimeout(type, isDeleting ? 60 : 100);
//   }
//   type();
// })();

// TESTIMONIALS CAROUSEL
(() => {
  const testimonials = document.querySelectorAll('.testimonial');
  let activeTestimonial = 0;

  function showTestimonial(idx) {
    testimonials.forEach((el, i) => el.classList.toggle('active', i === idx));
  }

  document.querySelector('.testimonials-carousel .next')?.addEventListener('click', () => {
    activeTestimonial = (activeTestimonial + 1) % testimonials.length;
    showTestimonial(activeTestimonial);
  });

  document.querySelector('.testimonials-carousel .prev')?.addEventListener('click', () => {
    activeTestimonial = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(activeTestimonial);
  });

  showTestimonial(activeTestimonial);
})();

// CONTACT FORM VALIDATION & SUCCESS
(() => {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setTimeout(() => {
        form.reset();
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 4000);
      }, 500);
    });
  }
})();



// book 


 let globalClicked = false;
    
    const flipBook = (elBook) => {
      elBook.style.setProperty("--c", 0);
      const pages = elBook.querySelectorAll(".page");
      pages.forEach((page, idx) => page.style.setProperty("--i", idx));

      const coverPage = pages[0];
      
      const handleCoverClick = () => {
        if (globalClicked) return;
        globalClicked = true;
        elBook.style.setProperty("--c", 1);
        setTimeout(() => startTypingSequence(), 1000);
      };
      
      coverPage.addEventListener("click", handleCoverClick);
      
      // Function to reset the book
      window.resetBook = () => {
        globalClicked = false;
        elBook.style.setProperty("--c", 0);
        
        // Clear all typed content
        document.querySelectorAll('.neon-typing').forEach(el => {
          el.innerHTML = '';
        });
        
        // Reset all page content animations
        document.querySelectorAll('.page-content').forEach(content => {
          content.classList.remove('animate-in');
        });
        
        console.log("Book reset completed");
      };
    };

    const typingPages = [
      {
        front: "#type1",
        back: "#type2",
        frontText: ` Jay Shree Ram`,
        backText: ` I’m a 12th standard student who’s deeply passionate about coding and creativity.
          My journey in tech started with curiosity and grew into a strong desire to build, solve, and innovate. 
          I love spending time exploring new web technologies and turning ideas into interactive digital experiences. `
      },
      {
        front: "#type3",
        back: "#type4",
        frontText: ` For me, coding is not just about writing lines of code—it's about building a bridge between imagination and reality. 
          Whether it’s a portfolio website, a flipbook animation, or a full-fledged chat app, I enjoy every part of the process—from designing UI to writing functional backend logic.`,
        backText: ` I have hands-on experience in HTML, CSS, JavaScript, Firebase, and responsive UI design. 
          I’ve built projects that include animated portfolios, flipbook-style interfaces, chat apps with real-time features, and creative tools that reflect my interest in design and interactivity.`
      },
      {
        front: "#type5",
        back: "#type6",
        frontText: ` My goal is to become a full-stack developer and explore fields like cybersecurity, artificial intelligence, and ethical hacking. 
          I believe technology can change the world—and I want to be part of that change. I constantly challenge myself to learn more, build better, and keep growing.`,
        backText: `I love collaborating with other developers, learning from others, and contributing to fun, meaningful projects.
          If you're someone who shares a love for tech, design, or innovation, let’s connect and build something amazing together!`
      },
      {
        front: "#type7",
        back: "#type8",
        frontText: `I believe in learning by doing. I don't wait for the perfect time or course—I dive into projects, break things, fix them, and learn along the way.`,
        backText: `Your time means a lot to me. Feel free to explore my projects, drop a message, or give feedback. 
          Every interaction helps me improve and grow.`
      }
    ];

    const elBook = document.querySelector(".book");
    flipBook(elBook);

    function typeText(el, text, callback) {
      let i = 0;
      el.innerHTML = "";
      function typeChar() {
        if (i < text.length) {
          el.innerHTML += text[i++];
          setTimeout(typeChar, 30);
        } else {
          callback && callback();
        }
      }
      typeChar();
    }

    function startTypingSequence() {
      let currentPage = 0;
      
      function processPage() {
        if (currentPage >= typingPages.length) return;
        
        const { front, back, frontText, backText } = typingPages[currentPage];
        const frontEl = document.querySelector(front);
        const backEl = document.querySelector(back);
        
        // Get the page content containers
        const frontContent = frontEl.closest('.front').querySelector('.page-content');
        const backContent = backEl.closest('.back').querySelector('.page-content');
        
        // Animate front page content in from top
        setTimeout(() => {
          frontContent.classList.add('animate-in');
          
          // Start typing after animation
          setTimeout(() => {
            typeText(frontEl, frontText, () => {
              setTimeout(() => {
                // Move to next page to show back
                elBook.style.setProperty("--c", currentPage + 2);
                
                setTimeout(() => {
                  // Animate back page content in from top
                  backContent.classList.add('animate-in');
                  
                  // Start typing after animation
                  setTimeout(() => {
                    typeText(backEl, backText, () => {
                      setTimeout(() => {
                        currentPage++;
                        if (currentPage < typingPages.length) {
                          // Move to next page
                          elBook.style.setProperty("--c", currentPage + 1);
                          setTimeout(processPage, 1000);
                        } else {
                          // Finished all pages, go to final page
                          elBook.style.setProperty("--c", 5);
                          
                          // Auto-close and reset the book after viewing final page
                          setTimeout(() => {
                            console.log("Starting book close sequence");
                            closeAndResetBook();
                          }, 3000);
                        }
                      }, 2000);
                    });
                  }, 300);
                }, 1000);
              }, 1000);
            });
          }, 300);
        }, 500);
      }
      
      processPage();
    }
    
    function closeAndResetBook() {
      // Close the book by going through pages in reverse
      let currentC = parseInt(elBook.style.getPropertyValue("--c")) || 5;
      console.log("Starting close from page:", currentC);
      
      function closePage() {
        if (currentC > 0) {
          currentC--;
          elBook.style.setProperty("--c", currentC);
          console.log("Closing to page:", currentC);
          setTimeout(closePage, 400);
        } else {
          // Book is fully closed, now reset everything
          console.log("Book fully closed, resetting...");
          setTimeout(() => {
            window.resetBook();
          }, 500);
        }
      }
      
      closePage();
    }