import { Server } from 'socket.io'
import  http from 'http';


const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

server.listen(3001, () => {
    console.log(`Server is Running!`);
});

io.on("connection",(socket)=>{
  socket.on('send_message',(data)=>{
    console.log(data)
    socket.broadcast.emit('receive_message',data)
  })
})


//     const latLngs = [
//       { lat: 11.021691328731656, lng: 76.95752196389195 },
//       { lat: -37.905652, lng: 160.194565 },
//       { lat: -45.955386, lng: 116.022191 },
//       { lat: 30.266488, lng: 30.967822 },
//       { lat: 20.676493, lng: 17.636854 },
//     ];


