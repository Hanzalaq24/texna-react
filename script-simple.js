// ===== TEXNA WEBSITE - SIMPLE JAVASCRIPT =====
// Clean and minimal JavaScript for basic functionality

'use strict';

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let slideInterval;

// ===== UTILITY FUNCTIONS =====
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
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
    
    // Initialize first slide
    showSlide(0);
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            showSlide(index);
            slideInterval = setInterval(nextSlide, 4000);
        });
    });
    
    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 4000);
}

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
    
    backBtn.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });
}

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    console.log('🚀 Initializing Texna website...');
    
    try {
        // Core functionality
        initializeNavigation();
        initializeMenu();
        initializeBackButton();
        initializeSlider();
        
        console.log('✅ Texna website initialized successfully');
        
    } catch (error) {
        console.error('❌ Error initializing website:', error);
    }
}

// ===== GLOBAL FUNCTIONS FOR HTML =====
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

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (slideInterval) clearInterval(slideInterval);
    } else {
        if ($('.banner-slide')) {
            initializeSlider();
        }
    }
});

console.log('📄 Texna JavaScript loaded successfully');