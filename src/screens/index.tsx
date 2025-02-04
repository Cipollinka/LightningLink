import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ScreenNames,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {LoadingScreen} from './loading.tsx';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {ProfileScreen} from './profile';
import {NoteScreen} from './note.tsx';
import {NotesScreen} from './notes';
import {ServicesScreen} from './services';
import {PasswordScreen} from './password.tsx';
import {AddNoteScreen} from './add-note.tsx';
import {NotesSearchScreen} from './notes-search.tsx';
import {ServicesSearch} from './services-search.tsx';
import {EditNoteScreen} from './edit-note.tsx';
import {AddServiceScreen} from './add-service.tsx';
import {ServiceScreen} from './service.tsx';
import {EditServiceScreen} from './edit-service.tsx';
import {LikedServices} from './liked-services.tsx';
import {LikedNotes} from './liked-notes.tsx';
import {FilterNotes} from './filter-notes.tsx';
import {EntertainmentScreen} from './entertainment';
import {LifeScreen} from './life';
import {WorkScreen} from './work';
import {StudyScreen} from './study';

export type RootStackParamList = {
  [ScreenNames.Loader]: undefined; // No params
  [ScreenNames.Services]: undefined; // No params
  [ScreenNames.Notes]: undefined; // No params
  [ScreenNames.Password]: undefined; // No params
  [ScreenNames.Profile]: undefined; // No params
  [ScreenNames.AddNewNote]: undefined; // No params
  [ScreenNames.NotesSearch]: undefined; // No params
  [ScreenNames.Work]: undefined; // No params
  [ScreenNames.AddService]: undefined; // No params
  [ScreenNames.Life]: undefined; // No params
  [ScreenNames.FilterNotes]: undefined; // No params
  [ScreenNames.LikedNotes]: undefined; // No params
  [ScreenNames.LikedServices]: undefined; // No params
  [ScreenNames.Study]: undefined; // No params
  [ScreenNames.Entertainment]: undefined; // No params
  [ScreenNames.ServicesSearch]: undefined; // No params
  [ScreenNames.Note]: {
    noteId: number;
  };
  [ScreenNames.Service]: {
    serviceId: number;
  };
  [ScreenNames.EditService]: {
    serviceId: number;
  };
  [ScreenNames.EditNote]: {
    noteId: number;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const Screens = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={{width: '100%', height: '105%', position: 'absolute', flex: 1}}
        source={require('../shared/bg.png')}
      />
      <View
        style={{
          width: '110%',
          height: '110%',
          position: 'absolute',
          backgroundColor: 'white',
          opacity: 0.5,
        }}
      />
      <SafeAreaView
        style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          flex: 1,
          width: '100%',
          height: '100%',
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={ScreenNames.Loader}>
          <Stack.Screen name={ScreenNames.Loader} component={LoadingScreen} />
          <Stack.Screen name={ScreenNames.Life} component={LifeScreen} />
          <Stack.Screen name={ScreenNames.Work} component={WorkScreen} />
          <Stack.Screen name={ScreenNames.Study} component={StudyScreen} />
          <Stack.Screen name={ScreenNames.Service} component={ServiceScreen} />
          <Stack.Screen
            name={ScreenNames.EditService}
            component={EditServiceScreen}
          />
          <Stack.Screen name={ScreenNames.Notes} component={NotesScreen} />
          <Stack.Screen name={ScreenNames.LikedNotes} component={LikedNotes} />
          <Stack.Screen
            name={ScreenNames.Entertainment}
            component={EntertainmentScreen}
          />
          <Stack.Screen
            name={ScreenNames.FilterNotes}
            component={FilterNotes}
          />
          <Stack.Screen
            name={ScreenNames.LikedServices}
            component={LikedServices}
          />
          <Stack.Screen
            name={ScreenNames.AddService}
            component={AddServiceScreen}
          />
          <Stack.Screen
            name={ScreenNames.ServicesSearch}
            component={ServicesSearch}
          />
          <Stack.Screen
            name={ScreenNames.AddNewNote}
            component={AddNoteScreen}
          />
          <Stack.Screen
            name={ScreenNames.NotesSearch}
            component={NotesSearchScreen}
          />
          <Stack.Screen name={ScreenNames.Note} component={NoteScreen} />
          <Stack.Screen
            name={ScreenNames.EditNote}
            component={EditNoteScreen}
          />
          <Stack.Screen
            name={ScreenNames.Password}
            component={PasswordScreen}
          />
          <Stack.Screen
            name={ScreenNames.Services}
            component={ServicesScreen}
          />
          <Stack.Screen name={ScreenNames.Profile} component={ProfileScreen} />
        </Stack.Navigator>
      </SafeAreaView>
      <Navigation />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export const Navigation = () => {
  const {currentlyOpenedScreen, navigateToScreen} = useReactNavigation();
  console.log(currentlyOpenedScreen);
  const navigationActiveScreens: string[] = [
    ScreenNames.Profile,
    ScreenNames.Notes,
    ScreenNames.Services,
  ];
  if (
    !currentlyOpenedScreen ||
    !navigationActiveScreens.includes(currentlyOpenedScreen)
  ) {
    return null;
  }
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: '#EDECEC',
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        alignItems: 'center',
      }}>
      <SafeAreaView
        style={{
          width: '100%',
          maxWidth: 350,
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#F5F5F5',
          justifyContent: 'space-evenly',
          height: 56,
          minHeight: 56,
          borderRadius: 12,
          gap: 12,
          padding: 8,
        }}>
        <NavigationButton
          path={
            currentlyOpenedScreen === ScreenNames.Services
              ? require('../shared/assets/activemore.png')
              : require('../shared/assets/more.png')
          }
          text="Services"
          isActive={currentlyOpenedScreen === ScreenNames.Services}
          navigateTo={() => navigateToScreen(ScreenNames.Services)}
        />
        <NavigationButton
          path={
            currentlyOpenedScreen === ScreenNames.Notes
              ? require('../shared/assets/activenote.png')
              : require('../shared/assets/note.png')
          }
          text="Notes"
          isActive={currentlyOpenedScreen === ScreenNames.Notes}
          navigateTo={() => navigateToScreen(ScreenNames.Notes)}
        />
        <NavigationButton
          path={
            currentlyOpenedScreen === ScreenNames.Profile
              ? require('../shared/assets/activeperson.png')
              : require('../shared/assets/person.png')
          }
          text="Profile"
          isActive={currentlyOpenedScreen === ScreenNames.Profile}
          navigateTo={() => navigateToScreen(ScreenNames.Profile)}
        />
      </SafeAreaView>
    </View>
  );
};

interface Props {
  text: string;
  path: ImageSourcePropType;
  isActive: boolean;
  navigateTo: () => void;
}

const NavigationButton: FC<Props> = ({path, text, isActive, navigateTo}) => {
  return (
    <TouchableOpacity
      onPress={navigateTo}
      style={{
        borderRadius: 12,
        backgroundColor: isActive ? '#FF8601' : undefined,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 40,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Image
        style={{
          width: 24,
          height: 24,
        }}
        source={path}
      />
      {isActive && (
        <Text
          style={{
            color: 'white',
            fontSize: 11,
            fontFamily: 'SF-Pro-Display-Semibold',
          }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
