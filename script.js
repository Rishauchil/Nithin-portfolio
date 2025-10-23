// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dark / Light Mode
const toggleBtn = document.getElementById('mode-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
let started = false;

window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  const top = aboutSection.getBoundingClientRect().top;
  if (top < window.innerHeight && !started) {
    started = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;
      const update = () => {
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(update, 20);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  }
});

// Testimonials Auto Slide
let current = 0;
const testimonials = document.querySelectorAll('.testimonial');
setInterval(() => {
  testimonials[current].classList.remove('active');
  current = (current + 1) % testimonials.length;
  testimonials[current].classList.add('active');
}, 4000);

// Contact Form
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your message! (This is a demo form.)');
  e.target.reset();
});

// GSAP Hero Animation
window.addEventListener('load', () => {
  gsap.from('.hero-content h2', { y: 50, opacity: 0, duration: 1 });
  gsap.from('.hero-content p', { y: 30, opacity: 0, delay: 0.5, duration: 1 });
  gsap.from('.hero-content .btn', { y: 20, opacity: 0, delay: 1, duration: 1 });
});

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});


// Mobile Menu Toggle
const navMenu = document.querySelector('nav ul');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
