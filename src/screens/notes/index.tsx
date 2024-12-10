import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../index.tsx';
import {ScreenNames} from '../../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../../user';
import {formatDate, groupNotesByDate} from './groupNotesByDate.ts';

export const NotesScreen = () => {
  const {navigate} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.AddNewNote>
    >();
  const {userProfile, setUserProfile} = useUserStateProfile();
  const notes = userProfile?.notes || [];

  const groupedNotes = groupNotesByDate(notes);
  const result = groupedNotes
  const likedNotes = userProfile?.likedNotes || [];
  const isEmpty = result.length === 0;

  const [expandedDates, setExpandedDates] = React.useState<string[]>(
    groupedNotes.slice(0, 5).map(({title}) => title),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
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
          Notes
        </Text>
        <View
          style={{
            gap: 12,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.NotesSearch);
            }}>
            <Image source={require('../../shared/assets/zoombutton.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.FilterNotes);
            }}>
            <Image source={require('../../shared/assets/calendarbutton.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.LikedNotes);
            }}>
            <Image source={require('../../shared/assets/likebutton.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {isEmpty && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 31,
            backgroundColor: '#F5F5F5',
          }}>
          <Text
            style={{
              width: 270,
              textAlign: 'center',
              fontSize: 20,
              color: '#1A1A1A',
              fontFamily: 'SF-Pro-Display-Regular',
            }}>
            There aren’t any added notes, try again later
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.AddNewNote);
            }}>
            <Image source={require('../../shared/assets/addbutton.png')} />
          </TouchableOpacity>

          <Image
            source={require('../../shared/assets/lightsecond.png')}
            style={{
              position: 'absolute',
              top: 0,
              right: -10,
            }}
          />

          <Image
            source={require('../../shared/assets/light.png')}
            style={{
              position: 'absolute',
              bottom: 0,
              left: -10,
            }}
          />
        </View>
      )}

      {!isEmpty && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#F5F5F5',
            marginHorizontal: 'auto',
            width: '100%',
          }}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: '#F5F5F5',
            }}
            contentContainerStyle={{
              position: 'relative',
              paddingTop: 13,
              height: '100%',
              paddingHorizontal: 20,
              gap: 20,
            }}>
            {result.map(({title, notes}) => (
              <View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: expandedDates.includes(title)
                      ? 16
                      : undefined,
                  }}
                  onPress={() => {
                    setExpandedDates(
                      expandedDates.includes(title)
                        ? expandedDates.filter(date => date !== title)
                        : [...expandedDates, title],
                    );
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#1A1A1A',
                      fontFamily: 'SF-Pro-Display-Bold',
                    }}>
                    {title}
                  </Text>

                  <Image
                    source={
                      expandedDates.includes(title)
                        ? require('../../shared/assets/arrowup.png')
                        : require('../../shared/assets/arrowdown.png')
                    }
                  />
                </TouchableOpacity>
                {expandedDates.includes(title) && (
                  <FlatList
                    scrollEnabled={false}
                    data={notes}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigate(ScreenNames.Note, {
                            noteId: item.id,
                          });
                        }}
                        style={{
                          flex: 1,
                          margin: 4,
                          padding: 16,
                          borderRadius: 20,
                          backgroundColor: '#fff',
                        }}>
                        {item.photo && (
                          <Image
                            source={{uri: item.photo}}
                            style={{
                              flex: 1,
                              objectFit: 'contain',
                              height: 88,
                              marginBottom: 16,
                            }}
                          />
                        )}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 10,
                          }}>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                flex: 1,
                                fontSize: 15,
                                color: '#1A1A1A',
                                marginBottom: 6,
                                fontFamily: 'SF-Pro-Display-Bold',
                              }}>
                              {item.heading}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 13,
                                color: '#1A1A1A',
                                fontFamily: 'SF-Pro-Display-Regular',
                                flex: 1,
                              }}>
                              {item.text}
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              if (!userProfile) {
                                return;
                              }
                              if (likedNotes.includes(item.id)) {
                                setUserProfile({
                                  ...userProfile,
                                  likedNotes: likedNotes.filter(
                                    id => id !== item.id,
                                  ),
                                });
                              } else {
                                setUserProfile({
                                  ...userProfile,
                                  likedNotes: [...likedNotes, item.id],
                                });
                              }
                            }}>
                            <Image
                              style={{
                                width: 24,
                                height: 24,
                              }}
                              source={
                                likedNotes.includes(item.id)
                                  ? require('../../shared/assets/liked.png')
                                  : require('../../shared/assets/notlikedblack.png')
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )}
                    numColumns={2}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.AddNewNote);
            }}
            style={{
              maxWidth: 350,
              width: '100%',
              position: 'absolute',
              left: '50%',
              bottom: 10,
              transform: [{translateX: -175}],
            }}>
            <Image
              borderRadius={16}
              style={{
                objectFit: 'cover',
                width: '100%',
              }}
              source={require('../../shared/assets/addbuttonlong.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const getFirstNWords = (text: string, num: number): string => {
  if (text.length <= num) {
    return text;
  }
  return `${text.slice(0, num)}...`;
};
