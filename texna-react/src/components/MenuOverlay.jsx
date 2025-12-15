
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MenuOverlay = ({ isOpen, closeMenu, openSearch }) => {
    const location = useLocation();
    const { user, signOut } = useAuth();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    const handleSignOut = async () => {
        await signOut();
        closeMenu();
    };

    return (
        <div className={`menu-overlay ${isOpen ? 'active' : ''}`} id="menuOverlay">
            <div className="menu-content">
                <div className="menu-header">
                    <div className="menu-logo">
                        <img src="/SVG/Texna Logo TM.svg" alt="Texna Logo" loading="eager" />
                    </div>
                    <button className="menu-close" onClick={closeMenu}>&times;</button>
                </div>

                <nav className="menu-nav">
                    <Link to="/" className={`menu-link ${isActive('/')}`} onClick={closeMenu}>
                        <span className="menu-text">Home</span>
                    </Link>
                    <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); closeMenu(); openSearch(); }}>
                        <span className="menu-text">Search</span>
                    </a>
                    <Link to="/services" className={`menu-link ${isActive('/services')}`} onClick={closeMenu}>
                        <span className="menu-text">Services</span>
                    </Link>
                    <Link to="/products" className={`menu-link ${isActive('/products')}`} onClick={closeMenu}>
                        <span className="menu-text">Products</span>
                    </Link>
                    <a href="https://wa.me/919978617177" target="_blank" rel="noopener noreferrer" className="menu-link menu-link-whatsapp" onClick={closeMenu}>
                        <span className="menu-text">Contact</span>
                    </a>

                    {user ? (
                        <button className="menu-link" onClick={handleSignOut} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                            <span className="menu-text" style={{ color: '#ef4444' }}>Logout</span>
                        </button>
                    ) : (
                        <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <Link to="/login" className={`menu-link ${isActive('/login')}`} onClick={closeMenu}>
                                <span className="menu-text">Login</span>
                            </Link>
                            <Link to="/signup" className={`menu-link ${isActive('/signup')}`} onClick={closeMenu}>
                                <span className="menu-text">Sign Up</span>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default MenuOverlay;
