import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient';
import mapStyles from '../lib/mapStyles.json';

function GoogleMapView() {
    const [markersData, setMarkersData] = React.useState<{ latitude: any; longitude: any; }[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
            .from('userbase')
            .select('latitude, longitude');
        
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setMarkersData(data);
            }
        };
        
        fetchData();
    }, []);

    // const [markersData, setMarkersData] = React.useState([]);
    
    const containerStyle = {
        height: "100vh",
        width: "100vw"
    }
    return (
        <div>
            <LoadScript
                googleMapsApiKey={'AIzaSyC_27XthaxdqKP1Yj2og967R3LSCb5b9l8'}
            >
                <GoogleMap 
                    mapContainerStyle={containerStyle}
                    center={{lat: -25.748838, lng: 28.227777}}
                    zoom={12}
                    options={{ 
                        styles: mapStyles  
                    }}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    { /* use response from supabase query to render markers */}
                    {markersData.map((marker, index) => (
                        <Marker 
                        key={index} // Or a unique ID from your Supabase data
                        position={{ lat: marker.latitude, lng: marker.longitude }} 
                        icon={{
                            url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-round-icon.png', // Or your direct image URL
                            scaledSize: new window.google.maps.Size(30, 30), // Optional: Adjust the size
                        }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapView