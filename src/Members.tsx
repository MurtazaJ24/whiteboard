import { CopyPlusIcon } from "lucide-react";
import { useStore } from "./store/store";
import { toast } from "sonner";

const Members = () => {
  const users = useStore((state) => state.users);

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
    <div className="w-full max-w-60 py-5 bg-gray-100">
      <div className="flex flex-row justify-between px-3">
        <h2 className="text-lg  font-semibold text-gray-900">Members</h2>
        <button className="text-sm px-3 py-1.5 font-semibold text-gray-900 rounded-md" onClick={copyLink}>
          <CopyPlusIcon className="w-4 h-4" />
        </button>
      </div>
      <ul role="list" className="mt-4 divide-y divide-gray-100 w-full">
        {users.map((user) => (
          <li key={user.id} className="flex flex-col px-3 py-2">
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
  );
};

export default Members;
