/**
 * Enables smooth scrolling and active link highlighting
 * for navigation links targeting page sections.
 *
 * DOM Requirements:
 * - .nav-links a[href^="#"]: anchor tags with section targets
 *
 * Features:
 * - Active link updates on scroll
 * - Smooth scroll behavior on click
 */
export function initScroller() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [];
    const offset = 80;
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const section = document.querySelector(targetId);
        if (section) {
            sections.push({
                element: section,
                link: link
            });
        }
    });
    
    if (sections.length === 0) return;
    
    sections.sort((a, b) => a.element.offsetTop - b.element.offsetTop);
    
    function setActiveLink() {
        const scrollPosition = window.scrollY + offset;
        let currentSection = null;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const isLast = i === sections.length - 1;
            const sectionTop = section.element.offsetTop;
            const sectionBottom = isLast
                ? document.documentElement.scrollHeight
                : sections[i + 1].element.offsetTop;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
                break;
            }
        }
        
        navLinks.forEach(link => link.classList.remove('active'));
        if (currentSection) {
            currentSection.link.classList.add('active');
        }
    }
    
    setActiveLink();
    
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(setActiveLink, 100);
    });
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

/**
 * Enables tab-based filtering for resume sections (e.g., experience, education, & certifications).
 *
 * DOM Requirements:
 * - .tab-btn: tab buttons with data-tab attributes
 * - .tab-content: corresponding content sections with matching IDs
 */
export function initResumeTabFiltering() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabBtns.length || !tabContents.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab') + '-content';
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/**
 * Filters portfolio items based on category buttons (Projects & Skills section).
 *
 * DOM Requirements:
 * - .filter-btn: filter buttons with data-filter values
 * - [data-category]: items with a category to match
 */
export function initPortfolioTabFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('[data-category]');
    
    if (!filterBtns.length || !portfolioItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initializes a slider/carousel for testimonials.
 * Supports manual cycling with previous/next buttons.
 *
 * DOM Requirements:
 * - .testimonial: testimonial elements
 * - .prev-btn: button to go to previous testimonial
 * - .next-btn: button to go to next testimonial
 */
export function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (!testimonials.length || !prevBtn || !nextBtn) return;
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}
