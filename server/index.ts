import { Server } from "socket.io";

// Need to set cors to allow connections from our react front-end hosted at port 5173
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let currentUsers: { [key: string]: {[key: string]: string}[] } = {};
let currentStates: { [key: string]: string | undefined } = {};

// Event listener for whenever a client connects to the socket.io server
io.on("connection", function (socket) {

  socket.on("create-room", (callback) => {
    const roomCode = Math.random().toString(36).substring(7);
    currentStates[roomCode] = undefined;
    currentUsers[roomCode] = [];
    callback(roomCode);
  });

  socket.on("join-room", (roomCode: string, user) => {
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    user["socket"] = socket.id;
    currentUsers[roomCode] = [...currentUsers[roomCode], user];
    io.to(roomCode).emit("user-connected", currentUsers[roomCode]);
    socket.emit("canvas-state", currentStates[roomCode]);
  });

  // When a client sends the canvasImage event, we will broadcast it to the other clients.
  socket.on("canvas-state", (data: string) => {
    const roomCode = socket.data.roomCode;
    currentStates[socket.data.roomCode] = data;
    socket.to(roomCode).emit("canvas-state", data);
  });

  socket.on("canvas-clear", () => {
    const roomCode = socket.data.roomCode;
    socket.to(roomCode).emit("canvas-clear");
    currentStates[socket.data.roomCode] = undefined;
  });

  socket.on("leave-room", () => {
    const roomCode = socket.data.roomCode;
    currentUsers[roomCode] = currentUsers[roomCode].filter((user) => user.socket !== socket.id);
    io.to(roomCode).emit("user-disconnected", currentUsers[roomCode]);
  })

  // socket.on("disconnect", () => {
  //   // const roomCode = socket.data.roomCode;
  //   console.log("user disconnected", socket.id)
  //   // socket.broadcast.emit("user-disconnected", currentUsers[roomCode]);
  // });
});

// Start server
io.listen(5000);
