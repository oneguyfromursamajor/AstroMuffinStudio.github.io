function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-en], [data-jp]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    applyLanguage(savedLang);
});
