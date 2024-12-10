import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ServicesTab} from './services.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../index.tsx';
import {ScreenNames} from '../../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../../user';

export const ServicesScreen = () => {
  const [tab, setTab] = React.useState<'services' | 'useful'>('services');
  const {navigate} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.AddNewNote>
    >();
  const {userProfile, setUserProfile} = useUserStateProfile();
  const isEmpty = userProfile?.services.length === 0;
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
        <Text
          style={{
            fontSize: 24,
            color: '#000000',
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Hello{userProfile?.username && `, ${userProfile?.username}`}!
        </Text>
        <View
          style={{
            gap: 12,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.ServicesSearch);
            }}>
            <Image source={require('../../shared/assets/zoombutton.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.LikedServices);
            }}>
            <Image source={require('../../shared/assets/likebutton.png')} />
          </TouchableOpacity>
        </View>
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
          {/*<View*/}
          {/*  style={{*/}
          {/*    flexDirection: 'row',*/}
          {/*    borderRadius: 9,*/}
          {/*    padding: 2,*/}
          {/*    height: 32,*/}
          {/*    backgroundColor: 'rgba(120, 120, 128, 0.12)',*/}
          {/*  }}>*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() => setTab('services')}*/}
          {/*    style={{*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      flex: 1,*/}
          {/*      borderRadius: 9,*/}
          {/*      backgroundColor: tab === 'services' ? 'white' : undefined,*/}
          {/*    }}>*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        fontSize: 13,*/}
          {/*        color: '#000000',*/}
          {/*        textAlign: 'center',*/}
          {/*        fontFamily: 'SF-Pro-Display-Regular',*/}
          {/*      }}>*/}
          {/*      My Services*/}
          {/*    </Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() => setTab('useful')}*/}
          {/*    style={{*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      flex: 1,*/}
          {/*      borderRadius: 9,*/}
          {/*      backgroundColor: tab === 'useful' ? 'white' : undefined,*/}
          {/*    }}>*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        fontSize: 13,*/}
          {/*        color: '#000000',*/}
          {/*        textAlign: 'center',*/}
          {/*        fontFamily: 'SF-Pro-Display-Regular',*/}
          {/*      }}>*/}
          {/*      Useful*/}
          {/*    </Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}

          {tab === 'services' && <ServicesTab isEmpty={isEmpty} />}

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
