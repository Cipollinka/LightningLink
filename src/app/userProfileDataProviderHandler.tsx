import React, {ReactNode} from 'react';
import {UserProfileStateContext, useUserProfileDataStorage} from '../user';

export const UserProfileDataProviderHandler: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {isDataLoading, setUserProfile, userProfile, resetUserProfile} =
    useUserProfileDataStorage();

  return (
    <UserProfileStateContext.Provider
      value={{
        isDataLoading,
        userProfile,
        setUserProfile,
        resetUserProfile,
      }}>
      {children}
    </UserProfileStateContext.Provider>
  );
};
