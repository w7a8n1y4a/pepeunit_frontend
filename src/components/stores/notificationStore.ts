import { create } from 'zustand';

interface NotificationStore {
    unreadCount: number;
    refreshNonce: number;
    setUnreadCount: (count: number) => void;
    notifyChanged: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    unreadCount: 0,
    refreshNonce: 0,
    setUnreadCount: (count) => set({ unreadCount: count }),
    notifyChanged: () => set((state) => ({ refreshNonce: state.refreshNonce + 1 })),
}));
