
import React from 'react';

const ProfilePopup = ({ isOpen, onClose, data, profileKey }) => {
    if (!isOpen || !data) return null;

    // Determine text alignment based on profile key (logic from script.js)
    const isRightAligned = profileKey === 'affan' || profileKey === 'kalim';
    const alignmentClass = isRightAligned ? 'text-right' : '';

    return (
        <div className={`profile-banner-overlay ${isOpen ? 'active' : ''}`} id="profileBannerOverlay" onClick={onClose}>
            <div className="profile-banner-content" onClick={(e) => e.stopPropagation()}>
                <button className="profile-banner-close" onClick={onClose}>&times;</button>
                <div className="profile-banner-image-wrapper">
                    <img
                        id="profileBannerImage"
                        src={data.image}
                        alt={data.heading}
                        className="profile-banner-image"
                    />
                    {data.heading && (
                        <div className={`profile-banner-heading ${alignmentClass}`}>
                            {data.heading}
                        </div>
                    )}
                    {data.text && (
                        <div
                            className={`profile-banner-text-box ${alignmentClass}`}
                            dangerouslySetInnerHTML={{ __html: data.text }}
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePopup;
