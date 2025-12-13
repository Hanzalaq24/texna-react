
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    useEffect(() => {
        if (!product) {
            // Redirect to products if no product data found (e.g. direct access/refresh)
            navigate('/products');
        } else {
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }, [product, navigate]);

    if (!product) return null;

    return (
        <div className="product-detail-page">


            <div className="product-detail-header-section" style={{ marginTop: '0' }}>
                <h1 className="product-detail-name" id="productName">{product.title}</h1>
            </div>

            <div className="product-detail-image-container">
                <img src={product.image} alt={product.title} className="product-detail-image" id="productImage" />
            </div>

            <div className="product-detail-description">
                <p id="productDescription">{product.fullDescription || product.description}</p>
            </div>

            <div className="product-features-section">
                <h2 className="features-heading">Key Features</h2>
                <ul className="features-list" id="featuresList">
                    {product.features && product.features.map((feature, index) => (
                        <li key={index} className="feature-item">
                            <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M16.6 5L7.5 14.1 3.4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="product-detail-contact">
                <h3 className="contact-cta">Interested in this product?</h3>
                <p className="contact-subtitle">Contact us for pricing and availability</p>
                <div className="contact-buttons">
                    <a href="tel:+919978617177" className="contact-btn phone-btn">
                        <span className="btn-icon">📱</span>
                        <span className="btn-text">Call Now</span>
                    </a>
                    <a href="https://wa.me/919978617177" target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp-btn">
                        <img src="/SVG/Whatsapp Button.svg" alt="WhatsApp" className="btn-icon-img" />
                        <span className="btn-text">WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
