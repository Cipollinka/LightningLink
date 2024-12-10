import {View} from 'react-native';

import {ReactNavigationProvider} from './react-navigation-provider.tsx';
import {Screens} from '../screens';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {UserProfileDataProviderHandler} from './userProfileDataProviderHandler.tsx';

export const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <UserProfileDataProviderHandler>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={navTheme}>
            <ReactNavigationProvider>
              <Screens />
            </ReactNavigationProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProfileDataProviderHandler>
    </View>
  );
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
