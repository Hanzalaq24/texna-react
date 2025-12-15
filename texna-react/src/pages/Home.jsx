
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import FeaturesGrid from '../components/FeaturesGrid';

import ProductsShowcase from '../components/ProductsShowcase';
import ABCSection from '../components/ABCSection';
import LeadershipGrid from '../components/LeadershipGrid';
import MapSection from '../components/MapSection';

const Home = () => {
    return (
        <main>
            <HeroSlider />
            <FeaturesGrid />

            <ProductsShowcase />
            <ABCSection />
            <LeadershipGrid />
            <MapSection />
        </main>
    );
};

export default Home;
