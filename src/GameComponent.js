import React from 'react';
import {UserProfileDataProviderHandler} from './app/userProfileDataProviderHandler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ReactNavigationProvider} from './app/react-navigation-provider';
import {Screens} from './screens';
import {Image, View} from 'react-native';

export default function GameComponent() {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <UserProfileDataProviderHandler>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={navTheme}>
            <ReactNavigationProvider>
                <Image
                    style={{width: '100%', height: '100%', position: 'absolute'}}
                    source={require('./shared/bg.png')}
                />
              <Screens />
            </ReactNavigationProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProfileDataProviderHandler>
    </View>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
