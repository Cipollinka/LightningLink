import {createContext, useContext} from 'react';
import {UserProfileState} from './types.ts';

export const UserProfileStateContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUserStateProfile = () => {
  const context = useContext(UserProfileStateContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  return context;
};

interface UserContextProps {
  userProfile: UserProfileState | null;
  setUserProfile: (newState: UserProfileState) => Promise<void>;
  resetUserProfile: () => void;
  isDataLoading: boolean;
}
