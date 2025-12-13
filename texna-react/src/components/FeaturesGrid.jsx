
import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import Popup from './Popup';

const FeaturesGrid = () => {
    const { features } = useData();
    const [selectedFeature, setSelectedFeature] = useState(null);

    const openPopup = (key) => {
        setSelectedFeature(features[key]);
    };

    const closePopup = () => {
        setSelectedFeature(null);
    };

    // Helper to order features if fetched from DB might be unordered, 
    // but object keys are usually consistent enough for this scale or we can rely on specific keys
    const orderedKeys = ['readymade', 'experience', 'service', 'support'];

    return (
        <section className="features-section">
            <div className="features-grid">
                {orderedKeys.map(key => {
                    const feature = features[key];
                    if (!feature) return null;
                    return (
                        <div key={key} className="feature-card" onClick={() => openPopup(key)}>
                            <div className="feature-icon">
                                <img src={feature.icon} alt={feature.title} />
                            </div>
                            <h3 className="feature-title" dangerouslySetInnerHTML={{ __html: feature.title.replace(/\n/g, '<br/>').replace('35+ Years of Experience', '35+ Years of<br>Expertise').replace('35+ years of experience', '35+ Years of<br>Expertise') }}></h3>
                            {/* Standardizing HTML line breaks if simple text comes from DB */}
                        </div>
                    );
                })}
            </div>

            <Popup
                isOpen={!!selectedFeature}
                onClose={closePopup}
                data={selectedFeature}
            />
        </section>
    );
};

export default FeaturesGrid;
