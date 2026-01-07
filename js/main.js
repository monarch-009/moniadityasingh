// Scroll animations with Intersection Observer
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section, .project-card, .experience-item, .education-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Typing effect for main heading
const initTypingEffect = (element, text, speed = 80) => {
    if (!element || !text) return;

    let i = 0;
    element.innerHTML = '';

    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Performance monitoring
const initPerformanceMonitor = () => {
    window.addEventListener('load', () => {
        const loadTime = Math.round(performance.now());
        console.log(`Page loaded in ${loadTime} ms`);

        localStorage.setItem('lastPerformance', JSON.stringify({
            loadTime,
            timestamp: Date.now(),
            userAgent: navigator.userAgent.substring(0, 50)
        }));
    });
};

// Keyboard navigation
const initKeyboardNavigation = () => {
    const sections = document.querySelectorAll('.section, .header, .contact-section');

    document.addEventListener('keydown', (e) => {
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < sections.length - 1) {
                    sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'Home':
                e.preventDefault();
                sections[0].scrollIntoView({ behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                sections[sections.length - 1].scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
};

const getCurrentSection = () => {
    const sections = document.querySelectorAll('.section, .header, .contact-section');
    const viewportCenter = window.innerHeight / 2;

    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportCenter) {
            return section;
        }
    }
    return sections[0];
};

// Copy functions
const initCopyFunctions = () => {
    const email = 'adityasinghmoni@gmail.com';
    addCopyButton('email', email);
};

const addCopyButton = (type, value) => {
    const copyBtn = document.createElement('button');
    copyBtn.className = `copy-btn copy-${type}`;
    copyBtn.innerHTML = `<i class="fas fa-copy"></i> Copy ${type}`;
    copyBtn.onclick = () => copyToClipboard(value, type);

    const contactSection = document.querySelector('.contact-section');

    // Create or get buttons container
    let buttonsContainer = contactSection?.querySelector('.contact-buttons');
    if (!buttonsContainer) {
        buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'contact-buttons';
        contactSection?.appendChild(buttonsContainer);
    }

    buttonsContainer.appendChild(copyBtn);
};

// Quick share
const initQuickShare = () => {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Profile';
    shareBtn.addEventListener('click', showShareMenu);

    const contactSection = document.querySelector('.contact-section');

    // Create or get buttons container
    let buttonsContainer = contactSection?.querySelector('.contact-buttons');
    if (!buttonsContainer) {
        buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'contact-buttons';
        contactSection?.appendChild(buttonsContainer);
    }

    buttonsContainer.appendChild(shareBtn);
};

const showShareMenu = async () => {
    const shareData = {
        title: "Check out Aditya's Portfolio",
        text: "Full Stack Developer specializing in web development and AI",
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Share cancelled');
        }
    } else {
        copyToClipboard(shareData.url, 'link');
        showSocialShareOptions(shareData);
    }
};

const showSocialShareOptions = ({ url, title, text }) => {
    const shareOptions = [
        { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
        { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` }
    ];

    const menu = document.createElement('div');
    menu.className = 'share-menu';
    menu.innerHTML = shareOptions.map(option =>
        `<a href="${option.url}" target="_blank" rel="noopener noreferrer">${option.name}</a>`
    ).join('');

    document.body.appendChild(menu);

    setTimeout(() => {
        menu.remove();
        showToast('Link copied to clipboard! Share menu closed.', 'info');
    }, 5000);
};

// Interactive tooltips
const initInteractiveTooltips = () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    const codingLinks = document.querySelectorAll('.coding-link');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', (e) => showSkillTooltip(e));
        tag.addEventListener('mouseleave', hideTooltip);
    });

    codingLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => showPlatformTooltip(e));
        link.addEventListener('mouseleave', hideTooltip);
    });
};

const showSkillTooltip = (e) => {
    const skill = e.target.textContent;
    const tooltip = createTooltip(`Experienced with ${skill}`);
    positionTooltip(tooltip, e.target);
};

const showPlatformTooltip = (e) => {
    const platform = e.target.querySelector('span')?.textContent;
    if (platform) {
        const tooltip = createTooltip(`Visit my ${platform} profile`);
        positionTooltip(tooltip, e.target);
    }
};

const createTooltip = (text) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'interactive-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    return tooltip;
};

const positionTooltip = (tooltip, target) => {
    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
};

const hideTooltip = () => {
    const tooltip = document.querySelector('.interactive-tooltip');
    tooltip?.remove();
};

// Daily Quote Feature
// Daily Quote Feature
const initDailyQuote = () => {
    const quoteContainer = document.getElementById('daily-quote-container');
    if (!quoteContainer || !window.quotesData) return;

    const updateQuote = () => {
        const randomIndex = Math.floor(Math.random() * window.quotesData.length);
        const quote = window.quotesData[randomIndex];
        // Fade out
        quoteContainer.style.opacity = '0';

        setTimeout(() => {
            quoteContainer.textContent = quote;
            // Fade in
            quoteContainer.style.opacity = '1';
        }, 500); // 500ms delay for smooth transition match
    };

    // Initial load
    updateQuote();

    // Change every 30 seconds
    setInterval(updateQuote, 30000);
};

// Initialize New Features
const initializeNewFeatures = () => {
    initCopyFunctions();
    initPerformanceMonitor();
    initKeyboardNavigation();
    initQuickShare();
    initInteractiveTooltips();
    initDailyQuote();
};

// Initialize all features after components are loaded
window.addEventListener('componentsLoaded', () => {
    const heading = document.querySelector('.header h1');
    if (heading) {
        initTypingEffect(heading, "Hi, I'm Aditya 👋");
    }

    // Slight delay to ensure DOM is fully ready for observer
    setTimeout(() => {
        initScrollAnimations();
        initializeNewFeatures();
        if (window.initProjectModals) {
            window.initProjectModals();
        }

        // Re-check theme
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon && savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        }
    }, 100);
});
