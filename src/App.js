
import { useEffect, useState } from 'react';
import './App.css';

import React from 'react'
import { io } from 'socket.io-client'



const socket = io('http://localhost:3001')


function App() {

  useEffect(() => {

    socket.on('receive_latLong', (data) => {
      console.log(data)
    })




  }, [])
  return (

    <div>


    </div>
  )
}


export default App;
