import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export enum ScreenNames {
  Work = 'Work',
  Life = 'Life',
  LikedServices = 'LikedServices',
  Entertainment = 'Entertainment',
  AddService = 'AddService',
  FilterNotes = 'FilterNotes',
  Loader = 'Loader',
  LikedNotes = 'LikedNotes',
  Profile = 'Profile',
  Services = 'Services',
  NotesSearch = 'NotesSearch',
  Note = 'Note',
  ServicesSearch = 'ServicesSearch',
  Password = 'Password',
  AddNewNote = 'AddNewNote',
  Notes = 'Notes',
  EditNote = 'EditNote',
  EditService = 'EditService',
  Study = 'Study',
  Service = 'Service',
}

export const useReactNavigation = () => {
  const currentlyOpenedScreen = useNavigationState(state =>
    !state?.routes ? '' : state.routes[state.index].name,
  );

  const {dispatch} = useStackNavigation();

  const navigateToScreen = (screen: ScreenNames) => {
    if (currentlyOpenedScreen === screen) return;
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen}],
      }),
    );
  };
  return {navigateToScreen, currentlyOpenedScreen};
};
