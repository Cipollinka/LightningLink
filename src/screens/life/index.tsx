import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../index.tsx';
import {ScreenNames} from '../../shared/use-react-navigation.ts';
import {ServiceCategory, useUserStateProfile} from '../../user';
import {LifeTab} from './life-tab.tsx';

export const LifeScreen = () => {
  const {navigate, goBack} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.Life>
    >();
  const {userProfile} = useUserStateProfile();
  const services = userProfile?.services || [];
  const result = services.filter(
    service => service.category === ServiceCategory.Life,
  );
  const isEmpty = result.length === 0;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#EDECEC',
          borderBottomWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}>
          <TouchableOpacity onPress={goBack}>
            <Image source={require('../../shared/assets/backbutton.png')} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 24,
              color: '#1A1A1A',
              fontFamily: 'SF-Pro-Display-Bold',
            }}>
            Life
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigate(ScreenNames.ServicesSearch);
          }}>
          <Image source={require('../../shared/assets/zoombutton.png')} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          padding: 20,
        }}>
        <View
          style={{
            maxWidth: 350,
            width: '100%',
            height: '100%',
            position: 'relative',
            flex: 1,
          }}>
          <LifeTab isEmpty={isEmpty} result={result} />

          {!isEmpty && (
            <TouchableOpacity
              onPress={() => {
                navigate(ScreenNames.AddService);
              }}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: -10,
                transform: [{translateX: -175}],
              }}>
              <Image
                source={require('../../shared/assets/addbuttonlong.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
