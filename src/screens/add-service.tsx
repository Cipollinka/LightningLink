import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import {
  ScreenNames,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {launchImageLibrary} from 'react-native-image-picker';
import {Link, ServiceCategory, useUserStateProfile} from '../user';

export const AddServiceScreen = () => {
  const {goBack} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.AddNewNote>
    >();
  const {userProfile, setUserProfile} = useUserStateProfile();

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [links, setLinks] = useState<Link[]>([
    {
      heading: 'Heading for link',
      url: 'link.example.com',
    },
  ]);
  const [selectedColor, setColor] = useState<string>('#FFC400');
  const [category, setCategory] = useState<ServiceCategory>(
    ServiceCategory.Study,
  );
  const [photo, setPhoto] = useState<string | undefined>();
  const {navigateToScreen} = useReactNavigation();
  const disabled = !title || !comment;
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
        services: [
          ...(userProfile.services || []),
          {
            id: new Date().getTime(),
            title,
            comment,
            links,
            color: selectedColor,
            category,
            cover: photo,
          },
        ],
      });
    }
    navigateToScreen(ScreenNames.Services);
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
          Add new service
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
          What is it?
        </Text>
        <TextInput
          clearButtonMode="always"
          value={title}
          onChangeText={setTitle}
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
          value={comment}
          onChangeText={setComment}
          placeholder="Text"
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

        <View
          style={{
            flexDirection: 'column',
            gap: 12,
            marginBottom: 24,
          }}>
          {links.map((link, index) => (
            <View
              style={{
                gap: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#000000',
                    fontFamily: 'SF-Pro-Display-Bold',
                  }}>
                  Link {index + 1}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setLinks(links.filter((_, i) => i !== index));
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#ff014d',
                      fontFamily: 'SF-Pro-Display-Regular',
                    }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                clearButtonMode="always"
                value={link.url}
                onChangeText={v => {
                  setLinks(
                    links.map((l, i) => (i === index ? {...l, url: v} : l)),
                  );
                }}
                placeholder="link.example.com"
                style={{
                  borderRadius: 12,
                  borderColor: '#EDECEC',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  paddingVertical: 13,
                  paddingHorizontal: 16,
                  color: 'black',
                }}
              />
              <TextInput
                clearButtonMode="always"
                value={link.heading}
                onChangeText={v => {
                  setLinks(
                    links.map((l, i) => (i === index ? {...l, heading: v} : l)),
                  );
                }}
                placeholder="Heading for link"
                style={{
                  borderRadius: 12,
                  borderColor: '#EDECEC',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  paddingVertical: 13,
                  paddingHorizontal: 16,
                  color: 'black',
                }}
              />
            </View>
          ))}
          <TouchableOpacity
            style={{
              marginTop: 12,
            }}
            onPress={() => {
              setLinks([
                ...links,
                {
                  heading: 'Heading for link',
                  url: 'link.example.com',
                },
              ]);
            }}>
            <Image source={require('../shared/assets/newlinkbutton.png')} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 17,
              color: '#000000',
              marginBottom: 10,
              fontFamily: 'SF-Pro-Display-Bold',
            }}>
            Color
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}>
            {['#FFC400', '#00AEFF', '#06C613', '#F94007'].map(color => (
              <TouchableOpacity
                onPress={() => {
                  setColor(color);
                }}
                style={{
                  width: 37,
                  height: 37,
                  borderRadius: 10,
                  borderColor: color,
                  borderWidth: 1,
                  backgroundColor: selectedColor === color ? color : 'white',
                }}
              />
            ))}
          </View>
        </View>
        <Text
          style={{
            marginTop: 24,
            fontSize: 17,
            color: '#000000',
            marginBottom: 10,
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Category
        </Text>
        <FlatList
          scrollEnabled={false}
          data={[
            {
              value: ServiceCategory.Study,
              cover: require('../shared/assets/bookcategory.png'),
            },
            {
              value: ServiceCategory.Work,
              cover: require('../shared/assets/pccategory.png'),
            },
            {
              value: ServiceCategory.Entertainment,
              cover: require('../shared/assets/gamecategory.png'),
            },
            {
              value: ServiceCategory.Life,
              cover: require('../shared/assets/coffecategory.png'),
            },
          ]}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCategory(item.value);
              }}
              style={{
                opacity: category === item.value ? 1 : 0.5,
                width: '95%',
                flex: 1,
                margin: 4,
              }}>
              <Image
                style={{
                  width: '100%',
                  objectFit: 'contain',
                }}
                source={item.cover}
              />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
        <Text
          style={{
            fontSize: 17,
            color: '#000000',
            marginTop: 24,
            marginBottom: 10,
            fontFamily: 'SF-Pro-Display-Bold',
          }}>
          Add cover
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
              Save
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};
