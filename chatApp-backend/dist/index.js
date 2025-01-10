"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Wss = new ws_1.WebSocketServer({ port: 8080 });
let allsockets = [];
Wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.type === "join") {
                allsockets.push({
                    socket,
                    room: parsedMessage.payload.roomId
                });
            }
            if (parsedMessage.type === "Chat") {
                let currentUserRoom = null;
                for (let i = 0; i < allsockets.length; i++) {
                    if (allsockets[i].socket === socket) {
                        currentUserRoom = allsockets[i].room;
                    }
                }
                for (let i = 0; i < allsockets.length; i++) {
                    if (allsockets[i].room === currentUserRoom) {
                        allsockets[i].socket.send(parsedMessage.payload.message);
                    }
                }
            }
        }
        catch (e) {
            console.error("Error processing message:", e);
            socket.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
        }
    });
});
