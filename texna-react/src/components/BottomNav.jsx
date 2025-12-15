
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ openSearch, isSearchOpen }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="bottom-nav">
            <Link to="/" className={`nav-item ${isActive('/')}`}>
                <img src="/webp icon /Home Button.svg" alt="Home" className="nav-icon" loading="eager" />
                <span className="nav-label">Home</span>
            </Link>
            <a href="#" className={`nav-item ${isSearchOpen ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); openSearch(); }}>
                <img src="/webp icon /Search Button.svg" alt="Search" className="nav-icon" loading="eager" />
                <span className="nav-label">Search</span>
            </a>
            <Link to="/services" className={`nav-item ${isActive('/services')}`}>
                <img src="/webp icon /Services Button.svg" alt="Services" className="nav-icon" loading="eager" />
                <span className="nav-label">Services</span>
            </Link>
            <Link to="/products" className={`nav-item ${isActive('/products')}`}>
                <img src="/webp icon /Products Button.svg" alt="Products" className="nav-icon" loading="eager" />
                <span className="nav-label">Products</span>
            </Link>
            <a href="https://wa.me/919978617177" target="_blank" rel="noopener noreferrer" className="nav-item">
                <img src="/webp icon /Whatsapp Button.svg" alt="WhatsApp" className="nav-icon" loading="eager" />
                <span className="nav-label">Whatsapp</span>
            </a>
        </nav>
    );
};

export default BottomNav;
