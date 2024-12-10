import React, {ReactNode, useEffect} from 'react';
import {
  ScreenNames,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../user';

export const ReactNavigationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {navigateToScreen} = useReactNavigation();

  const {isDataLoading} = useUserStateProfile();
  useEffect(() => {
    if (isDataLoading) {
      return;
    }
    navigateToScreen(ScreenNames.Profile);
  }, [isDataLoading]);

  return <>{children}</>;
};
