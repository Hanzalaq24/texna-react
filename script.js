// ===== TEXNA MOBILE WEBSITE - STEP BY STEP BUILD =====

// Simple JavaScript for mobile website
console.log('🚀 Texna Mobile Website Loading...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Texna Mobile Website Loaded Successfully');
    
    // Add any mobile-specific functionality here as we build
    initializeMobileFeatures();
});

// Initialize mobile-specific features
function initializeMobileFeatures() {
    // Add touch-friendly interactions
    addTouchSupport();
    
    // Log device info for debugging
    logDeviceInfo();
}

// Add touch support for better mobile experience
function addTouchSupport() {
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Log device information for debugging
function logDeviceInfo() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const userAgent = navigator.userAgent;
    
    console.log('📱 Device Info:');
    console.log('Screen Width:', screenWidth + 'px');
    console.log('Screen Height:', screenHeight + 'px');
    console.log('User Agent:', userAgent);
}

// ===== HAMBURGER MENU FUNCTIONALITY =====
function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!menuOverlay) {
        console.error('❌ Menu overlay not found');
        return;
    }
    
    const isActive = menuOverlay.classList.contains('active');
    
    if (isActive) {
        // Close menu
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('❌ Menu closed');
    } else {
        // Open menu
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('✅ Menu opened');
    }
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menuOverlay = document.getElementById('menuOverlay');
        if (menuOverlay && menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    }
});

console.log('✅ Hamburger menu system initialized');

// ===== HERO BANNER SLIDER FUNCTIONALITY =====
let currentSlide = 0;
let slideInterval;
const totalSlides = 3;

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
});

function initializeSlider() {
    // Start auto-slide
    startAutoSlide();
    
    // Add touch support for mobile swiping
    addSliderTouchSupport();
    
    console.log('🎠 Hero banner slider initialized');
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
    
    // Reset auto-slide timer
    clearInterval(slideInterval);
    startAutoSlide();
    
    console.log('🎠 Moved to slide:', slideIndex + 1);
}

function updateSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.dot');
    
    // Move slider track
    const translateX = -currentSlide * 33.333;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
}

function addSliderTouchSupport() {
    const sliderContainer = document.querySelector('.slider-container');
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isDragging = false;
    let hasMoved = false;
    
    // Touch start
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        hasMoved = false;
        
        // Pause auto-slide while touching
        clearInterval(slideInterval);
    }, { passive: true });
    
    // Touch move (for better gesture detection)
    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        // Calculate movement
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        // Mark that user has moved
        if (diffX > 5 || diffY > 5) {
            hasMoved = true;
        }
        
        // Prevent vertical scrolling if horizontal swipe is detected
        if (diffX > diffY && diffX > 5) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Touch end
    sliderContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        isDragging = false;
        
        if (hasMoved) {
            handleSwipe();
        }
        
        // Resume auto-slide
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 20; // Lower threshold for easier swiping
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        
        // Only process horizontal swipes (not vertical scrolls)
        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
                console.log('👆 Swiped left - next slide');
            } else {
                // Swipe right - previous slide
                prevSlide();
                console.log('👆 Swiped right - previous slide');
            }
        }
    }
}

// Pause slider when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else {
        startAutoSlide();
    }
});

// ===== FEATURE CARDS POPUP FUNCTIONALITY =====
const featureData = {
    readymade: {
        icon: "SVG/Readymade Jala.svg",
        title: "Readymade Jala",
        text: `At Texna, we understand the value of time in production. That's why we've developed a system where your Jala is ready before your Jacquard machines arrive. Our expert team installs it immediately, ensuring your production starts without delay. 

With Texna, you can:
<ul>
<li>Get started with production faster</li>
<li>Minimize downtime and maximize efficiency</li>
<li>Rely on our expertise for seamless installation</li>
<li>Trust Texna to keep your production running smoothly</li>
</ul>`
    },
    experience: {
        icon: "SVG/35+ Years of  Expertise.svg",
        title: "35+ years of experience",
        text: `Under the expertise of Nasir Khan, Texna delivers top-quality Jala solutions. With 35+ years of experience, Nasir Khan ensures precision and reliability. 

Nasir Khan's team (Texna) provides exceptional service and support. Trust Nasir Khan's expertise for your Jala needs. Nasir Khan's legacy is built on quality and customer satisfaction.`
    },
    service: {
        icon: "SVG/Quick Service  (Under 24 Hrs).svg",
        title: "Quick Service (under 24 Hrs.)",
        text: `Experience rapid service with Texna! Our team delivers quick solutions within 24 hours. Get your Jala needs met promptly and efficiently. Trust Texna for timely support.`
    },
    support: {
        icon: "SVG/Support and  Maintenance.svg",
        title: "Support & Maintenance",
        text: `Texna's Support & Maintenance services ensure your Jala systems run smoothly. Our dedicated team provides prompt assistance and troubleshooting. 

Regular maintenance minimizes downtime and optimizes performance. Trust Texna to keep your Jala systems in top condition. Reliable support for long-term productivity.`
    }
};

function openPopup(featureKey) {
    const feature = featureData[featureKey];
    if (!feature) return;
    
    const overlay = document.getElementById('popupOverlay');
    const icon = document.getElementById('popupIcon');
    const title = document.getElementById('popupTitle');
    const text = document.getElementById('popupText');
    
    // Set popup content
    icon.src = feature.icon;
    icon.alt = feature.title;
    title.textContent = feature.title;
    text.innerHTML = feature.text;
    
    // Show popup
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    console.log('📋 Opened popup for:', feature.title);
}

function closePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    console.log('❌ Closed popup');
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// We'll add more functions as we build step by step

// ===== PROFILE BANNER POPUP FUNCTIONALITY =====
const profileBannerData = {
    nasir: {
        image: "Profile banner/04.webp",
        heading: "CEO's Message",
        text: `<p>At TEXNA, our journey is driven by innovation, integrity, and excellence. From humble beginnings to a trusted name, we've stayed committed to creating value through quality and consistency.</p><p>Our success lies in the trust of our customers and partners — every product reflects our dedication to craftsmanship, sustainability, and forward-thinking design.</p><p>As we grow, we'll keep pushing boundaries, embracing technology, and empowering our people to build a smarter, more connected future.</p><div class="signature"><strong>Nasir Khan</strong><span>Chief Executive Officer, TEXNA</span></div>`
    },
    affan: {
        image: "Profile banner/05.webp",
        text: `<p style="color: #FFD700; font-weight: 700; font-size: 12px; margin-bottom: 6px;">CFO's Message</p><p style="font-size: 10px;">At TEXNA, our financial approach is built on transparency, responsibility, and sustainable growth. We stay committed to efficiency, innovation, and long-term value creation.</p><p style="font-size: 10px;">Our goal is to keep TEXNA financially strong — driving progress, supporting our vision, and creating lasting value for every stakeholder.</p><div class="signature"><strong style="font-size: 12px;">Affan Khan</strong><span style="font-size: 8px;">Chief Financial Officer, TEXNA</span></div>`
    },
    zaid: {
        image: "Profile banner/07.webp",
        heading: "COO's Message",
        text: `<p style="font-size: 10px;">At TEXNA, operational excellence drives everything we do. From production to delivery, we focus on quality, efficiency, and constant improvement.</p><p style="font-size: 10px;">With teamwork, innovation, and precision, our people power TEXNA's success — turning challenges into achievements and setting new standards of excellence.</p><div class="signature"><strong style="font-size: 12px;">Zaid Khan</strong><span style="font-size: 8px;">Chief Operating Officer, TEXNA</span></div>`
    },
    kalim: {
        image: "Profile banner/06.webp",
        heading: "General Manager's Message",
        text: `<p style="font-size: 10px;">At TEXNA, we drive progress through innovation, dedication, and teamwork. My focus is to align our daily operations and customer relationships with our long-term vision of excellence and growth.</p><p style="font-size: 10px;">With integrity, efficiency, and a passion for quality, we aim to exceed expectations and set new standards for the future.</p><div class="signature"><strong style="font-size: 12px;">Kalim Malik</strong><span style="font-size: 8px;">General Manager, TEXNA</span></div>`
    }
};

// Make function globally accessible
window.openProfileBanner = function(profileKey) {
    console.log('🔵 Profile clicked:', profileKey);
    
    const profile = profileBannerData[profileKey];
    if (!profile) {
        console.error('❌ Profile not found:', profileKey);
        return;
    }
    
    const overlay = document.getElementById('profileBannerOverlay');
    const image = document.getElementById('profileBannerImage');
    const heading = document.getElementById('profileBannerHeading');
    const text = document.getElementById('profileBannerText');
    
    if (!overlay || !image || !text) {
        console.error('❌ Profile banner elements not found');
        return;
    }
    
    console.log('✅ Setting banner image:', profile.image);
    
    // Set banner content
    image.src = profile.image;
    image.alt = profile.heading || profile.text.split('\n')[0];
    
    // Set heading if exists
    if (heading && profile.heading) {
        heading.innerHTML = profile.heading;
        heading.style.display = 'block';
    } else if (heading) {
        heading.style.display = 'none';
    }
    
    text.innerHTML = profile.text.replace(/\n/g, '<br>');
    
    // Add class for profiles with headings (to adjust text position)
    if (profile.heading) {
        text.classList.add('has-heading');
    } else {
        text.classList.remove('has-heading');
    }
    
    // Position text on right for Affan and Kalim, left for others
    if (profileKey === 'affan' || profileKey === 'kalim') {
        if (heading) heading.classList.add('text-right');
        text.classList.add('text-right');
    } else {
        if (heading) heading.classList.remove('text-right');
        text.classList.remove('text-right');
    }
    
    // Show banner
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Profile banner opened successfully');
};

// Make function globally accessible
window.closeProfileBanner = function() {
    console.log('🔵 Closing profile banner');
    
    const overlay = document.getElementById('profileBannerOverlay');
    if (!overlay) {
        console.error('❌ Profile banner overlay not found');
        return;
    }
    
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    console.log('✅ Profile banner closed');
};

// Close profile banner on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('profileBannerOverlay');
        if (overlay && overlay.classList.contains('active')) {
            window.closeProfileBanner();
        }
    }
});

console.log('✅ Profile banner system initialized');

// Test that functions are accessible
if (typeof window.openProfileBanner === 'function') {
    console.log('✅ openProfileBanner is accessible globally');
} else {
    console.error('❌ openProfileBanner is NOT accessible');
}

if (typeof window.closeProfileBanner === 'function') {
    console.log('✅ closeProfileBanner is accessible globally');
} else {
    console.error('❌ closeProfileBanner is NOT accessible');
}


// ===== REVIEWS SLIDER FUNCTIONALITY =====
let currentReview = 0;
let reviewInterval;
const totalReviews = 10;

// Initialize reviews slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsSlider();
});

function initializeReviewsSlider() {
    // Start auto-slide for reviews
    startReviewAutoSlide();
    
    // Add touch support for mobile swiping
    addReviewsTouchSupport();
    
    console.log('⭐ Reviews slider initialized');
}

function goToReview(reviewIndex) {
    currentReview = reviewIndex;
    updateReviewsSlider();
    
    // Reset auto-slide timer
    clearInterval(reviewInterval);
    startReviewAutoSlide();
    
    console.log('⭐ Moved to review:', reviewIndex + 1);
}

function updateReviewsSlider() {
    const reviewsSlider = document.getElementById('reviewsSlider');
    
    if (!reviewsSlider) return;
    
    // Move slider track (10% per review since we have 10 reviews)
    const translateX = -currentReview * 10;
    reviewsSlider.style.transform = `translateX(${translateX}%)`;
}

function nextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    updateReviewsSlider();
}

function prevReview() {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    updateReviewsSlider();
}

function startReviewAutoSlide() {
    reviewInterval = setInterval(nextReview, 8000); // Change review every 8 seconds (slower)
}

function addReviewsTouchSupport() {
    const reviewsContainer = document.querySelector('.reviews-slider-container');
    if (!reviewsContainer) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isDragging = false;
    
    // Touch start
    reviewsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        
        // Pause auto-slide while touching
        clearInterval(reviewInterval);
    }, { passive: true });
    
    // Touch move
    reviewsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        // Prevent vertical scrolling if horizontal swipe is detected
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Touch end
    reviewsContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        isDragging = false;
        
        handleReviewSwipe();
        
        // Resume auto-slide
        startReviewAutoSlide();
    }, { passive: true });
    
    function handleReviewSwipe() {
        const swipeThreshold = 30;
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        
        // Only process horizontal swipes
        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Swipe left - next review
                nextReview();
                console.log('👆 Swiped left - next review');
            } else {
                // Swipe right - previous review
                prevReview();
                console.log('👆 Swiped right - previous review');
            }
        }
    }
}

// Pause reviews slider when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(reviewInterval);
    } else {
        if (typeof startReviewAutoSlide === 'function') {
            startReviewAutoSlide();
        }
    }
});

console.log('✅ Reviews slider system initialized');


// ===== BOTTOM NAVIGATION FUNCTIONALITY =====
// Set active navigation item based on current page
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
});

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        
        // Remove active class from all items
        item.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    console.log('✅ Bottom navigation initialized');
}

// Add click animation to nav items
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't prevent default for WhatsApp link
            if (!this.getAttribute('href').includes('wa.me')) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});


// ===== PRODUCT DETAIL NAVIGATION =====
function viewProductDetail(name, image, description, features) {
    // Store product data in sessionStorage
    const productData = {
        name: name,
        image: image,
        description: description,
        features: features
    };
    
    sessionStorage.setItem('currentProduct', JSON.stringify(productData));
    
    // Navigate to product detail page
    window.location.href = 'product-detail.html';
    
    console.log('📦 Navigating to product detail:', name);
}

// Load product data on product detail page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
});

function loadProductDetail() {
    const productDataStr = sessionStorage.getItem('currentProduct');
    
    if (!productDataStr) {
        console.error('❌ No product data found');
        return;
    }
    
    const productData = JSON.parse(productDataStr);
    
    // Update page elements
    const productName = document.getElementById('productName');
    const productImage = document.getElementById('productImage');
    const productDescription = document.getElementById('productDescription');
    const featuresList = document.getElementById('featuresList');
    
    if (productName) productName.textContent = productData.name;
    if (productImage) {
        productImage.src = productData.image;
        productImage.alt = productData.name;
    }
    if (productDescription) productDescription.textContent = productData.description;
    
    // Update features list
    if (featuresList && productData.features) {
        featuresList.innerHTML = '';
        productData.features.forEach(feature => {
            const li = document.createElement('li');
            li.className = 'feature-item';
            li.innerHTML = `
                <svg class="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.6 5L7.5 14.1 3.4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>${feature}</span>
            `;
            featuresList.appendChild(li);
        });
    }
    
    // Update page title
    document.title = `${productData.name} - Texna`;
    
    console.log('✅ Product detail loaded:', productData.name);
}
