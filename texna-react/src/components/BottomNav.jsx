
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ openSearch, isSearchOpen }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="bottom-nav">
            <Link to="/" className={`nav-item ${isActive('/')}`}>
                <img src="/webp icon /Home.webp" alt="Home" className="nav-icon" />
                <span className="nav-label">Home</span>
            </Link>
            <a href="#" className={`nav-item ${isSearchOpen ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); openSearch(); }}>
                <img src="/webp icon /search.webp" alt="Search" className="nav-icon" />
                <span className="nav-label">Search</span>
            </a>
            <Link to="/services" className={`nav-item ${isActive('/services')}`}>
                <img src="/webp icon /service.webp" alt="Services" className="nav-icon" />
                <span className="nav-label">Services</span>
            </Link>
            <Link to="/products" className={`nav-item ${isActive('/products')}`}>
                <img src="/webp icon /Product.webp" alt="Products" className="nav-icon" />
                <span className="nav-label">Products</span>
            </Link>
            <a href="https://wa.me/919978617177" target="_blank" rel="noopener noreferrer" className="nav-item">
                <img src="/webp icon /whatsapp.webp" alt="WhatsApp" className="nav-icon" />
                <span className="nav-label">Whatsapp</span>
            </a>
        </nav>
    );
};

export default BottomNav;
