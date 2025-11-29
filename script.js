// ===== MOBILE NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe service cards and section titles
    document.querySelectorAll('.service-card, .section-title, .portfolio-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add loading animation to hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 200);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 400);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 600);
    }
});

// ===== SMOOTH SCROLLING =====
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

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// ===== FLOATING ELEMENTS ANIMATION =====
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
});

// ===== INTERACTIVE SERVICE CARDS =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PORTFOLIO FILTERING FUNCTIONALITY =====
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Filter portfolio items
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            item.classList.remove('hidden');
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.classList.add('hidden');
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

// ===== ANIMATED COUNTER FOR STATS =====
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
    }
}

// ===== CONTACT FORM ENHANCEMENTS =====
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Form validation and enhancement
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous error states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error', 'success');
            });
            
            // Validate required fields
            if (!name || !name.value.trim()) {
                if (name) name.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (!email || !email.value.trim() || !isValidEmail(email.value)) {
                if (email) email.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (!message || !message.value.trim()) {
                if (message) message.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual Formspree submission)
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Reset all form states
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('success');
                    });
                }, 2000);
            }
        });
        
        // Add real-time validation
        document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select').forEach(input => {
            input.addEventListener('blur', function() {
                const parent = this.parentElement;
                if (this.value.trim() && this.checkValidity()) {
                    if (this.type === 'email' && !isValidEmail(this.value)) {
                        parent.classList.add('error');
                        parent.classList.remove('success');
                    } else {
                        parent.classList.remove('error');
                        parent.classList.add('success');
                    }
                } else if (this.hasAttribute('required') && !this.value.trim()) {
                    parent.classList.add('error');
                    parent.classList.remove('success');
                } else {
                    parent.classList.remove('error', 'success');
                }
            });
            
            // Clear error on input
            input.addEventListener('input', function() {
                const parent = this.parentElement;
                if (this.value.trim()) {
                    parent.classList.remove('error');
                }
            });
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ===== TYPEWRITER EFFECT (Optional) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment to enable typewriter effect on hero subtitle
// document.addEventListener('DOMContentLoaded', () => {
//     const heroSubtitle = document.querySelector('.hero-subtitle');
//     if (heroSubtitle) {
//         const text = heroSubtitle.textContent;
//         typeWriter(heroSubtitle, text, 30);
//     }
// });

// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Digital Dynamo Lab - Ready to innovate!');
    
    // Initialize portfolio filtering if on portfolio page
    if (document.querySelector('.portfolio-filter')) {
        initializePortfolioFilter();
        initializeStatsCounter();
    }
    
    // Initialize contact form if on contact page
    if (document.querySelector('.contact-form')) {
        initializeContactForm();
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add loading animation to all service detail cards
    document.querySelectorAll('.service-detail-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Add hover effects to portfolio cards
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add interactive effects to value items
    document.querySelectorAll('.value-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== PROGRESSIVE ENHANCEMENT =====
// Check if JavaScript is enabled and add class to body
document.documentElement.classList.add('js-enabled');

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation for portfolio filter
document.addEventListener('keydown', function(e) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            let index = Array.from(filterButtons).indexOf(activeFilter);
            if (e.key === 'ArrowRight') {
                index = (index + 1) % filterButtons.length;
            } else {
                index = (index - 1 + filterButtons.length) % filterButtons.length;
            }
            filterButtons[index].click();
            filterButtons[index].focus();
        }
    }
});

// Add focus styles for better accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===== ADDITIONAL CSS FOR KEYBOARD NAVIGATION =====
const keyboardNavigationStyles = `
.keyboard-navigation .nav-link:focus,
.keyboard-navigation .btn:focus,
.keyboard-navigation .filter-btn:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyboardNavigationStyles;
document.head.appendChild(styleSheet);
