import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    set => ({
      tokenType: null,
      accessToken: null,
      firstName: null,
      lastName: null,
      setUser: (user) => set({
        tokenType: user.tokenType,
        accessToken: user.accessToken,
        firstName: user.attributes.first_name,
        lastName: user.attributes.last_name,
      }),
      clearUser: () => set({
        tokenType: null,
        accessToken: null,
        firstName: null,
        lastName: null,
      }),
    }),
    {
      name: 'user-storage', // name of the item in storage
      getStorage: () => AsyncStorage, // specify which storage to use
    }
  )
);

export default useUserStore;
