document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const dataSections = document.querySelectorAll('.data-generator-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            dataSections.forEach(section => section.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');

                // Check if this newly active tab should auto-generate data
                if (targetTab === 'us-generator' && typeof generateAllUSData === 'function') {
                    // Check if data is empty or if we always want to regenerate on tab switch
                    if (document.getElementById('us-street').textContent === '-') { // Simple check if empty
                        generateAllUSData();
                    }
                } else if (targetTab === 'ca-generator' && typeof generateAllCAData === 'function') {
                    if (document.getElementById('ca-street').textContent === '-') { // Simple check if empty
                        generateAllCAData();
                    }
                } else if (targetTab === 'de-generator' && typeof generateAllDEData === 'function') { // ADDED FOR DE
                    if (document.getElementById('de-street').textContent === '-') { generateAllDEData(); }
                } else if (targetTab === 'uk-generator' && typeof generateAllUKData === 'function') { // ADDED FOR UK
                    if (document.getElementById('uk-street').textContent === '-') { generateAllUKData(); }
                }
                // Add more else if blocks for other tabs when they are created
            }
        });
    });

    // --- Theme Switcher Logic ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            } else {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Event Listeners for Data Generation Buttons ---
    const generateUSButton = document.getElementById('generate-us-data');
    if (generateUSButton && typeof generateAllUSData === 'function') {
        generateUSButton.addEventListener('click', generateAllUSData);
    }

    const generateCAButton = document.getElementById('generate-ca-data');
    if (generateCAButton && typeof generateAllCAData === 'function') {
        generateCAButton.addEventListener('click', generateAllCAData);
    }

    const generateDEButton = document.getElementById('generate-de-data'); // ADDED FOR DE
    if (generateDEButton && typeof generateAllDEData === 'function') {
        generateDEButton.addEventListener('click', generateAllDEData);
    }

    const generateUKButton = document.getElementById('generate-uk-data'); // ADDED FOR UK
    if (generateUKButton && typeof generateAllUKData === 'function') {
        generateUKButton.addEventListener('click', generateAllUKData);
    }

    // --- Initial Data Generation for Active Tab on Page Load ---
    const activeSection = document.querySelector('.data-generator-section.active');
    if (activeSection) {
        if (activeSection.id === 'us-generator' && typeof generateAllUSData === 'function') {
            generateAllUSData();
        } else if (activeSection.id === 'ca-generator' && typeof generateAllCAData === 'function') {
            // Only generate CA if it's the active one and its data is empty,
            // otherwise US data (default active) would have already loaded.
            // This logic can be refined based on desired behavior.
            // For now, let's assume if CA is somehow default active and empty, generate.
            if (document.getElementById('ca-street').textContent === '-') {
                generateAllCAData();
            }
        } else if (activeSection.id === 'de-generator' && typeof generateAllDEData === 'function') { // ADDED FOR DE
            if (document.getElementById('de-street').textContent === '-') { generateAllDEData(); }
        } else if (activeSection.id === 'uk-generator' && typeof generateAllUKData === 'function') { // ADDED FOR UK
            if (document.getElementById('uk-street').textContent === '-') { generateAllUKData(); }
        }
    }

    // --- Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});