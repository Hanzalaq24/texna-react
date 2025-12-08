// ===== TEXNA MOBILE-ONLY WEBSITE - JAVASCRIPT =====

console.log('🚀 Texna Mobile Website Loading...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Texna Mobile Website Loaded Successfully');
    
    // Initialize mobile-specific features
    initializeMobileFeatures();
    
    // Check if URL has #search hash and open search overlay
    if (window.location.hash === '#search') {
        setTimeout(function() {
            openSearch();
        }, 100);
    }
});

// Initialize mobile-specific features
function initializeMobileFeatures() {
    // Add touch-friendly interactions
    addTouchSupport();
    
    // Log device info for debugging
    logDeviceInfo();
    
    // Set active menu item on page load
    setActiveMenuItem();
    
    // Set active navigation item
    setActiveNavItem();
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
        
        // Update active menu item when opening
        setActiveMenuItem();
        
        console.log('✅ Menu opened');
    }
}

// Set active menu item based on current page
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class from all items
        link.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    console.log('✅ Menu active item set for:', currentPage);
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
    
    if (!overlay || !icon || !title || !text) {
        console.error('❌ Popup elements not found');
        return;
    }
    
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
    if (!overlay) return;
    
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    console.log('❌ Closed popup');
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const popupOverlay = document.getElementById('popupOverlay');
        if (popupOverlay && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    }
});

// ===== PROFILE BANNER POPUP FUNCTIONALITY =====
const profileBannerData = {
    nasir: {
        image: "Profile banner/04.webp",
        heading: "CEO's Message",
        text: `At TEXNA, our journey is driven by innovation, integrity, and excellence. From humble beginnings to a trusted name, we've stayed committed to creating value through quality and consistency. Our success lies in the trust of our customers and partners. Sustainability, and forward-thinking design as we continue pushing boundaries, embracing technology, and empowering our people to build a smarter, more connected future.<div class="signature"><strong>Nasir Khan</strong><span>Chief Executive Officer, TEXNA</span></div>`
    },
    affan: {
        image: "Profile banner/05.webp",
        heading: "CFO's Message",
        text: `At TEXNA, our financial approach is built on transparency, responsibility, and sustainable growth. We stay committed to efficiency, innovation, and long-term value creation. Our goal is to keep TEXNA financially strong — driving progress, supporting our vision, and creating lasting value for every stakeholder.<div class="signature"><strong>Affan Khan</strong><span>Chief Financial Officer, TEXNA</span></div>`
    },
    zaid: {
        image: "Profile banner/07.webp",
        heading: "COO's Message",
        text: `At TEXNA, operational excellence drives everything we do. From production to delivery, we focus on quality, efficiency, and constant improvement. With teamwork, innovation, and precision, our people power TEXNA's success — turning challenges into achievements and setting new standards of excellence.<div class="signature"><strong>Zaid Khan</strong><span>Chief Operating Officer, TEXNA</span></div>`
    },
    kalim: {
        image: "Profile banner/06.webp",
        heading: "General Manager's Message",
        text: `At TEXNA, we drive progress through innovation, dedication, and teamwork. My focus is to align our daily operations and customer relationships with our long-term vision of excellence and growth. With integrity, efficiency, and a passion for quality, we aim to exceed expectations and set new standards for the future.<div class="signature"><strong>Kalim Malik</strong><span>General Manager, TEXNA</span></div>`
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
    
    if (!overlay || !image) {
        console.error('❌ Profile banner elements not found');
        return;
    }
    
    console.log('✅ Setting banner image:', profile.image);
    
    // Set banner image
    image.src = profile.image;
    image.alt = profile.heading || 'Profile Banner';
    
    // Set heading if exists
    if (heading && profile.heading) {
        heading.innerHTML = profile.heading;
        heading.style.display = 'block';
    } else if (heading) {
        heading.style.display = 'none';
    }
    
    // Set text if exists
    if (text && profile.text) {
        text.innerHTML = profile.text;
        text.style.display = 'block';
    } else if (text) {
        text.style.display = 'none';
    }
    
    // Position text on right for Affan and Kalim, left for others
    if (profileKey === 'affan' || profileKey === 'kalim') {
        if (heading) heading.classList.add('text-right');
        if (text) text.classList.add('text-right');
    } else {
        if (heading) heading.classList.remove('text-right');
        if (text) text.classList.remove('text-right');
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

// ===== BOTTOM NAVIGATION FUNCTIONALITY =====
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

// ===== HERO SLIDER FUNCTIONALITY =====
let currentHeroSlide = 0;
let heroSlideInterval;
const totalHeroSlides = 3;

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSlider();
});

function initializeHeroSlider() {
    // Start auto-slide
    startHeroAutoSlide();
    
    // Add touch support for mobile swiping
    addHeroSliderTouchSupport();
    
    // Update initial slide
    updateHeroSlider();
    
    console.log('🎠 Hero slider initialized');
}

function goToSlide(slideIndex) {
    currentHeroSlide = slideIndex;
    updateHeroSlider();
    
    // Reset auto-slide timer
    clearInterval(heroSlideInterval);
    startHeroAutoSlide();
    
    console.log('🎠 Moved to slide:', slideIndex + 1);
}

function updateHeroSlider() {
    const heroSlider = document.getElementById('heroSlider');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    if (!heroSlider) return;
    
    // Move slider with smooth transition
    const translateX = -currentHeroSlide * 33.333;
    heroSlider.style.transform = `translateX(${translateX}%)`;
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
        if (index === currentHeroSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    updateHeroSlider();
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
    updateHeroSlider();
}

function startHeroAutoSlide() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000); // Change slide every 5 seconds
}

function addHeroSliderTouchSupport() {
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (!sliderContainer) return;
    
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
        clearInterval(heroSlideInterval);
    }, { passive: true });
    
    // Touch move
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
            handleHeroSwipe();
        }
        
        // Resume auto-slide
        startHeroAutoSlide();
    }, { passive: true });
    
    function handleHeroSwipe() {
        const swipeThreshold = 30;
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        
        // Only process horizontal swipes (not vertical scrolls)
        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextHeroSlide();
                console.log('👆 Swiped left - next slide');
            } else {
                // Swipe right - previous slide
                prevHeroSlide();
                console.log('👆 Swiped right - previous slide');
            }
        }
    }
}

// Pause slider when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(heroSlideInterval);
    } else {
        startHeroAutoSlide();
    }
});

// Make goToSlide function globally accessible
window.goToSlide = goToSlide;

// ===== PRODUCTS SECTION HEIGHT MATCHING =====
function matchProductsHeight() {
    const mainImage = document.querySelector('.machine-image');
    const productsGrid = document.querySelector('.products-grid');
    
    if (!mainImage || !productsGrid) return;
    
    // Wait for images to load
    if (mainImage.complete) {
        setProductsGridHeight();
    } else {
        mainImage.addEventListener('load', setProductsGridHeight);
    }
    
    function setProductsGridHeight() {
        const mainImageHeight = mainImage.offsetHeight;
        if (mainImageHeight > 0) {
            productsGrid.style.height = mainImageHeight + 'px';
        }
    }
    
    // Also handle window resize
    window.addEventListener('resize', () => {
        setTimeout(setProductsGridHeight, 100);
    });
}

// Initialize products height matching when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    matchProductsHeight();
});

console.log('✅ All JavaScript functionality initialized');


// ===== TEXNA POPUP BANNER FUNCTIONALITY =====
function openTexnaPopup() {
    const overlay = document.getElementById('texnaPopupOverlay');
    if (!overlay) {
        console.error('❌ Texna popup overlay not found');
        return;
    }
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Texna popup opened');
}

function closeTexnaPopup() {
    const overlay = document.getElementById('texnaPopupOverlay');
    if (!overlay) return;
    
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    console.log('❌ Texna popup closed');
}

// Show popup every time page loads
function showTexnaPopup() {
    // Show popup after 1 second
    setTimeout(() => {
        openTexnaPopup();
    }, 1000);
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('texnaPopupOverlay');
        if (overlay && overlay.classList.contains('active')) {
            closeTexnaPopup();
        }
    }
});

// Initialize popup when DOM is loaded - DISABLED
// document.addEventListener('DOMContentLoaded', function() {
//     showTexnaPopup();
// });

console.log('✅ Texna popup banner system initialized');


// ===== PRODUCT DETAIL PAGE FUNCTIONALITY =====
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
}

// Load product details on product-detail.html page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetails();
    }
});

function loadProductDetails() {
    const productData = sessionStorage.getItem('currentProduct');
    
    if (productData) {
        const product = JSON.parse(productData);
        
        // Update product name
        const nameElement = document.getElementById('productName');
        if (nameElement) {
            nameElement.textContent = product.name;
        }
        
        // Update product image
        const imageElement = document.getElementById('productImage');
        if (imageElement) {
            imageElement.src = product.image;
            imageElement.alt = product.name;
        }
        
        // Update product description
        const descriptionElement = document.getElementById('productDescription');
        if (descriptionElement) {
            descriptionElement.textContent = product.description;
        }
        
        // Update features list
        const featuresListElement = document.getElementById('featuresList');
        if (featuresListElement && product.features) {
            featuresListElement.innerHTML = product.features.map(feature => `
                <li class="feature-item">
                    <svg class="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.6 5L7.5 14.1 3.4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${feature}</span>
                </li>
            `).join('');
        }
        
        console.log('✅ Product details loaded:', product.name);
    } else {
        console.log('⚠️ No product data found in sessionStorage');
    }
}

console.log('✅ Product detail functionality initialized');


// ===== SEARCH OVERLAY FUNCTIONALITY =====
const searchData = [
    // PRODUCTS
    { title: 'Guide Board', description: 'High-quality guide board designed for precise yarn guidance and smooth loom operation.', category: 'Products', image: 'Products Photos/Products-1.webp', link: 'product-detail.html', keywords: ['guide', 'board', 'yarn', 'loom', 'precision'] },
    { title: 'Harness Cord', description: 'Durable harness cord for great performance in textile machinery.', category: 'Products', image: 'Products Photos/Products-2 copy.webp', link: 'product-detail.html', keywords: ['harness', 'cord', 'textile', 'machinery', 'durable'] },
    { title: 'Comber Board', description: 'Precision comber board for efficient yarn combing and preparation.', category: 'Products', image: 'Products Photos/Products-3 copy.webp', link: 'product-detail.html', keywords: ['comber', 'board', 'yarn', 'combing', 'precision'] },
    { title: 'Wire Healds (Raj)', description: 'Premium wire healds with durable spring mechanism for smooth operation.', category: 'Products', image: 'Products Photos/Products-5 copy.webp', link: 'product-detail.html', keywords: ['wire', 'healds', 'raj', 'spring', 'weaving'] },
    { title: 'SS Wire Healds (Raj)', description: 'Stainless steel wire healds for enhanced corrosion resistance.', category: 'Products', image: 'Products Photos/Products-6 copy.webp', link: 'product-detail.html', keywords: ['stainless', 'steel', 'wire', 'healds', 'raj', 'corrosion'] },
    { title: 'Tube', description: 'Precision-engineered tubes for accurate textile machinery function.', category: 'Products', image: 'Products Photos/Products-7 copy.webp', link: 'product-detail.html', keywords: ['tube', 'precision', 'textile', 'machinery'] },
    { title: 'Quick Button (Hook Button)', description: 'User-friendly hook buttons for quick and convenient attachment.', category: 'Products', image: 'Products Photos/Products-8 copy.webp', link: 'product-detail.html', keywords: ['quick', 'button', 'hook', 'attachment', 'fastener'] },
    { title: 'Lower Cord', description: 'Robust lower cord components for reliable operation.', category: 'Products', image: 'Products Photos/Products-11 copy.webp', link: 'product-detail.html', keywords: ['lower', 'cord', 'robust', 'reliable'] },
    { title: 'Upper Cord', description: 'High-strength upper cords for superior lifting mechanism.', category: 'Products', image: 'Products Photos/Products-12 copy.webp', link: 'product-detail.html', keywords: ['upper', 'cord', 'lifting', 'strength'] },
    { title: 'Kaski', description: 'Essential kaski components for enhanced machinery efficiency.', category: 'Products', image: 'Products Photos/Products-14 copy.webp', link: 'product-detail.html', keywords: ['kaski', 'components', 'efficiency', 'machinery'] },
    { title: 'Pully', description: 'Precision pulleys for smooth power transmission in looms.', category: 'Products', image: 'Products Photos/Products-15 copy.webp', link: 'product-detail.html', keywords: ['pully', 'pulley', 'power', 'transmission', 'loom'] },
    { title: 'Legpin', description: 'Sturdy legpin components for precise shedding and stable support.', category: 'Products', image: 'Products Photos/Products-16 copy.webp', link: 'product-detail.html', keywords: ['legpin', 'shedding', 'support', 'stable'] },
    { title: 'Patti', description: 'Quality patti components for reliable textile machinery operation.', category: 'Products', image: 'Products Photos/Products-17 copy.webp', link: 'product-detail.html', keywords: ['patti', 'quality', 'textile', 'machinery'] },
    { title: 'Frame Set with Accessories', description: 'Complete frame set with all necessary accessories for comprehensive loom setup.', category: 'Products', image: 'Products Photos/Products-18 copy.webp', link: 'product-detail.html', keywords: ['frame', 'set', 'accessories', 'loom', 'complete'] },
    // SERVICES
    { title: 'New Machine Jala Installation', description: 'Complete jala installation services for new weaving machines, ensuring perfect alignment and optimal performance.', category: 'Services', image: 'SVG/Readymade Jala.svg', link: 'services.html', keywords: ['installation', 'jala', 'new', 'machine', 'weaving'] },
    { title: 'AMC Consultation', description: 'Annual Maintenance Contract ensures your machinery operates at peak performance year-round.', category: 'Services', image: 'SVG/Support and  Maintenance.svg', link: 'services.html', keywords: ['amc', 'annual', 'maintenance', 'contract', 'consultation'] },
    { title: 'Jala Replacement Service', description: 'Quick and efficient jala replacement solutions for worn or damaged systems.', category: 'Services', image: 'SVG/Quick Service  (Under 24 Hrs).svg', link: 'services.html', keywords: ['jala', 'replacement', 'quick', 'service', 'repair'] },
    { title: 'Jala Repair & Maintenance', description: 'Jala repair services to restore your system performance without full replacement.', category: 'Services', image: 'SVG/Support and  Maintenance.svg', link: 'services.html', keywords: ['jala', 'repair', 'maintenance', 'service', 'restore'] },
    { title: 'Customized Harness Solutions', description: 'Custom harness systems tailored to your specific machine type and fabric requirements.', category: 'Services', image: 'SVG/35+ Years of  Expertise.svg', link: 'services.html', keywords: ['customized', 'harness', 'custom', 'tailored', 'solutions'] }
];

function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchOverlayInput');
    
    if (!overlay || !input) return;
    
    overlay.classList.add('active');
    document.body.classList.add('search-active');
    document.body.style.overflow = 'hidden';
    
    // Focus input and open keyboard
    setTimeout(() => {
        input.focus();
    }, 100);
    
    // Show keywords initially
    document.getElementById('searchKeywords').style.display = 'block';
    document.getElementById('searchOverlayResults').innerHTML = '';
    
    console.log('✅ Search overlay opened');
}

function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchOverlayInput');
    
    if (!overlay) return;
    
    overlay.classList.remove('active');
    document.body.classList.remove('search-active');
    document.body.style.overflow = '';
    
    // Clear search
    if (input) {
        input.value = '';
        input.blur();
    }
    
    console.log('❌ Search overlay closed');
}

function clearSearch() {
    const input = document.getElementById('searchOverlayInput');
    if (input) {
        input.value = '';
        input.focus();
        performOverlaySearch();
    }
}

function searchKeyword(keyword) {
    const input = document.getElementById('searchOverlayInput');
    if (input) {
        input.value = keyword;
        performOverlaySearch();
        input.focus();
    }
}

function performOverlaySearch() {
    const input = document.getElementById('searchOverlayInput');
    const clearBtn = document.getElementById('searchClearBtn');
    const keywordsSection = document.getElementById('searchKeywords');
    const resultsContainer = document.getElementById('searchOverlayResults');
    
    if (!input || !resultsContainer) return;
    
    const query = input.value.toLowerCase().trim();
    
    // Show/hide clear button
    if (clearBtn) {
        clearBtn.classList.toggle('visible', query.length > 0);
    }
    
    // If empty, show keywords
    if (query === '') {
        keywordsSection.style.display = 'block';
        resultsContainer.innerHTML = '';
        return;
    }
    
    // Hide keywords when searching
    keywordsSection.style.display = 'none';
    
    // Filter results
    const results = searchData.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.description.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query) ||
               item.keywords.some(keyword => keyword.includes(query));
    });
    
    // Display results
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-search-results">No results found. Try different keywords.</div>';
    } else {
        resultsContainer.innerHTML = results.map(item => `
            <div class="search-result-card" onclick="navigateToSearchResult('${item.title}', '${item.category}', '${item.link}', '${item.image}', '${item.description.replace(/'/g, "\\'")}')">
                <img src="${item.image}" alt="${item.title}" class="search-result-image">
                <div class="search-result-content">
                    <h3 class="search-result-title">${item.title}</h3>
                    <p class="search-result-description">${item.description}</p>
                    <span class="search-result-category">${item.category}</span>
                </div>
            </div>
        `).join('');
    }
}

function navigateToSearchResult(title, category, link, image, description) {
    if (category === 'Products') {
        const features = getProductFeatures(title);
        const productData = {
            name: title,
            image: image,
            description: description,
            features: features
        };
        sessionStorage.setItem('currentProduct', JSON.stringify(productData));
    }
    window.location.href = link;
}

function getProductFeatures(productName) {
    const featuresMap = {
        'Guide Board': ['Precision-engineered for optimal performance', 'Durable construction for long-lasting use', 'Easy installation and maintenance', 'Compatible with various loom types', 'Quality tested for reliability'],
        'Harness Cord': ['High-strength material construction', 'Excellent wear resistance', 'Smooth operation guaranteed', 'Compatible with standard machinery', 'Tested for consistent performance'],
        'Comber Board': ['Precision-engineered design', 'Enhanced yarn alignment', 'Durable and long-lasting', 'Easy to install and maintain', 'Improves weaving efficiency'],
        'Wire Healds (Raj)': ['Durable spring mechanism', 'Consistent tension control', 'High-quality wire construction', 'Long service life', 'Smooth and reliable operation'],
        'SS Wire Healds (Raj)': ['Stainless steel construction', 'Superior corrosion resistance', 'Extended service life', 'Maintains tension consistency', 'Ideal for harsh environments'],
        'Tube': ['Precision-engineered design', 'High-quality materials', 'Accurate dimensional tolerances', 'Durable and reliable', 'Compatible with standard systems'],
        'Quick Button (Hook Button)': ['Quick and easy attachment', 'Secure fastening mechanism', 'Durable construction', 'User-friendly design', 'Reduces installation time'],
        'Lower Cord': ['Robust construction', 'High-quality materials', 'Reliable performance', 'Long service life', 'Easy to install'],
        'Upper Cord': ['High-strength construction', 'Superior lifting capability', 'Consistent performance', 'Durable and reliable', 'Optimized for efficiency'],
        'Kaski': ['Precision-manufactured', 'Enhanced efficiency', 'Durable construction', 'Easy installation', 'Reliable performance'],
        'Pully': ['Precision-engineered design', 'Smooth power transmission', 'Minimal friction operation', 'Durable construction', 'Long service life'],
        'Legpin': ['Sturdy construction', 'Precise shedding control', 'Stable support system', 'Reliable performance', 'Easy to install'],
        'Patti': ['Quality construction', 'Reliable operation', 'Durable materials', 'Easy maintenance', 'Compatible with standard systems'],
        'Frame Set with Accessories': ['Complete frame set', 'All accessories included', 'Professional-grade quality', 'Easy installation', 'Comprehensive loom solution']
    };
    return featuresMap[productName] || ['High-quality construction', 'Reliable performance', 'Durable materials', 'Easy installation', 'Professional grade'];
}

// Real-time search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchOverlayInput');
    if (searchInput) {
        searchInput.addEventListener('input', performOverlaySearch);
    }
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('searchOverlay');
        if (overlay && overlay.classList.contains('active')) {
            closeSearch();
        }
    }
});

console.log('✅ Search overlay functionality initialized');
