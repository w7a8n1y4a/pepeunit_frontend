import { create } from 'zustand';
import { GetUserQuery } from '@rootTypes/compositionFunctions'


export interface UserStore {
  user: GetUserQuery['getUser'] | null;
  setUser: (user: GetUserQuery['getUser']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem('user');
    set({ user: null });
  }
}));
