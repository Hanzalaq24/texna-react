
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';

const SearchOverlay = ({ isOpen, onClose }) => {
    const { products, services } = useData();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Construct search data from fetched products and services
    const searchData = useMemo(() => {
        const productItems = products.map(p => ({
            ...p,
            category: 'Products',
            link: '/products', // Or '/product-detail' if we pass state
            description: p.description
        }));

        const serviceItems = services.map(s => ({
            ...s,
            category: 'Services',
            link: '/services', // Service page has popups, usually just scroll to it or open it? 
            // Linked to /services currently in seed.
            description: s.fullText || s.description
        }));

        return [...productItems, ...serviceItems];
    }, [products, services]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
            document.body.style.overflow = 'hidden';
            document.body.classList.add('search-active');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('search-active');
            setQuery(''); // Reset query on close
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        performSearch(value);
    };

    const performSearch = (qStr) => {
        if (qStr.trim() === '') {
            setResults([]);
            return;
        }

        const q = qStr.toLowerCase();
        const filtered = searchData.filter(item => {
            return (item.title && item.title.toLowerCase().includes(q)) ||
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.category && item.category.toLowerCase().includes(q)) ||
                (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)));
        });
        setResults(filtered);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        inputRef.current.focus();
    };

    const handleKeywordClick = (keyword) => {
        setQuery(keyword);
        performSearch(keyword);
    };

    const navigateToResult = (item) => {
        onClose();
        // Pass info if needed via state, but sticking to URL params or standard navigation is better.
        // For product detail, the original site used sessionStorage.
        // We will just nav to products page or services page for now as mapped in data.js
        navigate(item.link);
    };

    if (!isOpen) return null;

    return (
        <div className="search-overlay active" id="searchOverlay">
            <div className="search-overlay-content">
                <div className="search-overlay-header">
                    <button className="search-close-btn" onClick={onClose}>&times;</button>
                    <h2 className="search-overlay-title">Search</h2>
                </div>

                <div className="search-input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-overlay-input"
                        placeholder="Search products, services..."
                        value={query}
                        onChange={handleSearch}
                        autoComplete="off"
                    />
                    {query.length > 0 && (
                        <button className="search-clear-btn visible" onClick={clearSearch}>&times;</button>
                    )}
                </div>

                {/* Quick Keywords - Show only when no query */}
                {query === '' && (
                    <div className="search-keywords" id="searchKeywords" style={{ display: 'block' }}>
                        <h3 className="keywords-title">Quick Search</h3>
                        <div className="keywords-grid">
                            {['Jala', 'Guide Board', 'Harness', 'Wire Healds', 'Installation', 'Maintenance', 'Comber Board', 'AMC'].map(kw => (
                                <button key={kw} className="keyword-btn" onClick={() => handleKeywordClick(kw)}>{kw}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search Results */}
                {query !== '' && (
                    <div className="search-overlay-results">
                        {results.length === 0 ? (
                            <div className="no-search-results">No results found. Try different keywords.</div>
                        ) : (
                            results.map((item, idx) => (
                                <div key={idx} className="search-result-card" onClick={() => navigateToResult(item)}>
                                    <img src={item.image} alt={item.title} className="search-result-image" loading="eager" />
                                    <div className="search-result-content">
                                        <h3 className="search-result-title">{item.title}</h3>
                                        <p className="search-result-description">{item.description}</p>
                                        <span className="search-result-category">{item.category}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;
