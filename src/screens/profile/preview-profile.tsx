import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserStateProfile} from '../../user';


export const PreviewProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {userProfile, setUserProfile} = useUserStateProfile();
  const [username, setUsername] = React.useState(userProfile?.username || '');

  const onSave = async () => {
    if (userProfile) {
      await setUserProfile({
        ...userProfile,
        username,
        avatar: photo || ('' as string),
      });
      setIsEditing(false);
    }
    setIsEditing(false);
  };

  const [photo, setPhoto] = React.useState<string | undefined>();

  const onCancel = () => {
    setUsername(userProfile?.username || '');
    setPhoto(userProfile?.avatar || undefined);
    setIsEditing(false);
  };

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

  if (!isEditing) {
    return (
      <View
        style={{
          marginBottom: 16,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: '#EDECEC',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 16,
          paddingRight: 22,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}>
          <Image
            source={
              userProfile?.avatar
                ? {uri: userProfile.avatar}
                : require('../../shared/assets/addprofilebutton.png')
            }
            style={{
              borderRadius: 100,
              width: 72,
              height: 72,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              lineHeight: 22,
              color: '#1A1A1A',
            }}>
            {userProfile?.username || 'Username is empty'}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Image source={require('../../shared/assets/editbutton.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={{
        marginBottom: 16,
        borderWidth: 1,
        height: 136,
        borderRadius: 20,
        borderColor: '#EDECEC',
        flexDirection: 'row',
        gap: 16,
        padding: 16,
      }}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          alignItems: 'center',
          gap: 4,
        }}>
        {photo ? (
          <>
            <Image
              source={{uri: photo}}
              style={{
                borderRadius: 100,
                width: 72,
                height: 72,
              }}
            />
            <Image source={require('../../shared/assets/changebutton.png')} />
          </>
        ) : (
          <Image
            style={{
              width: 72,
              height: 72,
            }}
            source={require('../../shared/assets/addprofilebutton.png')}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          gap: 8,
          flex: 1,
        }}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          clearButtonMode={'always'}
          placeholder="Username"
          placeholderTextColor="#999999"
          style={{
            paddingVertical: 13,
            paddingHorizontal: 16,
            height: 48,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#EDECEC',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}>
          <TouchableOpacity
            onPress={onCancel}
            style={{
              flex: 1,
              backgroundColor: '#FF8601',
              borderRadius: 12,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSave}
            style={{
              flex: 1,
              backgroundColor: '#FF8601',
              borderRadius: 12,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
