import { Marker, GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient';
import mapStyles from '../lib/mapStyles.json';

interface MarkerData {
    latitude: number;
    longitude: number; 
} 

function GoogleMapView() {
    const [markersData, setMarkersData] = React.useState<{ latitude: any; longitude: any; }[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

    
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
                    {markersData.map((marker, index) => (
                        <Marker 
                            key={index} 
                            position={{ lat: marker.latitude, lng: marker.longitude }} 
                            icon={{
                                url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-round-icon.png',
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                            onClick={() => {
                                if (marker)
                                    setSelectedMarker(marker);
                                else
                                    setSelectedMarker(null);
                            }}
                        />
                    ))}

                    {selectedMarker && (
                        <InfoWindow
                            position={{ lat: (selectedMarker as { latitude: number; longitude: number; }).latitude, lng: (selectedMarker as { latitude: number; longitude: number; }).longitude }}
                            onCloseClick={() => {
                                setSelectedMarker(null);
                            }}
                        >
                            <div>
                                <h2>Tweet-style popup</h2>
                                <p>This is your selected marker!</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapView