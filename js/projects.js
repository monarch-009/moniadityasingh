// Project Modal Functionality & Pagination

let visibleProjectsCount = 4;
const projectsPerLoad = 2;

const initProjectModals = () => {
    // 0. Render Projects from Data if available
    if (window.projectData) {
        renderProjects();
    }

    // 1. Create Modal HTML Structure and append to body
    createModalStructure();

    // 2. Global Close Listeners
    setupGlobalListeners();
};

const renderProjects = () => {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    // Sort data by index
    const sortedData = [...window.projectData].sort((a, b) => a.index - b.index);

    // Slice data based on visible count
    const visibleData = sortedData.slice(0, visibleProjectsCount);

    grid.innerHTML = visibleData.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" />
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">
                    ${project.description}
                </p>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.links.github}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.links.live}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Website
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Re-attach listeners to new cards
    attachCardListeners();

    // Manage Load More Button
    updateLoadMoreButton(sortedData.length);
};

const attachCardListeners = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.cursor = 'pointer'; // Make it look clickable
        card.addEventListener('click', (e) => {
            // Prevent opening if clicking directly on a link (GitHub/Demo buttons)
            if (e.target.closest('.project-link')) return;

            openProjectModal(card);
        });
    });
};

const updateLoadMoreButton = (totalProjects) => {
    let btnContainer = document.getElementById('load-more-container');
    const grid = document.querySelector('.projects-grid');

    // If all projects are shown, hide button
    if (visibleProjectsCount >= totalProjects) {
        if (btnContainer) btnContainer.style.display = 'none';
        return;
    }

    if (!btnContainer) {
        // Create container and button
        btnContainer = document.createElement('div');
        btnContainer.id = 'load-more-container';
        btnContainer.style.textAlign = 'center';
        btnContainer.style.marginTop = '40px';
        btnContainer.style.marginBottom = '20px';
        // Ensure it spans full width if in grid or flex parent
        btnContainer.style.width = '100%';

        const btn = document.createElement('button');
        btn.innerText = 'Load More Projects';
        // Reuse project-link class for consistent styling, plus extra specific styles
        btn.className = 'project-link';
        btn.style.display = 'inline-flex';
        btn.style.justifyContent = 'center';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '1rem';
        btn.style.padding = '12px 28px';
        btn.style.border = '1px solid var(--border-color)';

        btn.addEventListener('click', () => {
            visibleProjectsCount += projectsPerLoad;
            renderProjects();
        });

        btnContainer.appendChild(btn);

        // Append after grid
        if (grid && grid.parentNode) {
            grid.parentNode.insertBefore(btnContainer, grid.nextSibling);
        }
    } else {
        btnContainer.style.display = 'block';
    }
};

const setupGlobalListeners = () => {
    // Wait for DOM or ensure elements exist. 
    // Since createModalStructure is called before, overlay should exist.
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');

    if (modalOverlay) {
        // Close on clicking overlay (outside modal)
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeProjectModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
};

const createModalStructure = () => {
    // Check if modal already exists
    if (document.querySelector('.modal-overlay')) return;

    const modalHTML = `
        <div class="modal-overlay">
            <div class="project-modal">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <img src="" alt="Project Image" class="modal-image">
                <div class="modal-content">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                    
                    <div class="modal-tech-stack">
                        <div class="modal-tech-title">Technologies Used</div>
                        <div class="project-tech"></div>
                    </div>

                    <div class="modal-links"></div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

const openProjectModal = (card) => {
    const overlay = document.querySelector('.modal-overlay');

    // Extract data from card
    const imageSrc = card.querySelector('.project-image img').src;
    const title = card.querySelector('.project-title').textContent;
    const description = card.querySelector('.project-description').innerText;

    const techStackHTML = card.querySelector('.project-tech').innerHTML;
    const linksHTML = card.querySelector('.project-links').innerHTML;

    // Populate Modal
    overlay.querySelector('.modal-image').src = imageSrc;
    overlay.querySelector('.modal-title').textContent = title;
    overlay.querySelector('.modal-description').textContent = description;
    overlay.querySelector('.project-tech').innerHTML = techStackHTML;
    overlay.querySelector('.modal-links').innerHTML = linksHTML;

    // Show Modal
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeProjectModal = () => {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
};

// Export to be used in main.js
window.initProjectModals = initProjectModals;
