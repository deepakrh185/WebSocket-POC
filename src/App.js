import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { io } from "socket.io-client";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const socket = io("http://192.168.198.142:3001");

function App() {
  const [inputText, setInputText] = useState("");
  const [socketMessage, setSocketMessage] = useState([]);
  const [markers, setMarkers] = useState();

  const apiKey = process.env.REACT_APP_GOOGLE_API;

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setSocketMessage((prev) => [...prev, data.message]);
      const jsonString = data.message?.replace(/(\w+):/g, '"$1":');
      // Parse the JSON string to an object
      const convetToObject = JSON.parse(jsonString);
      setMarkers(convetToObject);
    };

    socket.on("receive_message", handleReceiveMessage);
    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message: inputText });
    setInputText("");
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: "1000px",
    height: "1000px",
  };
  return isLoaded ? (
    <>
      <div className="flex justify-center my-12">
        <input
          placeholder="Enter Message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border-2 px-2 mr-2"
        />
        <button
          className="border-2 bg-green-500 rounded-lg px-4 py-2"
          onClick={sendMessage}
        >
          Send Message
        </button>
      </div>
      <h1 className="justify-center flex">{socketMessage}</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 0, lng: 0 }}
        zoom={10}
      >
        <MarkerF position={markers} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import './App.css';

// import React from 'react'
// import { io } from 'socket.io-client'
// import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

// const socket = io('http://localhost:3001')

// function App() {

//   const [center, setCenter] = useState({ lat: 0, lng: 0 }); // Initial center
//   const [markers, setMarkers] = useState([]);
//   const [inputText, setInputText] = useState({ lat: 0, lng: 0 });
//   const [socketMessage, setSocketMessage] = useState();

//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data)
//       setMarkers([data.message])
//       setSocketMessage(data.message)

//     })

//   }, [socket])
//   const apiKey = process.env.REACT_APP_GOOGLE_API;

//   const containerStyle = {
//     width: '1000px',
//     height: '1000px'
//   };

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: apiKey
//   })

//   const sendMessage = () => {

//     socket.emit('send_message',{message:inputText})
//   }

// console.log(markers)

//   return isLoaded ? (
//     <>
//      <div className='flex justify-center my-12'>
//         <input placeholder='Enter Message...' onChange={(e) => setInputText(e.target.value)} className='border-2 px-2 mr-2' />
//         <button className='border-2 bg-green-500 rounded-lg px-4 py-2' onClick={sendMessage}>Send Message</button>
//       </div>
//       <h1 className='justify-center flex'>{socketMessage}</h1>
//     {/* <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//     >
//       {markers.map((marker, index) => {
//         console.log(marker)
//         return (
//         <MarkerF key={index} position={marker} />) // Render each marker
// })}
//     </GoogleMap> */}
//   </>

//   ) : <></>

// }

// export default App
