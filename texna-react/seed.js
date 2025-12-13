
import { createClient } from '@supabase/supabase-js';
import { featureData, profileBannerData, productsData, servicesData } from './src/data.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env vars from .env.development since we can't read .env
const envPath = path.resolve(process.cwd(), '.env.development');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.development');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
    console.log('🌱 Seeding database...');

    // 1. Seed Features
    console.log('Seeding Features...');
    const features = Object.entries(featureData).map(([key, data]) => ({
        key,
        title: data.title,
        icon_url: data.icon,
        description_html: data.text
    }));

    const { error: featuresError } = await supabase.from('features').upsert(features, { onConflict: 'key' });
    if (featuresError) console.error('Error seeding features:', featuresError);

    // 2. Seed Team Members
    console.log('Seeding Team Members...');
    const team = Object.entries(profileBannerData).map(([key, data]) => ({
        key,
        name: data.heading.split("'")[0], // Rough extraction, manual adjustment might be needed
        role: data.heading,
        message_text: data.text,
        image_url: data.image
    }));

    const { error: teamError } = await supabase.from('team_members').upsert(team, { onConflict: 'key' });
    if (teamError) console.error('Error seeding team:', teamError);

    // 3. Seed Products
    console.log('Seeding Products...');
    // Delete existing products to avoid conflicts (since unique constraint might be missing)
    const { error: deleteProductsError } = await supabase.from('products').delete().neq('id', 0); // Delete all
    if (deleteProductsError) console.error('Error clearing products:', deleteProductsError);

    // Transform data
    const products = productsData.map(p => ({
        title: p.title,
        description: p.fullDescription || p.description,
        category: 'Products',
        image_url: p.image,
        link: p.link || '/products',
        features: p.features,
        keywords: p.keywords
    }));

    const { error: productsError } = await supabase.from('products').insert(products);
    if (productsError) console.error('Error seeding products:', productsError);

    // 4. Seed Services
    console.log('Seeding Services...');
    // Delete existing services
    const { error: deleteServicesError } = await supabase.from('services').delete().neq('id', 0);
    if (deleteServicesError) console.error('Error clearing services:', deleteServicesError);

    const services = servicesData.map(s => ({
        title: s.title,
        description: s.fullText || s.description,
        image_url: s.image,
        link: s.link || '/services',
        keywords: s.keywords
    }));

    const { error: servicesError } = await supabase.from('services').insert(services);
    if (servicesError) console.error('Error seeding services:', servicesError);

    console.log('✅ Seeding complete!');
}

seedData();
