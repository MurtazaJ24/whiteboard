import { Server } from "socket.io";

// Need to set cors to allow connections from our react front-end hosted at port 5173
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

type CanvasImage = string | 0;

let currentUsers: { [key: string]: { [key: string]: string }[] } = {};
let currentStates: { [key: string]: CanvasImage[] } = {};

// Event listener for whenever a client connects to the socket.io server
io.on("connection", function (socket) {
  socket.on("create-room", (callback) => {
    const roomCode = Math.random().toString(36).substring(7);
    currentStates[roomCode] = [0];
    currentUsers[roomCode] = [];
    callback(roomCode);
  });

  socket.on("join-room", (roomCode: string, user) => {
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    user["socket"] = socket.id;
    currentUsers[roomCode] = [...currentUsers[roomCode], user];
    io.to(roomCode).emit("user-connected", currentUsers[roomCode]);
    socket.emit("canvas-state", currentStates[roomCode][0]);
  });

  // When a client sends the canvasImage event, we will broadcast it to the other clients.
  socket.on("canvas-state", (data: string) => {
    const roomCode = socket.data.roomCode;
    currentStates[roomCode] = [...currentStates[roomCode], data];

    io.to(roomCode).emit("canvas-state", data);
  });

  socket.on("canvas-clear", () => {
    const roomCode = socket.data.roomCode;
    socket.to(roomCode).emit("canvas-clear");
    currentStates[roomCode] = [...currentStates[roomCode], 0];
  });

  socket.on("canvas-undo", () => {
    const roomCode = socket.data.roomCode;

    if (currentStates[roomCode].length === 1) return;

    currentStates[roomCode] = currentStates[roomCode].slice(0, -1);
    
    const data = currentStates[roomCode].at(-1);
    io.to(roomCode).emit("canvas-state", data);
  });

  socket.on("leave-room", () => {
    const roomCode = socket.data.roomCode;
    currentUsers[roomCode] = currentUsers[roomCode].filter(
      (user) => user.socket !== socket.id
    );
    io.to(roomCode).emit("user-disconnected", currentUsers[roomCode]);
  });
});

// Start server
io.listen(5000);
