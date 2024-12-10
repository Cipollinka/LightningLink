import React from 'react';
import {FlatList, Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {PreviewProfile} from './preview-profile.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../index.tsx';
import {ScreenNames} from '../../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../../user';

export const ProfileScreen = () => {
  const {userProfile, resetUserProfile} = useUserStateProfile();
  const {navigate} =
    useNavigation<NavigationProp<RootStackParamList, ScreenNames.Profile>>();
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <PreviewProfile />
      <View
        style={{
          marginBottom: 12,
        }}>
        <Text
          style={{
            marginBottom: 12,
            fontSize: 20,
            color: '#1A1A1A',
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Settings
        </Text>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    navigate(ScreensRoads.Password);*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    borderWidth: 1,*/}
        {/*    borderColor: '#EDECEC',*/}
        {/*    height: 53,*/}
        {/*    width: '100%',*/}
        {/*    backgroundColor: 'white',*/}
        {/*    borderRadius: 16,*/}
        {/*    padding: 16,*/}
        {/*    flexDirection: 'row',*/}
        {/*    alignItems: 'center',*/}
        {/*    justifyContent: 'space-between',*/}
        {/*  }}>*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      fontSize: 17,*/}
        {/*      color: '#1A1A1A',*/}
        {/*      fontFamily:'SF-Pro-Display-Regular',*/}
        {/*    }}>*/}
        {/*    Password*/}
        {/*  </Text>*/}
        {/*  <Image source={require('../../shared/assets/arrowrightgrey.png')} />*/}
        {/*</TouchableOpacity>*/}
      </View>

      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
        }}
        data={[
          // {
          //   onClick: () => {},
          //   image: require('../../shared/assets/qraction.png'),
          // },
          {
            onClick: () => {
              Linking.openURL(
                'https://www.termsfeed.com/live/e7c49337-7992-4936-9d8a-c00a17c0bd91',
              );
            },
            image: require('../../shared/assets/devaction.png'),
          },
          {
            onClick: () => {
              Linking.openURL(
                'https://www.termsfeed.com/live/e7c49337-7992-4936-9d8a-c00a17c0bd91',
              );
            },
            image: require('../../shared/assets/privacyaction.png'),
          },
          {
            onClick: () => {
              resetUserProfile();
            },
            image: require('../../shared/assets/delete.png'),
          }
        ]}
        numColumns={2}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={item.onClick}
            style={{
              margin: 4,
            }}>
            <Image source={item.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
