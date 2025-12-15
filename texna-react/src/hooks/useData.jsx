
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { featureData as localFeatureData, profileBannerData as localProfileData, productsData as localProductsData, servicesData as localServicesData } from '../data';

export const useData = () => {
    const [features, setFeatures] = useState(localFeatureData);
    const [team, setTeam] = useState(localProfileData);
    const [products, setProducts] = useState(localProductsData);
    const [services, setServices] = useState(localServicesData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!supabase) {
                console.warn("Supabase client not initialized, using local data.");
                setLoading(false);
                return;
            }

            try {
                // 1. Fetch Features
                const { data: dbFeatures, error: featError } = await supabase.from('features').select('*');
                if (!featError && dbFeatures && dbFeatures.length > 0) {
                    // Convert back to object format { key: { ... } }
                    const featObj = { ...localFeatureData };
                    dbFeatures.forEach(f => {
                        featObj[f.key] = {
                            title: f.title,
                            icon: f.icon_url,
                            text: f.description_html
                        };
                    });
                    setFeatures(featObj);
                }

                // 2. Fetch Team
                const { data: dbTeam, error: teamError } = await supabase.from('team_members').select('*');
                if (!teamError && dbTeam && dbTeam.length > 0) {
                    const teamObj = {};
                    dbTeam.forEach(t => {
                        teamObj[t.key] = {
                            heading: t.role,
                            text: t.message_text,
                            image: t.image_url
                        };
                    });
                    setTeam(teamObj);
                }

                // 3. Fetch Products
                const { data: dbProducts, error: prodError } = await supabase.from('products').select('*');
                if (!prodError && dbProducts && dbProducts.length > 0) {
                    setProducts(dbProducts.map(p => ({
                        title: p.title,
                        description: p.description,
                        fullDescription: p.description, // Or fetch if separate column
                        image: p.image_url,
                        link: p.link,
                        features: p.features,
                        keywords: p.keywords
                    })));
                }

                // 4. Fetch Services (Disabled to use local data with new icons)
                /*
                const { data: dbServices, error: servError } = await supabase.from('services').select('*');
                if (!servError && dbServices && dbServices.length > 0) {
                    setServices(dbServices.map(s => ({
                        title: s.title,
                        fullText: s.description,
                        image: s.image_url,
                        link: s.link,
                        keywords: s.keywords
                    })));
                }
                */

            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { features, team, products, services, loading };
};
