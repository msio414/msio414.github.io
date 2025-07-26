/**
 * Initializes a typewriter effect that cycles through taglines.
 * Taglines are expected to be in the `data-taglines` attribute as a JSON array.
 *
 * DOM Requirements:
 * - #taglines: container element with data-taglines attribute
 */
export default function initTypewriter() {
    const delay = 2000;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    
    const taglinesEl = document.getElementById('taglines');
    if (!taglinesEl) return;
    
    let taglines;
    
    try {
        taglines = JSON.parse(taglinesEl.dataset.taglines);
    } catch (e) {
        console.warn(`Invalid taglines JSON in data-taglines \n${e}`);
        return;
    }
    
    if (!Array.isArray(taglines) || !taglines.length) return;
    
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = taglines[taglineIndex];
        
        if (!isDeleting) {
            taglinesEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, delay);
                return;
            }
        } else {
            taglinesEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (!charIndex) {
                isDeleting = false;
                taglineIndex = (taglineIndex + 1) % taglines.length;
            }
        }
        
        setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
    
    typeEffect();
}
