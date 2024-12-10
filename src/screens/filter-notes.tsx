import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import {ScreenNames} from '../shared/use-react-navigation.ts';
import {useUserStateProfile} from '../user';
import {formatDate, groupNotesByDate} from './notes/groupNotesByDate.ts';
import DatePicker from 'react-native-date-picker';

export const FilterNotes = () => {
  const {goBack, navigate} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.NotesSearch>
    >();

  const {userProfile, setUserProfile} = useUserStateProfile();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | null>(null);

  const groupedNotes = groupNotesByDate(userProfile?.notes || []);
  const likedNotes = userProfile?.likedNotes || [];
  const [expandedDates, setExpandedDates] = React.useState<string[]>(
    groupedNotes.slice(0, 5).map(({title}) => title),
  );
  const result = useMemo(() => {
    return groupedNotes
      .map(({title, notes}) => ({
        title,
        notes: notes.filter(note => {
          if (!date) {
            return true;
          }
          return formatDate(note.id) === formatDate(date?.getTime());
        }),
      }))
      .filter(({notes}) => notes.length > 0);
  }, [ date,userProfile?.notes]);
  const searchResultEmpty = result.length === 0;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
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
            Note ({date ? `${formatDate(date.getTime())}` : 'All'})
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}>
          <Image source={require('../shared/assets/calendarbutton.png')} />
        </TouchableOpacity>
        <DatePicker
          modal
          mode={'date'}
          open={open}
          date={date || new Date()}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      {searchResultEmpty && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 31,
          }}>
          <Text
            style={{
              width: 197,
              textAlign: 'center',
              fontSize: 20,
              color: '#1A1A1A',
              fontFamily: 'SF-Pro-Display-Regular',
            }}>
            There aren’t any result for your search, try to change date
          </Text>

          <Image
            source={require('../shared/assets/lightsecond.png')}
            style={{
              position: 'absolute',
              top: 0,
              right: -10,
            }}
          />

          <Image
            source={require('../shared/assets/light.png')}
            style={{
              position: 'absolute',
              bottom: 0,
              left: -10,
            }}
          />
        </View>
      )}

      {!searchResultEmpty && (
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
                  marginBottom: expandedDates.includes(title) ? 16 : undefined,
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
                      ? require('../shared/assets/arrowup.png')
                      : require('../shared/assets/arrowdown.png')
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
                              flex: 1,
                              fontFamily: 'SF-Pro-Display-Regular',
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
                                ? require('../shared/assets/liked.png')
                                : require('../shared/assets/notlikedblack.png')
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
      )}
    </View>
  );
};
