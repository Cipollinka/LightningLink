import React, {useEffect, useRef} from 'react';
import { Animated, Text, View, Easing, ImageBackground } from "react-native";

export const LoadingScreen = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();
    };

    startRotation();
  }, [rotation]);

  // Interpolating the rotation value to degrees
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground
      source={require('../shared/assets/onboardingbg.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 34,
          lineHeight: 41,
          fontFamily: 'SF-Pro-Display-Semibold',
          color: '#1A1A1A',
          marginBottom: 44,
        }}>
        Web Link Saver
      </Text>
      <Animated.Image
        source={require('../shared/assets/loader.png')}
        style={{
          transform: [{rotate: rotateInterpolation}],
        }}
      />
    </ImageBackground>
  );
};
