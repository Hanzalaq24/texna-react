// ===== TEXNA WEBSITE - REBUILT JAVASCRIPT =====
// Modern, Clean, and Optimized JavaScript

'use strict';

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let currentReviewGroup = 0;
let slideInterval;
let reviewInterval;

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// ===== DOMAIN COMPATIBILITY =====
function initializeDomainCompatibility() {
    const currentDomain = window.location.origin;
    
    // Update canonical URL
    const canonicalLink = $('link[rel="canonical"]');
    if (canonicalLink) {
        canonicalLink.href = currentDomain + window.location.pathname;
    }
    
    // Update Open Graph URLs
    const ogUrl = $('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = currentDomain + window.location.pathname;
    }
    
    // Update Open Graph images
    const ogImage = $('meta[property="og:image"]');
    if (ogImage && ogImage.content === '') {
        if (window.location.pathname.includes('products')) {
            ogImage.content = currentDomain + '/Products Photos/Products-1.webp';
        } else {
            ogImage.content = currentDomain + '/Texna Machine.webp';
        }
    }
    
    // Update Twitter image
    const twitterImage = $('meta[name="twitter:image"]');
    if (twitterImage && twitterImage.content === '') {
        twitterImage.content = currentDomain + '/Texna Machine.webp';
    }
    
    // Update structured data
    const structuredDataScript = $('script[type="application/ld+json"]');
    if (structuredDataScript) {
        try {
            const data = JSON.parse(structuredDataScript.textContent);
            if (data.url === '') {
                data.url = currentDomain;
            }
            if (data.logo === '') {
                data.logo = currentDomain + '/SVG/Texna Logo.svg';
            }
            structuredDataScript.textContent = JSON.stringify(data, null, 4);
        } catch (e) {
            console.log('Could not update structured data:', e);
        }
    }
}

// ===== HERO BANNER SLIDER =====
function initializeSlider() {
    const slides = $$('.banner-slide');
    const indicators = $$('.indicator');
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 4000);
    }
    
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });
    
    // Start automatic slideshow
    startSlideshow();
    
    // Pause on hover (desktop only)
    const banner = $('.hero-banner');
    if (banner && window.innerWidth >= 1024) {
        banner.addEventListener('mouseenter', stopSlideshow);
        banner.addEventListener('mouseleave', startSlideshow);
    }
    
    // Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });
}

// Make slide functions global for HTML onclick handlers
window.currentSlideIndex = function(index) {
    const slides = $$('.banner-slide');
    if (slides.length > 0) {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Remove active from all
        slides.forEach(slide => slide.classList.remove('active'));
        $$('.indicator').forEach(indicator => indicator.classList.remove('active'));
        
        // Add active to selected
        if (slides[index - 1]) {
            slides[index - 1].classList.add('active');
        }
        if ($$('.indicator')[index - 1]) {
            $$('.indicator')[index - 1].classList.add('active');
        }
        
        currentSlide = index - 1;
        
        // Restart slideshow
        slideInterval = setInterval(() => {
            const nextIndex = (currentSlide + 1) % slides.length;
            window.currentSlideIndex(nextIndex + 1);
        }, 4000);
    }
};

// ===== REVIEWS SLIDER =====
function initializeReviewsSlider() {
    const reviewGroups = $$('.reviews-group');
    const reviewIndicators = $$('.review-indicator');
    
    if (reviewGroups.length === 0) return;
    
    function showReviewGroup(index) {
        // Remove active class from all groups and indicators
        reviewGroups.forEach(group => group.classList.remove('active'));
        reviewIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current group and indicator
        if (reviewGroups[index]) {
            reviewGroups[index].classList.add('active');
        }
        if (reviewIndicators[index]) {
            reviewIndicators[index].classList.add('active');
        }
        
        currentReviewGroup = index;
    }
    
    function nextReviewGroup() {
        const nextIndex = (currentReviewGroup + 1) % reviewGroups.length;
        showReviewGroup(nextIndex);
    }
    
    function startReviewSlideshow() {
        reviewInterval = setInterval(nextReviewGroup, 6000);
    }
    
    function stopReviewSlideshow() {
        if (reviewInterval) {
            clearInterval(reviewInterval);
        }
    }
    
    // Initialize first group
    showReviewGroup(0);
    
    // Add click handlers to indicators
    reviewIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopReviewSlideshow();
            showReviewGroup(index);
            startReviewSlideshow();
        });
    });
    
    // Start automatic slideshow
    startReviewSlideshow();
    
    // Pause on hover
    const reviewsSection = $('.reviews-section');
    if (reviewsSection) {
        reviewsSection.addEventListener('mouseenter', stopReviewSlideshow);
        reviewsSection.addEventListener('mouseleave', startReviewSlideshow);
    }
}

// Make review functions global for HTML onclick handlers
window.currentReviewGroup = function(index) {
    const reviewGroups = $$('.reviews-group');
    if (reviewGroups.length > 0) {
        if (reviewInterval) {
            clearInterval(reviewInterval);
        }
        
        // Remove active from all
        reviewGroups.forEach(group => group.classList.remove('active'));
        $$('.review-indicator').forEach(indicator => indicator.classList.remove('active'));
        
        // Add active to selected
        if (reviewGroups[index - 1]) {
            reviewGroups[index - 1].classList.add('active');
        }
        if ($$('.review-indicator')[index - 1]) {
            $$('.review-indicator')[index - 1].classList.add('active');
        }
        
        currentReviewGroup = index - 1;
        
        // Restart slideshow
        reviewInterval = setInterval(() => {
            const nextIndex = (currentReviewGroup + 1) % reviewGroups.length;
            window.currentReviewGroup(nextIndex + 1);
        }, 6000);
    }
};

// ===== NAVIGATION =====
function initializeNavigation() {
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update desktop navigation
    $$('.desktop-nav-item').forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
    
    // Update bottom navigation
    $$('.nav-item').forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
}

// ===== HAMBURGER MENU =====
function initializeMenu() {
    const menuBtn = $('.menu-btn');
    const menuOverlay = $('.menu-overlay');
    const hamburgerMenu = $('.hamburger-menu');
    const menuClose = $('.menu-close');
    const menuItems = $$('.menu-item');
    
    if (!menuBtn) return;
    
    function openMenu() {
        if (menuOverlay) menuOverlay.classList.add('active');
        if (hamburgerMenu) hamburgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    menuBtn.addEventListener('click', openMenu);
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking menu items
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}

// ===== BACK BUTTON =====
function initializeBackButton() {
    const backBtn = $('.back-btn');
    
    if (!backBtn) return;
    
    // Check if there's history to go back to
    if (window.history.length <= 1) {
        backBtn.disabled = true;
        backBtn.style.opacity = '0.5';
        backBtn.style.cursor = 'not-allowed';
    }
    
    backBtn.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = $('.search-input');
    const searchBtn = $('.search-btn');
    const resultsContainer = $('.results-container');
    
    if (!searchInput || !searchBtn) return;
    
    // Sample search data (in a real app, this would come from an API)
    const searchData = [
        {
            title: 'Guide Board',
            description: 'High-quality guide board designed for precise yarn guidance and smooth loom operation.',
            type: 'Product',
            image: 'Products Photos/Products-1.webp',
            link: 'product-detail.html?product=guide-board'
        },
        {
            title: 'Harness Cord',
            description: 'Durable harness cord for reliable textile machinery operation.',
            type: 'Product',
            image: 'Products Photos/Products-2.webp',
            link: 'product-detail.html?product=harness-cord'
        },
        {
            title: 'Installation Services',
            description: 'Professional installation services for all textile machinery.',
            type: 'Service',
            image: 'service-installation.webp',
            link: 'services.html#installation'
        },
        {
            title: 'Maintenance Services',
            description: '24/7 maintenance and support services for your textile equipment.',
            type: 'Service',
            image: 'service-maintenance.webp',
            link: 'services.html#maintenance'
        }
    ];
    
    function performSearch(query) {
        if (!query.trim()) {
            showNoResults();
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.type.toLowerCase().includes(query.toLowerCase())
        );
        
        displayResults(results, query);
    }
    
    function displayResults(results, query) {
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            showNoResults(query);
            return;
        }
        
        const resultsHTML = `
            <div class="results-section">
                <h2 class="results-title">Search Results for "${query}" (${results.length})</h2>
                <div class="results-grid">
                    ${results.map(result => `
                        <div class="search-result-item" onclick="window.location.href='${result.link}'">
                            <img src="${result.image}" alt="${result.title}" class="result-image" 
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQzNzcwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UZXhuYTwvdGV4dD48L3N2Zz4='">
                            <div class="result-type">${result.type}</div>
                            <h3 class="result-title">${result.title}</h3>
                            <p class="result-description">${result.description}</p>
                            <a href="${result.link}" class="result-link">View Details →</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
    }
    
    function showNoResults(query = '') {
        if (!resultsContainer) return;
        
        const noResultsHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                        <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <h3>No Results Found</h3>
                <p>${query ? `No results found for "${query}". ` : ''}Try searching for products, services, or company information.</p>
            </div>
        `;
        
        resultsContainer.innerHTML = noResultsHTML;
    }
    
    // Event listeners
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        performSearch(query);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            performSearch(query);
        }
    });
    
    // Auto-search with debounce
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        } else if (query.length === 0) {
            showNoResults();
        }
    }, 300));
}

// ===== PRODUCT DETAIL PAGE =====
function initializeProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (!productId) return;
    
    // Sample product data (in a real app, this would come from an API)
    const products = {
        'guide-board': {
            title: 'Guide Board',
            image: 'Products Photos/Products-1.webp',
            description: 'High-quality guide board designed for precise yarn guidance and smooth loom operation. Manufactured with premium materials to ensure durability and consistent performance in textile manufacturing processes.',
            features: [
                'Precision-engineered for optimal performance',
                'Durable construction for long-lasting use',
                'Compatible with various loom types',
                'Easy installation and maintenance',
                'Corrosion-resistant materials'
            ]
        },
        'harness-cord': {
            title: 'Harness Cord',
            image: 'Products Photos/Products-2.webp',
            description: 'Premium harness cord designed for reliable textile machinery operation. Made from high-grade materials to withstand continuous use in demanding industrial environments.',
            features: [
                'High tensile strength',
                'Excellent durability',
                'Smooth operation',
                'Various sizes available',
                'Quality tested materials'
            ]
        }
    };
    
    const product = products[productId];
    
    if (product) {
        // Update page content
        const titleElement = $('#product-title');
        const imageElement = $('#main-product-image');
        const descriptionElement = $('#product-description');
        
        if (titleElement) titleElement.textContent = product.title;
        if (imageElement) {
            imageElement.src = product.image;
            imageElement.alt = product.title;
        }
        if (descriptionElement) descriptionElement.textContent = product.description;
        
        // Update page title
        document.title = `${product.title} - Texna`;
        
        // Update meta description
        const metaDescription = $('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = product.description;
        }
    }
}

// ===== PRODUCTS PAGE =====
function initializeProductsPage() {
    const productsContainer = $('.products-container');
    
    if (!productsContainer) return;
    
    // Sample products data
    const products = [
        {
            id: 'guide-board',
            title: 'Guide Board',
            description: 'High-quality guide board designed for precise yarn guidance and smooth loom operation.',
            image: 'Products Photos/Products-1.webp',
            category: 'Machinery Parts'
        },
        {
            id: 'harness-cord',
            title: 'Harness Cord',
            description: 'Durable harness cord for reliable textile machinery operation.',
            image: 'Products Photos/Products-2.webp',
            category: 'Accessories'
        },
        {
            id: 'comber-board',
            title: 'Comber Board',
            description: 'Precision comber board for enhanced textile processing efficiency.',
            image: 'Products Photos/Products-3.webp',
            category: 'Machinery Parts'
        },
        {
            id: 'wire-healds',
            title: 'Wire Healds (Raj)',
            description: 'Premium wire healds for superior weaving performance.',
            image: 'Products Photos/Products-4.webp',
            category: 'Weaving Components'
        }
    ];
    
    // Generate products HTML
    const productsHTML = products.map(product => `
        <div class="product-card" onclick="window.location.href='product-detail.html?product=${product.id}'">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQzNzcwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UZXhuYTwvdGV4dD48L3N2Zz4='">
                <div class="product-category">${product.category}</div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <a href="product-detail.html?product=${product.id}" class="view-details-btn">View Details</a>
            </div>
        </div>
    `).join('');
    
    productsContainer.innerHTML = productsHTML;
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizeImages() {
    // Lazy loading for images
    const images = $$('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

function preloadCriticalResources() {
    // Preload critical images
    const criticalImages = [
        '01.webp',
        'SVG/Texna Logo.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ===== ERROR HANDLING =====
function handleErrors() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });
}

// ===== ANALYTICS & TRACKING =====
function initializeAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track user interactions
    document.addEventListener('click', throttle((e) => {
        const target = e.target.closest('a, button');
        if (target) {
            const action = target.textContent.trim() || target.alt || 'Click';
            console.log('User interaction:', action);
            // Send to analytics service
        }
    }, 1000));
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add skip links
    const skipLink = $('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = $(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keyboard navigation for sliders
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('indicator')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Focus management for menu
    const menuBtn = $('.menu-btn');
    const menuClose = $('.menu-close');
    
    if (menuBtn && menuClose) {
        menuBtn.addEventListener('click', () => {
            setTimeout(() => menuClose.focus(), 100);
        });
        
        menuClose.addEventListener('click', () => {
            menuBtn.focus();
        });
    }
}

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    console.log('🚀 Initializing Texna website...');
    
    try {
        // Core functionality
        initializeDomainCompatibility();
        initializeNavigation();
        initializeMenu();
        initializeBackButton();
        
        // Page-specific functionality
        initializeSlider();
        initializeReviewsSlider();
        initializeSearch();
        initializeProductDetail();
        initializeProductsPage();
        
        // Enhancements
        optimizeImages();
        preloadCriticalResources();
        enhanceAccessibility();
        initializeAnalytics();
        
        console.log('✅ Texna website initialized successfully');
        
    } catch (error) {
        console.error('❌ Error initializing website:', error);
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations and intervals when page is hidden
        if (slideInterval) clearInterval(slideInterval);
        if (reviewInterval) clearInterval(reviewInterval);
    } else {
        // Resume when page becomes visible
        if ($('.banner-slide')) {
            initializeSlider();
        }
        if ($('.reviews-group')) {
            initializeReviewsSlider();
        }
    }
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that depend on screen size
    initializeNavigation();
}, 250));

// Initialize error handling
handleErrors();

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initializeSlider,
        initializeReviewsSlider,
        initializeNavigation,
        initializeMenu
    };
}