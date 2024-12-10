import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import {
  ScreenNames,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserStateProfile} from '../user';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, ScreenNames.EditNote>;
export const EditNoteScreen: FC<Props> = ({route}) => {
  const {noteId} = route.params;

  const {goBack} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.AddNewNote>
    >();
  const {userProfile, setUserProfile} = useUserStateProfile();

  const note = userProfile?.notes.find(note => note.id === noteId);

  const [heading, setHeading] = useState(note?.heading || '');
  const [photo, setPhoto] = useState<string | undefined>(
    note?.photo || undefined,
  );
  const [text, setText] = useState(note?.text || '');
  const {navigateToScreen} = useReactNavigation();

  if (!note) {
    return null;
  }

  const disabled = !heading || !text;

  const pickImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      response => {
        console.log('response', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (!uri) {
            return;
          }
          setPhoto(uri);
        }
      },
    );
  };
  const onSave = async () => {
    if (userProfile) {
      await setUserProfile({
        ...userProfile,
        notes: userProfile.notes.map(n => {
          if (n.id === noteId) {
            return {
              ...n,
              heading,
              text,
              photo,
            };
          }
          return n;
        }),
      });
    }
    navigateToScreen(ScreenNames.Notes);
  };
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
          Edit note
        </Text>
      </View>

      <ScrollView
        style={{
          backgroundColor: '#F5F5F5',
        }}
        contentContainerStyle={{
          paddingVertical: 24,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 17,
            color: '#000000',
            marginBottom: 10,
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Heading
        </Text>
        <TextInput
          clearButtonMode="always"
          value={heading}
          onChangeText={setHeading}
          placeholder="Heading"
          style={{
            borderRadius: 12,
            borderColor: '#EDECEC',
            borderWidth: 1,
            backgroundColor: 'white',
            paddingVertical: 13,
            paddingHorizontal: 16,
            marginBottom: 24,
            color: 'black',
          }}
        />

        <Text
          style={{
            fontSize: 17,
            color: '#000000',
            marginBottom: 10,
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Text
        </Text>
        <TextInput
          multiline
          numberOfLines={5}
          clearButtonMode="always"
          value={text}
          onChangeText={setText}
          placeholder="Heading"
          style={{
            textAlignVertical: 'top',
            borderRadius: 12,
            borderColor: '#EDECEC',
            borderWidth: 1,
            backgroundColor: 'white',
            paddingVertical: 13,
            paddingHorizontal: 16,
            marginBottom: 24,
            color: 'black',
          }}
        />

        <Text
          style={{
            fontSize: 17,
            color: '#000000',
            marginBottom: 10,
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Change cover
        </Text>

        {photo ? (
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{uri: photo}}
              style={{
                borderWidth: 1,
                borderColor: '#EDECEC',
                objectFit: 'contain',
                backgroundColor: 'white',
                width: '100%',
                height: 172,
                borderRadius: 16,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{
                width: 124,
                height: 124,
              }}
              source={require('../shared/assets/addcover.png')}
            />
          </TouchableOpacity>
        )}
      </ScrollView>

      <View
        style={{
          padding: 20,
          paddingTop: 16,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#EDECEC',
        }}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={onSave}
            disabled={disabled}
            style={{
              width: '100%',
              height: 48,
              backgroundColor: disabled ? '#F5F5F5' : '#FF8601',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: disabled ? '#999999' : 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};
