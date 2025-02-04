import React, {ReactNode, useEffect} from 'react';
import {
  ScreenNames,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../user';
import {Image} from 'react-native';

export const ReactNavigationProvider = ({children}: {children: ReactNode}) => {
  const {navigateToScreen} = useReactNavigation();

  const {isDataLoading} = useUserStateProfile();
  useEffect(() => {
    if (isDataLoading) {
      return;
    }
    navigateToScreen(ScreenNames.Profile);
  }, [isDataLoading]);

  return (
    <>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={require('../shared/bg.png')}
      />
      {children}
    </>
  );
};
