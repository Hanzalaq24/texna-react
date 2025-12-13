
import React from 'react';

const Popup = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    return (
        <div className={`popup-overlay ${isOpen ? 'active' : ''}`} id="popupOverlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose}>&times;</button>
                <div className="popup-header">
                    <div className="popup-icon">
                        <img src={data.icon} alt={data.title} />
                    </div>
                    <h2 className="popup-title">{data.title}</h2>
                </div>
                <div className="popup-text" dangerouslySetInnerHTML={{ __html: data.text }}></div>
            </div>
        </div>
    );
};

export default Popup;
