const supportedLanguages = ['en', 'jp'];

function normalizeLanguage(lang) {
    return supportedLanguages.includes(lang) ? lang : 'en';
}

function setLanguage(lang) {
    const cleanLang = normalizeLanguage(lang);
    localStorage.setItem('language', cleanLang);
    applyLanguage(cleanLang);
}

function applyLanguage(lang) {
    const cleanLang = normalizeLanguage(lang);
    const elements = document.querySelectorAll('[data-en], [data-jp]');

    document.documentElement.lang = cleanLang === 'jp' ? 'ja' : 'en';

    elements.forEach(el => {
        const text = el.getAttribute(`data-${cleanLang}`);
        if (text !== null) {
            el.textContent = text;
        }
    });

    document.querySelectorAll('[data-lang]').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === cleanLang);
        button.setAttribute('aria-pressed', button.dataset.lang === cleanLang ? 'true' : 'false');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = normalizeLanguage(localStorage.getItem('language') || 'en');

    document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    document.querySelectorAll('.lang-dropdown a[data-lang]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            setLanguage(link.dataset.lang);
        });
    });

    applyLanguage(savedLang);
});
