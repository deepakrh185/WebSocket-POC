
import { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import React from 'react'



function App() {
  const apiKey = process.env.REACT_APP_GOOGLE_API;

  const [center, setCenter] = useState({ lat: 11.0168445, lng: 76.9558321 }); // Initial center
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });


  useEffect(() => {
    // Function to simulate new marker positions (replace with your logic)
    
  }, []);


  console.log(center)

  useEffect(() => {
    getLocation(setMapCenter);
   
    const generateNewMarker = () => {
      const newLat = center.lat + Math.random() * 0.01; // Random offset within 0.01 degrees
      const newLng = center.lng + Math.random() * 0.01;
      return { lat: newLat, lng: newLng };
    };

    const intervalId = setInterval(() => {
      const newMarker = generateNewMarker();

      setMarkers([...markers, newMarker]); // Update markers with new position
      setCenter(newMarker); // Update map center to follow marker
    }, 5000); // Update every 5 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  function getLocation(setMapCenter) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }

  const containerStyle = {
    width: '1000px',
    height: '100vw'
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })




  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {markers.map((marker, index) => (
        <MarkerF key={index} position={marker} /> // Render each marker
      ))}
    </GoogleMap>
  ) : <></>
}


export default App;
