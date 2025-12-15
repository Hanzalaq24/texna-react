
import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import Popup from '../components/Popup';

const Services = () => {
    const { services } = useData();
    const [selectedService, setSelectedService] = useState(null);

    const openPopup = (service) => {
        const featuresHtml = service.features
            ? `<ul>${service.features.map(f => `<li>${f}</li>`).join('')}</ul>`
            : '';

        setSelectedService({
            title: service.title,
            icon: service.icon,
            text: `<p>${service.fullText}</p>${featuresHtml}`
        });
    };

    const closePopup = () => {
        setSelectedService(null);
    };

    return (
        <div className="services-page">
            <div className="services-container">
                <h1 className="services-page-title">Our Services</h1>
                <p className="services-page-subtitle">Professional textile machinery services with 35+ years of expertise</p>

                {/* Service Cards */}
                <div className="services-list">
                    {services.map((service, index) => (
                        <div key={index} className="service-card" onClick={() => openPopup(service)}>
                            <div className="service-card-header">
                                <div className="service-card-icon">
                                    <img src={service.icon} alt={service.title} className="service-icon-img" loading="eager" />
                                </div>
                                <h2 className="service-card-title">
                                    {service.title}
                                </h2>
                            </div>
                            <p className="service-card-text">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Popup
                isOpen={!!selectedService}
                onClose={closePopup}
                data={selectedService}
            />
        </div>
    );
};

export default Services;
