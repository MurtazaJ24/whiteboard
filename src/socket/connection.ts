import { Socket, io } from "socket.io-client";
import { useCanvasStore, useUserStore } from "../store/store";

let socket: Socket;

export const connectWithSocketServer = () => {
  const draw = useCanvasStore.getState().draw;
  const clear = useCanvasStore.getState().clear;
  const setMembers = useUserStore.getState().setUsers;


  socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("connected to socket.io server");
  });

  socket.on("user-connected", (users) => {
    setMembers(users);
  })

  socket.on("user-disconnected", (users) => {
    setMembers(users);
  })

  socket.on("canvas-state", (data) => {
    draw(data);
  });


  socket.on("canvas-clear", () => {
    clear();
  });
};

export const disconnectFromSocketServer = () => {
  socket.disconnect();
};

export const emitCanvasImage = (canvasImage: string | undefined) => {
  socket.emit("canvas-state", canvasImage);
};

export const emitCanvasClear = () => {
  socket.emit("canvas-clear");
};

export const emitCanvasUndo = () => {
  socket.emit("canvas-undo");
};

export const joinRoom = (roomCode: string, user: User) => {
  socket.emit("join-room", roomCode, user);
}

export const leaveRoom = () => {
  socket.emit("leave-room");
}

export const createRoom = (callback: (err: any, responses: string) => void) => {
  socket.timeout(3000).emit("create-room", callback);
}