import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { User } from '../types/user';

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const initialUserState = {
  user: null,
};
// const initialUserState: User = {
//   id: '',
//   name: '',
//   lastName: '',
//   email: '',
//   isActive: false,
//   role: 'client',
// };

const clearSessionStorage = () => {
  sessionStorage.removeItem('user');
};

export const useAppStore = create(
  persist(
    devtools<AppState>((set) => ({
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : initialUserState,
      isLoggedIn: false,
      setUser: (user: User) => set(() => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
      logoutUser: () => {
        clearSessionStorage();
        set(() => ({ user: null }));
      },
    })),
    // Key in localStorage
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
