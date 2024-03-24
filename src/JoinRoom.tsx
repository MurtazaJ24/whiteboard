import { useNavigate } from "react-router-dom";
import { createRoom } from "./socket/connection";

const JoinRoom = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomCode = formData.get("room-code") as string;

    navigate(`/room/${roomCode}`);
  };

  const handleCreateRoom = () => {
    createRoom((_, roomCode) => {
      navigate(`/room/${roomCode}`);
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Join a room
          </h2>
        </div>

        <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="room-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Room code
              </label>
              <div className="mt-2">
                <input
                  id="room-code"
                  name="room-code"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Join room
              </button>
            </div>
          </form>
          <div className="relative flex justify-center">
            <p className="text-sm font-medium leading-6 px-3 bg-white text-gray-900">
              or
            </p>
            <div className="absolute top-1/2 -z-10 w-full h-0.5 bg-gray-200"></div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCreateRoom}
              className="flex w-full justify-center rounded-md bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new room
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
