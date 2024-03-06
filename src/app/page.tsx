'use client'

import GoogleMapView from '../components/GoogleMapView';
// import { supabase } from '../lib/supabaseClient';

// async function testConnection() {
//     try {
//         const { data, error } = await supabase
//         .from('userbase')
//         .select('*');

//         if (error) throw error;
//         console.log('Database connection successful:', data);
//     } catch (error) {
//         console.error('Database connection error:', error.message);
//     }   
// }

// testConnection();

export default function App() {
    return (
        <GoogleMapView />
    )
}