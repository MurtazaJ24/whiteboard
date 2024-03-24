import { CopyPlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "./store/store";

const Members = () => {
  const { users, toggleUsersSidebar } = useUserStore((state) => ({
    users: state.users,
    toggleUsersSidebar: state.toggleUsersSidebar,
  }));

  const copyLink = async () => {
    const promise = navigator.clipboard.writeText(window.location.href);
    toast.promise(promise, {
      loading: "Copying link...",
      success: () => {
        return "Link copied to clipboard";
      },
      error: "Failed to copy to clipboard.",
    });
  };

  return (
    <>
      <div className="lg:hidden absolute inset-0 z-10 bg-black/30" />
      <div className="absolute z-20 lg:relative right-0 top-0 h-full flex-shrink-0 w-72 py-5 bg-gray-100 shadow-md shadow-black/40">
        <div className="relative flex flex-row justify-between px-5">
          <h2 className="text-lg font-semibold text-gray-900">Members</h2>
          <button
            className="text-sm px-3 py-1.5 pr-4 lg:pr-0 font-semibold text-gray-800 rounded-md hover:text-black"
            onClick={copyLink}
          >
            <CopyPlusIcon className="size-4" />
          </button>
          <button
            className="lg:hidden absolute top-0 right-0 text-sm px-3 py-1.5 font-semibold text-gray-800 rounded-md hover:text-black"
            onClick={toggleUsersSidebar}
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <ul role="list" className="mt-4 divide-y divide-gray-100 w-full">
          {users.map((user) => (
            <li key={user.id} className="flex flex-col px-5 py-2">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-xs leading-5 text-gray-500">
                    @{user.username}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Members;
