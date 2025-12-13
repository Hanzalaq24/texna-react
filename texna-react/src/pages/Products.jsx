
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';

const Products = () => {
    const { products } = useData();
    const navigate = useNavigate();

    const viewProductDetail = (product) => {
        navigate('/product-detail', { state: { product } });
    };

    return (
        <div className="products-page">
            <div className="products-container">
                <h1 className="products-page-title">Our Product Range</h1>
                <p className="products-page-subtitle">Comprehensive Jacquard Harness Components & Textile Machinery Parts</p>

                {/* Product Cards Grid */}
                <div className="products-grid-list">
                    {products.map((product, index) => (
                        <div key={index} className="product-card-item" onClick={() => viewProductDetail(product)}>
                            <div className="product-image-container">
                                <img src={product.image} alt={product.title} className="product-img" />
                            </div>
                            <div className="product-info-box">
                                <h3 className="product-name">{product.title}</h3>
                                <p className="product-description">{product.description}</p>
                                <button className="view-details-link" style={{ border: 'none', background: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="products-contact-section">
                    <h2 className="contact-heading">Need More Information?</h2>
                    <p className="contact-text">Contact us for detailed specifications, pricing, and custom solutions</p>
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
        </div>
    );
};

export default Products;
