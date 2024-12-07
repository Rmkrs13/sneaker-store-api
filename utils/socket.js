const { Server } = require("socket.io");

let io;
const initializeSocket = (server) => {
    io = new Server(server, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
    });
};

module.exports = { initializeSocket, emit: (event, data) => io.emit(event, data) };