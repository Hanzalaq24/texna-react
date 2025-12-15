
import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import ProfilePopup from './ProfilePopup';

const LeadershipGrid = () => {
    const { team } = useData();
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [selectedKey, setSelectedKey] = useState(null);

    const openProfile = (key) => {
        setSelectedProfile(team[key]);
        setSelectedKey(key);
    };

    const closeProfile = () => {
        setSelectedProfile(null);
        setSelectedKey(null);
    };

    const orderedKeys = ['nasir', 'affan', 'zaid', 'kalim'];

    // Hardcoded display data for the grid cards to ensure visual consistency,
    // while the popup content comes from the fetched 'team' data.
    const gridDisplayData = {
        nasir: {
            image: "/Nasir Bhai.webp",
            alt: "Nasir Khan Jalewala",
            name: "NASIR KHAN JALEWALA",
            title: "CHIEF EXECUTIVE OFFICER"
        },
        affan: {
            image: "/Affan Bhai.webp",
            alt: "Affan Khan",
            name: "AFFAN KHAN",
            title: "CHIEF FINANCIAL OFFICER"
        },
        zaid: {
            image: "/Zaid Bhai.webp",
            alt: "Zaid Khan",
            name: "ZAID KHAN",
            title: "CHIEF OPERATING OFFICER"
        },
        kalim: {
            image: "/Kalim Bhai.webp",
            alt: "Kalim Malik",
            name: "KALIM MALIK",
            title: "GENERAL MANAGER"
        }
    };

    return (
        <section className="leadership-section">
            <div className="leadership-grid">
                {orderedKeys.map(key => {
                    const display = gridDisplayData[key];
                    if (!display) return null; // Should not happen if orderedKeys and gridDisplayData are in sync

                    return (
                        <div key={key} className="leader-card" onClick={() => openProfile(key)}>
                            <div className="leader-image-wrapper">
                                <img src={display.image} alt={display.alt} className="leader-image" loading="eager" />
                            </div>
                            <h3 className="leader-name">{display.name}</h3>
                            <p className="leader-title">{display.title}</p>
                        </div>
                    );
                })}
            </div>

            <ProfilePopup
                isOpen={!!selectedProfile}
                onClose={closeProfile}
                data={selectedProfile}
                profileKey={selectedKey}
            />
        </section>
    );
};

export default LeadershipGrid;
