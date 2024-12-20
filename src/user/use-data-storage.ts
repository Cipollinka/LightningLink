import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProfileState} from './types.ts';

const STORAGE_USER_KEY = 'user';
const defaultUserDataState: UserProfileState = {
  avatar: '',
  username: '',
  notes: [],
  likedNotes: [],
  services: [],
  likedServices: [],
};

export const useUserProfileDataStorage = () => {
  const [profileData, setProfileData] =
    useState<UserProfileState>(defaultUserDataState);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoadingData(true);
        const savedData = await AsyncStorage.getItem(STORAGE_USER_KEY);
        if (savedData) {
          setProfileData(JSON.parse(savedData));
        }
      } finally {
        setLoadingData(false);
      }
    };

    loadUserData();
  }, []);

  const updateProfileData = async (newData: UserProfileState) => {
    try {
      const serializedData = JSON.stringify(newData);
      console.log('Saving profile data:', newData);
      await AsyncStorage.setItem(STORAGE_USER_KEY, serializedData);
      setProfileData(newData);
    } catch (error) {
      console.error('Failed to update profile data:', error);
    }
  };

  const clearProfileData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_USER_KEY);
      setProfileData(defaultUserDataState);
    } catch (error) {
      console.error('Failed to reset profile data:', error);
    }
  };
  return {
    userProfile: profileData,
    isDataLoading: loadingData,
    setUserProfile: updateProfileData,
    resetUserProfile: clearProfileData,
  };
};
