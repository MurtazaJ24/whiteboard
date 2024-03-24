import { LogOutIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "./store/store";



export default function Nav() {
    const toggleUsersSidebar = useUserStore((state) => state.toggleUsersSidebar);
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex flex-shrink-0 gap-3 items-center bg-gray-700 px-3 py-2 rounded-md text-white hover:bg-gray-600">
              <LogOutIcon className="size-5 " aria-hidden="true" />
              <p className="hidden md:block">Leave Room</p>
            </Link>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={toggleUsersSidebar} className="flex flex-shrink-0 gap-3 items-center bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 text-white">
              <p className="hidden md:block">View members</p>
              <UsersIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
