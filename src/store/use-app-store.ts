import { create } from "zustand";

interface AppState {
    isOffline: boolean;
    setOffline: (status: boolean) => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    selectedDisaster: string | null;
    setSelectedDisaster: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    isOffline: false,
    setOffline: (status) => set({ isOffline: status }),
    sidebarOpen: false,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    selectedDisaster: null,
    setSelectedDisaster: (id) => set({ selectedDisaster: id }),
}));
