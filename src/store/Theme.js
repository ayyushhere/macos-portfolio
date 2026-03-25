import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set) => ({
            wallpaper: 'dark',
            toggleWallpaper: () =>
                set((state) => ({
                    wallpaper: state.wallpaper === 'light' ? 'dark' : 'light',
                })),
            setWallpaper: (wallpaper) => set({ wallpaper }),
        }),
        {
            name: 'wallpaper-storage',
        }
    )
);

export default useThemeStore;
