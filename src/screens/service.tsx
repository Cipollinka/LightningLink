import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./index.tsx";
import { ScreenNames, useReactNavigation } from "../shared/use-react-navigation.ts";
import { useUserStateProfile } from "../user";
import { NativeStackScreenProps } from "react-native-screens/native-stack";

type NoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Service
>;

export const ServiceScreen: FC<NoteScreenProps> = ({ route }) => {
  const { serviceId } = route.params;
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList, ScreenNames.Service>>();
  const { navigateToScreen } = useReactNavigation();
  const { userProfile, setUserProfile } = useUserStateProfile();

  const service = userProfile?.services.find(note => note.id === serviceId);
  if (!service) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1
      }}>
      <View
        style={{
          height: 76,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#EDECEC"
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12
          }}>
          <TouchableOpacity onPress={goBack}>
            <Image source={require("../shared/assets/backbutton.png")} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 24,
              color: "#1A1A1A"
            }}>
            Service
          </Text>
        </View>

        <View
          style={{
            gap: 12,
            flexDirection: "row"
          }}>
          <TouchableOpacity
            onPress={async () => {
              if (userProfile) {
                await setUserProfile({
                  ...userProfile,
                  services: userProfile.services.filter(service => service.id !== serviceId)
                });
              }
              navigateToScreen(ScreenNames.Services);
            }}>
            <Image source={require("../shared/assets/deletebutton.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.EditService, {serviceId});
            }}>
            <Image source={require("../shared/assets/penbutton.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (userProfile) {
                await setUserProfile({
                  ...userProfile,
                  likedServices: userProfile.likedServices.includes(serviceId)
                    ? userProfile.likedServices.filter(id => id !== serviceId)
                    : [...userProfile.likedServices, serviceId]
                });
              }
            }}>
            <Image
              source={
                userProfile?.likedServices.includes(serviceId)
                  ? require("../shared/assets/likedbutton.png")
                  : require("../shared/assets/likebutton.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          backgroundColor: "#F5F5F5"
        }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 24,
          height: "100%"
        }}>
        {service.cover && (
          <Image
            source={{ uri: service.cover }}
            style={{
              marginBottom: 24,
              height: 172,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 16,
              objectFit: "contain"
            }}
          />
        )}

        <Text
          style={{
            fontSize: 20,
            color: "#1A1A1A",
            fontWeight: "bold",
            marginBottom: 16
          }}>
          {service.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#1A1A1A"
          }}>
          {service.comment}
        </Text>

        <View style={{
          gap: 16,
          marginTop: "auto"
        }}>
          {service.links.map(link => (
            <View>
              <Text style={{
                marginBottom: 8,
                fontSize: 17,
                color: "#1A1A1A"
              }}>{link.heading}</Text>
              <TouchableOpacity onPress={() => {
                Linking.openURL(link.url);
              }} style={{
                gap: 10,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                height: 32,
                borderRadius: 12,
                borderColor: service.color,
                borderWidth: 1
              }}>
                <Text style={{
                  color: service.color,
                  fontSize: 12
                }}>{link.url}</Text>
                <Text style={{
                  color: service.color,
                  fontSize: 12
                }}>></Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
