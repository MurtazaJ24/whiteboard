import { useParams } from "react-router-dom";
import Members from "./Members";
import Whiteboard from "./Whiteboard";
import { useEffect } from "react";
import { joinRoom, leaveRoom } from "./socket/connection";
import useLocalStorage from "./hooks/useLocalStorage";

const RoomPage = () => {
  const { roomId } = useParams();
  const [user] = useLocalStorage("user", {});

  useEffect(() => {
    if (!roomId || !user) return;
    console.log(`Room ID: ${roomId}`);
    joinRoom(roomId, user)

    return () => {
      console.log(`Leaving room ${roomId}`);
      leaveRoom()
    };
  }, []);

  return (
    <div className="flex flex-row">
      <Members />
      <Whiteboard />
    </div>
  );
};

export default RoomPage;
