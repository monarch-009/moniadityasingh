// Theme management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (!themeIcon) return;

    const isDark = body.hasAttribute('data-theme');
    
    if (isDark) {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');

    if (themeIcon && savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

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

// Initialize all features on page load
window.addEventListener('load', () => {
    const heading = document.querySelector('.header h1');
    if (heading) {
        initTypingEffect(heading, "Hi, I'm Aditya 👋");
    }
    
    initScrollAnimations();
    initializeNewFeatures();
});

// Initialize all features
const initializeNewFeatures = () => {
    initCopyFunctions();
    initPerformanceMonitor();
    initKeyboardNavigation();
    initQuickShare();
    initInteractiveTooltips();
};

// Copy to clipboard functionality
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

const copyToClipboard = async (text, type) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`, 'success');
    } catch (err) {
        showToast('Failed to copy to clipboard', 'error');
    }
};

// Smooth scroll to top function
const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
        
        switch(e.key) {
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

// Quick share functionality
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

// Toast notifications
const showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌', 
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast with animation
    requestAnimationFrame(() => toast.classList.add('show'));
    
    // Auto remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
};
