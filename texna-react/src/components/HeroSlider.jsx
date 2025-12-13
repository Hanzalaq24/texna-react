
import React, { useState, useEffect, useRef } from 'react';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;
    const slideInterval = useRef(null);
    const sliderRef = useRef(null);

    // Touch handling state
    const touchStart = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        resetAutoSlide();
    };

    const resetAutoSlide = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
        startAutoSlide();
    };

    const startAutoSlide = () => {
        slideInterval.current = setInterval(nextSlide, 5000);
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (slideInterval.current) clearInterval(slideInterval.current);
        };
    }, []);

    // Touch event handlers
    const handleTouchStart = (e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isDragging.current = true;
        if (slideInterval.current) clearInterval(slideInterval.current);
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        // Simple prevention of vertical scroll if horizontal swipe is detected could go here
    };

    const handleTouchEnd = (e) => {
        if (!isDragging.current) return;

        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const diffX = touchStart.current.x - touchEnd.x;
        const diffY = Math.abs(touchStart.current.y - touchEnd.y);

        if (Math.abs(diffX) > 30 && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging.current = false;
        startAutoSlide();
    };

    return (
        <section className="hero-section">
            <div
                className="hero-slider-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="hero-slider"
                    id="heroSlider"
                    style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                >
                    {/* Slide 1 */}
                    <div className="hero-slide">
                        <img src="/Hero banner/01.webp" alt="Texna Hero Banner 1" className="hero-slide-image" />
                    </div>

                    {/* Slide 2 */}
                    <div className="hero-slide">
                        <img src="/Hero banner/02.webp" alt="Texna Hero Banner 2" className="hero-slide-image" />
                    </div>

                    {/* Slide 3 */}
                    <div className="hero-slide">
                        <img src="/Hero banner/03.webp" alt="Texna Hero Banner 3" className="hero-slide-image" />
                    </div>
                </div>

                {/* Slider Indicators */}
                <div className="hero-slider-indicators">
                    {[0, 1, 2].map((index) => (
                        <span
                            key={index}
                            className={`hero-indicator ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
