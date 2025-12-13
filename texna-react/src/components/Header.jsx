
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ toggleMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isProductDetail = location.pathname.includes('product-detail');

    const handleBack = () => {
        navigate(-1);
    };

    if (isProductDetail) {
        return (
            <header className="header product-detail-header">
                {/* Back Button */}
                <button className="back-button" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Centered Logo */}
                <Link to="/">
                    <img src="/SVG/Texna Logo TM.svg" alt="Texna Logo" className="logo" style={{ cursor: 'pointer' }} />
                </Link>

                {/* Hamburger Menu on Right for Detail Page */}
                <button className="hamburger-menu" onClick={toggleMenu}>
                    <img src="/SVG/Menu Line.svg" alt="Menu" />
                </button>
            </header>
        );
    }

    // Default Header
    return (
        <header className="header">
            {/* Hamburger Menu Button on Left */}
            <button className="hamburger-menu" onClick={toggleMenu}>
                <img src="/SVG/Menu Line.svg" alt="Menu" />
            </button>

            {/* Centered Logo */}
            <Link to="/">
                <img src="/SVG/Texna Logo TM.svg" alt="Texna Logo" className="logo" style={{ cursor: 'pointer' }} />
            </Link>
        </header>
    );
};

export default Header;
