
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductsShowcase = () => {
    const mainImageRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const matchHeight = () => {
            if (mainImageRef.current && gridRef.current) {
                const height = mainImageRef.current.offsetHeight;
                if (height > 0) {
                    gridRef.current.style.height = `${height}px`;
                }
            }
        };

        const img = mainImageRef.current;
        if (img) {
            if (img.complete) {
                matchHeight();
            } else {
                img.addEventListener('load', matchHeight);
            }
        }

        window.addEventListener('resize', matchHeight);

        // Initial timeout to ensure layout is done
        setTimeout(matchHeight, 100);

        return () => {
            if (img) img.removeEventListener('load', matchHeight);
            window.removeEventListener('resize', matchHeight);
        };
    }, []);

    return (
        <section className="products-showcase">
            <div className="products-wrapper">
                {/* Main Product Image - Left Side */}
                <div className="main-product-image">
                    <Link to="/products">
                        <img
                            ref={mainImageRef}
                            src="/Texna Machine.webp"
                            alt="Jacquard Machine"
                            className="machine-image"
                        />
                    </Link>
                </div>

                {/* Products Right Side */}
                <div className="products-right">
                    <div className="products-grid" ref={gridRef}>
                        {/* Product 1 */}
                        <Link to="/products" className="product-item">
                            <img src="/Products Photos/Products-1.webp" alt="Guide Board" className="product-image" />
                            <span className="product-label">Guide Board</span>
                        </Link>

                        {/* Product 2 */}
                        <Link to="/products" className="product-item">
                            <img src="/Products Photos/Products-2 copy.webp" alt="Harness Cord" className="product-image" />
                            <span className="product-label">Harness Cord</span>
                        </Link>

                        {/* Product 3 */}
                        <Link to="/products" className="product-item">
                            <img src="/Products Photos/Products-3 copy.webp" alt="Comber Board" className="product-image" />
                            <span className="product-label">Comber Board</span>
                        </Link>

                        {/* Product 4 */}
                        <Link to="/products" className="product-item">
                            <img src="/Products Photos/Products-5 copy.webp" alt="Wire (Raj)" className="product-image" />
                            <span className="product-label">Wire (Raj)</span>
                        </Link>
                    </div>

                    <div className="more-products-link">
                        <Link to="/products" className="more-products-btn">
                            VIEW ALL
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsShowcase;
