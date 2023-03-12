import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../types/user';

interface AppState {
  user: User;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const initialUserState: User = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  password: '',
  isActive: false,
  role: 'client',
};

const clearSessionStorage = () => {
  sessionStorage.removeItem('user');
};

export const useAppStore = create(
  devtools<AppState>((set) => ({
    user: initialUserState,
    isLoggedIn: false,
    setUser: (user: User) => set(() => ({ user })),
    setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
    logoutUser: () => {
      clearSessionStorage();
      set(() => ({ user: initialUserState }));
    },
  }))
);
