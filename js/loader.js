/**
 * Component Loader
 * Fetches HTML fragments from /html/sections/ and injects them into elements with matching IDs.
 */
const loadComponents = async () => {
    const components = [
        'header',
        'about',
        'experience',
        'education',
        'skills',
        'projects',
        'platforms',
        'contact',
        'footer'
    ];

    for (const name of components) {
        try {
            const element = document.getElementById(`${name}-container`);
            if (element) {
                const response = await fetch(`sections/${name}.html`);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                } else {
                    console.error(`Failed to load ${name}: ${response.status}`);
                }
            }
        } catch (error) {
            console.error(`Error loading ${name}:`, error);
        }
    }

    // Re-initialize features after content is loaded
    // We dispatch a custom event that main.js can listen to
    window.dispatchEvent(new Event('componentsLoaded'));
};

document.addEventListener('DOMContentLoaded', loadComponents);
