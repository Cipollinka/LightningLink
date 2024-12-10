import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import {ScreenNames} from '../shared/use-react-navigation.ts';

export const PasswordScreen = () => {
  const {goBack} =
    useNavigation<NavigationProp<RootStackParamList, ScreenNames.Password>>();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          height: 76,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#EDECEC',
        }}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require('../shared/assets/backbutton.png')} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            color: '#1A1A1A',
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Password
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F5F5F5',
          padding: 24,
          gap: 12,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#1A1A1A',
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Settings
        </Text>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 11,
            borderColor: '#EDECEC',
            borderWidth: 1,
            height: 53,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#1A1A1A',
              fontFamily: 'SF-Pro-Display-Regular',
            }}>
            Password on login
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 11,
            borderColor: '#EDECEC',
            borderWidth: 1,
            height: 53,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#1A1A1A',
              fontFamily: 'SF-Pro-Display-Regular',
            }}>
            Change password
          </Text>
          <Image source={require('../shared/assets/arrowrightgrey.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 17,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#EF1C40',
              fontFamily: 'SF-Pro-Display-Regular',
            }}>
            Delete password
          </Text>
        </TouchableOpacity>
        <Image
          source={require('../shared/assets/three.png')}
          style={{
            marginTop: 'auto',
            marginHorizontal: 'auto',
            marginBottom: 68,
          }}
        />
      </View>
    </View>
  );
};
