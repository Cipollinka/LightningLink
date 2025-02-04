import React, {ReactNode} from 'react';
import {UserProfileStateContext, useUserProfileDataStorage} from '../user';
import {Image} from 'react-native';

export const UserProfileDataProviderHandler: React.FC<{
  children: ReactNode;
}> = ({children}) => {
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
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={require('../shared/bg.png')}
      />
      {children}
    </UserProfileStateContext.Provider>
  );
};
