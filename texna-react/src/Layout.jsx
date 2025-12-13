
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import MenuOverlay from './components/MenuOverlay';
import SearchOverlay from './components/SearchOverlay';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);

    return (
        <>
            <Header toggleMenu={toggleMenu} />

            <MenuOverlay
                isOpen={isMenuOpen}
                closeMenu={closeMenu}
                openSearch={openSearch}
            />

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={closeSearch}
            />

            <Outlet />

            <BottomNav openSearch={openSearch} isSearchOpen={isSearchOpen} />
        </>
    );
};

export default Layout;
