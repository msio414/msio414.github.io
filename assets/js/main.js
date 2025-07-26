import initMenuToggler from './modules/menu.js';
import initContactForm from './modules/contact.js';
import initTypewriter from './modules/typewriter.js';
import {
    initScroller,
    initResumeTabFiltering,
    initPortfolioTabFiltering,
    initTestimonialSlider
} from './modules/ui-controls.js';

/**
 * Initializes all UI modules once the DOM is fully loaded.
 * Modules include:
 * - Typewriter effect for taglines
 * - Mobile menu toggler
 * - Smooth scroll + active section highlighting
 * - Resume and portfolio tab filtering
 * - Testimonial carousel slider
 * - Contact form submission handler
 */
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initMenuToggler();
    initScroller();
    initResumeTabFiltering();
    initPortfolioTabFiltering();
    initTestimonialSlider();
    initContactForm();
});
