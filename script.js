// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Scroll animations
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Smooth scroll for anchor links
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

// Add parallax effect to hero section
const hero = document.querySelector('#hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add hover effect to benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation to buttons
const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Lottie Animations Configuration
const lottieAnimations = {
    processFlow: {
        container: '.process-animation',
        path: 'animations/process-flow.json',
        loop: true,
        autoplay: true
    },
    consultation: {
        container: '.consultation-animation',
        path: 'animations/consultation.json',
        loop: true,
        autoplay: true
    },
    investment: {
        container: '.investment-animation',
        path: 'animations/investment.json',
        loop: true,
        autoplay: true
    },
    success: {
        container: '.success-animation',
        path: 'animations/success.json',
        loop: true,
        autoplay: true
    },
    contact: {
        container: '.contact-animation',
        path: 'animations/contact.json',
        loop: true,
        autoplay: true
    }
};

// Initialize all Lottie animations
Object.entries(lottieAnimations).forEach(([key, config]) => {
    const container = document.querySelector(config.container);
    if (container) {
        lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: config.loop,
            autoplay: config.autoplay,
            path: config.path
        });
    }
});

// Gold Card Shimmer Effect - REMOVED overlay logic
// const goldCard = document.querySelector('.gold-card-svg');
// if (goldCard) {
//     // Add shimmer overlay - REMOVED
//     // const shimmerOverlay = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//     // shimmerOverlay.setAttribute('width', '100%');
//     // shimmerOverlay.setAttribute('height', '100%');
//     // shimmerOverlay.setAttribute('fill', 'url(#shimmer-gradient)');
//     // shimmerOverlay.setAttribute('class', 'shimmer-overlay');
    
//     // Add gradient definition - REMOVED
//     // const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
//     // defs.innerHTML = ` ... gradient ... `;
    
//     // goldCard.insertBefore(defs, goldCard.firstChild); - REMOVED
//     // goldCard.appendChild(shimmerOverlay); - REMOVED
// }

// Add scroll-triggered animations
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.dataset.animation) {
                const animationName = entry.target.dataset.animation;
                if (lottieAnimations[animationName]) {
                    const animation = lottie.loadAnimation({
                        container: entry.target,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: lottieAnimations[animationName].path
                    });
                }
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(element => {
    observer.observe(element);
});

// Blog Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articles = document.querySelectorAll('.blog-article');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            articles.forEach(article => {
                if (category === 'all' || article.dataset.category === category) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
});

// Reveal Animation on Scroll
const revealOnScroll = () => {
    // Ensure revealElements is defined (it should be from the top of the script)
    if (typeof revealElements !== 'undefined') { 
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    } else {
        console.error("revealElements is not defined. Check script loading order or variable scope.");
    }
};

window.addEventListener('scroll', revealOnScroll);
// Initial check
revealOnScroll();

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        alert('感谢您的订阅！我们会尽快与您联系。');
        newsletterForm.reset();
    });
}

// Custom Scrollbar Logic
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const html = document.documentElement;

    // Create and append the custom scrollbar element dynamically
    const customScrollbar = document.createElement('div');
    customScrollbar.classList.add('custom-scrollbar');
    body.appendChild(customScrollbar);

    const updateScrollbar = () => {
        const scrollTop = window.pageYOffset || html.scrollTop;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const winHeight = window.innerHeight;
        const scrollableHeight = docHeight - winHeight;

        if (scrollableHeight <= 0) {
            customScrollbar.style.opacity = '0'; // Hide scrollbar if no scrolling needed
            return;
        } else {
             customScrollbar.style.opacity = '1'; // Show scrollbar if scrolling needed
        }

        const scrollbarHeight = 90; // Height of the custom scrollbar indicator
        const topMargin = 20;      // Space above the scrollbar track
        const bottomMargin = 20;   // Space below the scrollbar track

        // Calculate the total available track height for the scrollbar indicator
        const trackHeight = winHeight - topMargin - bottomMargin;
        // Calculate the height available for the indicator to move within the track
        const availableScrollbarTrackHeight = trackHeight - scrollbarHeight;

        if(availableScrollbarTrackHeight <= 0) {
             // If viewport is too small for the scrollbar + margins, hide it or handle differently
             customScrollbar.style.opacity = '0';
             return;
        }

        // Calculate scroll percentage
        const scrollPercent = scrollTop / scrollableHeight;

        // Calculate the top position for the scrollbar indicator
        // It starts at topMargin and moves down proportionally within the available track height
        const topPosition = topMargin + (scrollPercent * availableScrollbarTrackHeight);

        // Apply the transform
        customScrollbar.style.transform = `translateY(${topPosition}px)`;
    };

    // Initial update
    updateScrollbar();

    // Update on scroll
    window.addEventListener('scroll', updateScrollbar, { passive: true });

    // Update on resize
    window.addEventListener('resize', updateScrollbar);
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (questionButton && answer) {
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Optional: Close other open FAQs when one is opened
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item && otherItem.classList.contains('active')) {
                //         otherItem.classList.remove('active');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //     }
                // });

                if (!isActive) {
                    item.classList.add('active');
                    // Set max-height to the content's scroll height for smooth opening
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null; // Collapse the answer
                }
            });

            // Recalculate max-height on window resize if the item is active
            window.addEventListener('resize', () => {
                if (item.classList.contains('active')) {
                    // Temporarily remove transition to get accurate scrollHeight
                    const currentTransition = answer.style.transition;
                    answer.style.transition = '';
                    
                    // Get the new scroll height and apply it
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    
                    // Restore the transition
                    // Using requestAnimationFrame helps ensure the style recalculation happens
                    requestAnimationFrame(() => {
                        answer.style.transition = currentTransition;
                    });
                }
            });
        }
    });
}); 