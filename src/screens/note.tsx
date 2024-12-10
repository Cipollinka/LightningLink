import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import {
  ScreenNames,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../user';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';

type NoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Note
>;

export const NoteScreen: FC<NoteScreenProps> = ({route}) => {
  const {noteId} = route.params;
  const {goBack, navigate} =
    useNavigation<NavigationProp<RootStackParamList, ScreenNames.Note>>();
  const {navigateToScreen} = useReactNavigation();
  const {userProfile, setUserProfile} = useUserStateProfile();

  const note = userProfile?.notes.find(note => note.id === noteId);
  if (!note) {
    return null;
  }

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
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#EDECEC',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
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
            Note
          </Text>
        </View>

        <View
          style={{
            gap: 12,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={async () => {
              if (userProfile) {
                await setUserProfile({
                  ...userProfile,
                  notes: userProfile.notes.filter(note => note.id !== noteId),
                });
              }
              navigateToScreen(ScreenNames.Notes);
            }}>
            <Image source={require('../shared/assets/deletebutton.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.EditNote, {noteId});
            }}>
            <Image source={require('../shared/assets/penbutton.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (userProfile) {
                await setUserProfile({
                  ...userProfile,
                  likedNotes: userProfile.likedNotes.includes(noteId)
                    ? userProfile.likedNotes.filter(id => id !== noteId)
                    : [...userProfile.likedNotes, noteId],
                });
              }
            }}>
            <Image
              source={
                userProfile?.likedNotes.includes(noteId)
                  ? require('../shared/assets/likedbutton.png')
                  : require('../shared/assets/likebutton.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          backgroundColor: '#F5F5F5',
        }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 24,
        }}>
        {note.photo && (
          <Image
            source={{uri: note.photo}}
            style={{
              marginBottom: 24,
              height: 172,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 16,
              objectFit: 'contain',
            }}
          />
        )}

        <Text
          style={{
            fontSize: 20,
            color: '#1A1A1A',
            fontFamily: 'SF-Pro-Display-Bold',
            marginBottom: 16,
          }}>
          {note.heading}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#1A1A1A',
            fontFamily: 'SF-Pro-Display-Regular',
          }}>
          {note.text}
        </Text>
      </ScrollView>
    </View>
  );
};
