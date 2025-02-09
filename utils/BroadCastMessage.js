import { io } from "../app.js";

function broadcastToAll(eventName, message) {
    io.emit(eventName, message); // Emit to everyone connected
    console.log(`Broadcast "${message}" on event "${eventName}"`);
  }


  export default broadcastToAll