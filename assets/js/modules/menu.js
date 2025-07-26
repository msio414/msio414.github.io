/**
 * Toggles the mobile navigation menu.
 * Changes icon based on menu state and toggles `active` class on navigation.
 *
 * DOM Requirements:
 * - .hamburger: clickable icon element
 * - .nav-links: container of navigation links
 */
export default function initMenuToggler() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    function toggleMenu(forceClose = false) {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        const icon = hamburger.querySelector('i');
        icon.className = 'fa-solid fa-xl fa-' + (isActive ? 'x' : 'bars-staggered');
        //hamburger.innerHTML = `<i class="fa-solid fa-xl fa-${iconClass}"></i>`;
    }
    hamburger.addEventListener('click', () => {
        const isMenuActive = navLinks.classList.contains('active');
        toggleMenu();
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });
    
    document.addEventListener('keydown', (e) => {
        const isMenuActive = navLinks.classList.contains('active');
        if (isMenuActive && (e.key === 'Escape')) {
            toggleMenu();
        }
    });
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navLinks.contains(e.target) || hamburger.contains(e.target);
        const isMenuActive = navLinks.classList.contains('active');
        if (isMenuActive && !isClickInsideMenu) {
            toggleMenu();
        }
    });
}
