// Function to handle smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Function to add scroll effect to header
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Function to add typing effect to hero text
function initTypingEffect() {
    const heroText = document.querySelector('.hero h1');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Function to add fade-in animation to project cards
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Function to handle form submission (if contact form is added later)
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
}

// Function to initialize all JavaScript functionality
function initPortfolio() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize header scroll effect
    initHeaderScrollEffect();
    
    // Initialize typing effect (only on home page)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        initTypingEffect();
    }
    
    // Initialize project card animations (only on projects page)
    if (window.location.pathname.includes('projects.html')) {
        initProjectCardAnimations();
    }
    
    // Add contact form handler if form exists
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        redirectToAbout,
        initSmoothScrolling,
        initHeaderScrollEffect,
        initTypingEffect,
        initProjectCardAnimations,
        handleContactForm,
        initPortfolio
    };
} 