// script.js
document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('zoomable-image');
    
    const panzoom = Panzoom(element, {
        maxScale: 100,
        minScale: 0.01,
        smoothScale: true,
        startScale: 1,
        startX: 0,
        startY: 0,
        animate: true,                 // Enable animations
        duration: 200,                 // Animation duration in ms
        easing: 'ease-out',           // CSS easing function
        momentum: true,               // Enable inertia
        velocityTimeout: 300,         // Time in ms to maintain momentum
        smoothScale: true,            // Smooth scaling
        step: 0.05,                   // Smaller steps for smoother zoom
        contain: 'outside',
        panOnlyWhenZoomed: true,     // Prevent panning when not zoomed
    });

    // Enable mouse wheel zooming
    element.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

    // Optional: Double click to zoom in
    element.addEventListener('dblclick', (event) => {
        event.preventDefault();
        panzoom.zoomIn();
    });

    // Optional: Add keyboard controls
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '=':
            case '+':
                panzoom.zoomIn();
                break;
            case '-':
                panzoom.zoomOut();
                break;
            case 'ArrowRight':
                panzoom.pan(10, 0);
                break;
            case 'ArrowLeft':
                panzoom.pan(-10, 0);
                break;
            case 'ArrowUp':
                panzoom.pan(0, -10);
                break;
            case 'ArrowDown':
                panzoom.pan(0, 10);
                break;
            case 'r':
                panzoom.reset();
                break;
        }
    });
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const infoLink = document.querySelector('a[href="#info"]');
    const sourcesLink = document.querySelector('a[href="#source"]');

    function openSidebar(scrollToSources = false) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        
        if (scrollToSources) {
            const sourcesSection = document.getElementById('sources-section');
            setTimeout(() => {
                sourcesSection.scrollIntoView({ behavior: 'smooth' });
            }, 600); // Wait for sidebar animation to complete
        } else {
            sidebar.querySelector('.sidebar-content').scrollTop = 0;
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    infoLink.addEventListener('click', (e) => {
        e.preventDefault();
        openSidebar(false);
    });

    sourcesLink.addEventListener('click', (e) => {
        e.preventDefault();
        openSidebar(true);
    });

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
    const sidebarContent = document.querySelector('.sidebar-content');
    const topShadow = document.querySelector('.scroll-shadow-top');
    const bottomShadow = document.querySelector('.scroll-shadow-bottom');

    sidebarContent.addEventListener('scroll', function() {
        // Show/hide top shadow
        topShadow.style.opacity = this.scrollTop > 0 ? '1' : '0';

        // Show/hide bottom shadow
        const isAtBottom = this.scrollHeight - this.scrollTop <= this.clientHeight + 1;
        bottomShadow.style.opacity = isAtBottom ? '0' : '1';
    });

    // Initial check for bottom shadow
    const isContentShorterThanContainer = sidebarContent.scrollHeight <= sidebarContent.clientHeight;
    bottomShadow.style.opacity = isContentShorterThanContainer ? '0' : '1';

    // Zoom hint functionality
    const zoomHint = document.getElementById('zoom-hint');
    let hasZoomed = false;

    // Function to hide zoom hint
    function hideZoomHint() {
        if (!hasZoomed) {
            hasZoomed = true;
            zoomHint.classList.add('fade-out');
            // Remove the element after fade animation
            setTimeout(() => {
                zoomHint.style.display = 'none';
            }, 500);
        }
    }

    // Hide hint on wheel event (zoom)
    element.parentElement.addEventListener('wheel', () => {
        hideZoomHint();
    });

    // Hide hint on touch events (pinch zoom)
    element.parentElement.addEventListener('touchstart', () => {
        hideZoomHint();
    });

    // Hide hint on keyboard zoom
    document.addEventListener('keydown', (event) => {
        if (event.key === '=' || event.key === '+' || event.key === '-') {
            hideZoomHint();
        }
    });

    // Optional: Hide hint after a set time (e.g., 5 seconds)
    setTimeout(hideZoomHint, 5000);
    
});