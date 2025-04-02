"use strict";
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const updateTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = (theme === "dark") ? "fa-solid fa-toggle-on fa-xl" : "fa-solid fa-toggle-off fa-xl";
    //themeIcon.classList.toggle(icon);
};

updateTheme(currentTheme);
document.documentElement.style.visibility = 'visible'; // Remove FOUC guard

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    if (!localStorage.getItem('theme')) {
        currentTheme = matches ? 'dark' : 'light';
        updateTheme(currentTheme);
    }
});
