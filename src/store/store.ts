import { create } from "zustand";


type Store = {
  users: User[];
  canvasImage: string | undefined;
  draw(draw: any): void;
  clear(): void;
  setUsers(members: User[]): void;
};

export const useStore = create<Store>((set) => ({
  users: [],
  canvasImage: "",
  draw: (canvasImage: string) => set(() => ({ canvasImage })),
  clear: () => set({ canvasImage: undefined }),
  setUsers: (users: User[]) => set({ users }),
}));
