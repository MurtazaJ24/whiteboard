import { RouterProvider, createBrowserRouter } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import RoomPage from "./RoomPage";
import PrivateRoute from "./helpers/PrivateRoute";
import { useEffect } from "react";
import {
  connectWithSocketServer,
  disconnectFromSocketServer,
} from "./socket/connection";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <JoinRoom />
      </PrivateRoute>
    ),
  },
  {
    path: "/room/:roomId",
    element: (
      <PrivateRoute>
        <RoomPage />
      </PrivateRoute>
    ),
  },
]);

const App = () => {
  useEffect(() => {
    connectWithSocketServer();

    return () => disconnectFromSocketServer();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
