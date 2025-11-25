// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Letter-by-letter animation for About section
function animateLetters() {
    const aboutText = document.querySelector('.about-text p');
    if (!aboutText) return;

    const text = aboutText.textContent;
    aboutText.textContent = '';

    let delay = 0;
    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = text[i];
        letter.classList.add('letter');
        letter.style.animationDelay = `${delay}ms`;
        aboutText.appendChild(letter);
        delay += 30; // Adjust speed (lower = faster)
    }
}

// Intersection Observer for triggering animation when section comes into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('about')) {
            animateLetters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}

// Button click animation ripple effect
document.querySelectorAll('.cta-button, .contact-link').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Animated Logo Effect
function animateLogoLetters() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    const text = logo.textContent;
    logo.textContent = '';
    logo.style.display = 'flex';
    logo.style.gap = '2px';

    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = text[i];
        letter.style.display = 'inline-block';
        letter.style.animation = `float 3s ease-in-out ${i * 0.1}s infinite`;
        logo.appendChild(letter);
    }
}

// Initialize logo animation on page load
document.addEventListener('DOMContentLoaded', animateLogoLetters);

