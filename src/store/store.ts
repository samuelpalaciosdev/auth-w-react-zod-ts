import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
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
// <AppState>
// export const useAppStore = create(
//   persist(

//   )
//   devtools((set) => ({
//     user: localStorage.getItem('user')
//       ? JSON.parse(localStorage.getItem('user') as string)
//       : initialUserState,
//     isLoggedIn: false,
//     setUser: (user: User) => set(() => ({ user })),
//     setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
//     logoutUser: () => {
//       clearSessionStorage();
//       set(() => ({ user: initialUserState }));
//     },
//   }))
// );

export const useAppStore = create(
  persist(
    devtools<AppState>((set) => ({
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : initialUserState,
      isLoggedIn: false,
      setUser: (user: User) => set(() => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
      logoutUser: () => {
        clearSessionStorage();
        set(() => ({ user: initialUserState }));
      },
    })),
    // Key in localStorage
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
