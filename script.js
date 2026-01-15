// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const targetPosition = target.offsetTop - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Intersection Observer for elegant animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.concept-vertical-text p, .about-vertical-text p, .concept-description p');
                if (children.length > 0) {
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        
        // Add directional animation based on section order
        if (index % 2 === 0) {
            const imageWrappers = section.querySelectorAll('.concept-image-wrapper, .about-image-wrapper');
            imageWrappers.forEach(wrapper => {
                wrapper.classList.add('fade-in-right');
            });
            
            const textWrappers = section.querySelectorAll('.concept-text-wrapper, .about-text-wrapper');
            textWrappers.forEach(wrapper => {
                wrapper.classList.add('fade-in-left');
            });
        } else {
            const imageWrappers = section.querySelectorAll('.concept-image-wrapper, .about-image-wrapper');
            imageWrappers.forEach(wrapper => {
                wrapper.classList.add('fade-in-left');
            });
            
            const textWrappers = section.querySelectorAll('.concept-text-wrapper, .about-text-wrapper');
            textWrappers.forEach(wrapper => {
                wrapper.classList.add('fade-in-right');
            });
        }
        
        observer.observe(section);
    });

    // Staggered animation for vertical text
    const verticalTexts = document.querySelectorAll('.concept-vertical-text p, .about-vertical-text p');
    verticalTexts.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Staggered animation for description paragraphs
    const descriptionParagraphs = document.querySelectorAll('.concept-description p');
    descriptionParagraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    // Observe description section separately for paragraph animation
    const conceptSection = document.querySelector('.concept-section');
    if (conceptSection) {
        const descriptionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    descriptionParagraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        descriptionObserver.observe(conceptSection);
    }

    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked');
        });
    });

    // Add parallax effect to hero background text
    const heroBackgroundText = document.querySelector('.hero-background-text');
    if (heroBackgroundText) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBackgroundText.style.transform = `translateY(${-50 + rate}%)`;
        });
    }
});
