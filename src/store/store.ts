import { create } from "zustand";


type CanvasStore = {
  canvasImage: string | 0;
  draw(draw: string): void;
  clear(): void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasImage: "",
  draw: (canvasImage: string) => set(() => ({ canvasImage })),
  clear: () => set({ canvasImage: 0 }),
}));

type UserStore = {
  users: User[];
  setUsers(members: User[]): void;
  showUsersSidebar: boolean;
  toggleUsersSidebar(): void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  showUsersSidebar: false,
  setUsers: (users: User[]) => set({ users }),
  toggleUsersSidebar: () => set((state) => ({ showUsersSidebar: !state.showUsersSidebar })),
}));