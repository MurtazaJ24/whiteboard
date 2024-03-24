import { useParams } from "react-router-dom";
import Members from "./Members";
import Whiteboard from "./Whiteboard";
import { useEffect } from "react";
import { joinRoom, leaveRoom } from "./socket/connection";
import useLocalStorage from "./hooks/useLocalStorage";
import Nav from "./Nav";
import { useUserStore } from "./store/store";

const RoomPage = () => {
  const { roomId } = useParams();
  const [user] = useLocalStorage("user", {});
  const showUsersSidebar = useUserStore((state) => state.showUsersSidebar);

  useEffect(() => {
    if (!roomId || !user) return;
    joinRoom(roomId, user);

    return () => {
      leaveRoom();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-row">
        <Whiteboard />
        {showUsersSidebar && <Members />}
      </div>
    </div>
  );
};

export default RoomPage;
