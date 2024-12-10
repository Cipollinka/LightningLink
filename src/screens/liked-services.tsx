import { FlatList, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./index.tsx";
import { ScreenNames } from "../shared/use-react-navigation.ts";
import { useUserStateProfile } from "../user";

export const LikedServices = () => {
  const { goBack, navigate } =
    useNavigation<
      NavigationProp<RootStackParamList, ScreenNames.ServicesSearch>
    >();

  const { userProfile, setUserProfile } = useUserStateProfile();

  const services = userProfile?.services || [];

  const result =services.filter(
    service => userProfile?.likedServices.includes(service.id)
  )

  const likedServices = userProfile?.likedServices || [];
  const searchResultEmpty = result.length === 0;
  const openLink = (url: string) => {
    Linking.openURL(url);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5"
      }}>
      <View
        style={{
          height: 76,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#EDECEC"
        }}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require("../shared/assets/backbutton.png")} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            color: "#1A1A1A",
            fontFamily: "SF-Pro-Display-Bold"
          }}>
          Liked notes
        </Text>
      </View>
      {!searchResultEmpty && (
        <ScrollView
          contentContainerStyle={{
            position: "relative",
            paddingTop: 13,
            height: "100%",
            paddingHorizontal: 20,
            gap: 20
          }}
        >
          <FlatList
            data={result || []}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigate(ScreenNames.Service, {
                    serviceId: item.id
                  });
                }}
                style={{
                  flex: 1,
                  flexShrink: 1,
                  margin: 4,
                  borderRadius: 20,
                  padding: 16,
                  backgroundColor: item.color
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}>
                  <View
                    style={{
                      flex: 1
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "white",
                        marginBottom: 6,
                        fontFamily: "SF-Pro-Display-Bold"
                      }}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 15,
                        fontFamily: "SF-Pro-Display-Regular",
                        color: "white"
                      }}
                      numberOfLines={1}>
                      {item.comment}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      if (!userProfile) {
                        return;
                      }
                      if (likedServices.includes(item.id)) {
                        setUserProfile({
                          ...userProfile,
                          likedServices: likedServices.filter(
                            id => id !== item.id
                          )
                        });
                      } else {
                        setUserProfile({
                          ...userProfile,
                          likedServices: [...likedServices, item.id]
                        });
                      }
                    }}>
                    <Image
                      source={
                        likedServices.includes(item.id)
                          ? require("../shared/assets/likedwhite.png")
                          : require("../shared/assets/notliked.png")
                      }
                    />
                  </TouchableOpacity>
                </View>

                {item.cover && <Image style={{
                  width: "100%",
                  height: 88,
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginTop: 16
                }} source={{
                  uri: item.cover
                }} />}
                {!item.cover && <View style={{
                  height: 88,
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginTop: 16,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Text style={{
                    color: item.color,
                    fontSize: 12,
                    fontFamily: "SF-Pro-Display-Regular"
                  }}> Cover is empty</Text>
                </View>}
                <View style={{
                  marginTop: 16,
                  gap: 4
                }}>
                  {item.links.map(link => (
                    <TouchableOpacity onPress={() => {
                      openLink(link.url);
                    }} style={{
                      borderRadius: 12,
                      backgroundColor: "white",
                      padding: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 4
                    }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          color: item.color,
                          fontSize: 12,
                          fontFamily: "SF-Pro-Display-Regular"
                        }}>
                        {link.url}
                      </Text>
                      <Text style={{
                        color: item.color,
                        fontSize: 12
                      }}>></Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
      {searchResultEmpty && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 31
          }}>
          <Text
            style={{
              width: 197,
              textAlign: "center",
              fontSize: 20,
              color: "#1A1A1A",
              fontFamily: "SF-Pro-Display-Regular"
            }}>
            There aren’t any result for your search, try to create something
          </Text>

          <TouchableOpacity>
            <Image source={require("../shared/assets/addbutton.png")} />
          </TouchableOpacity>

          <Image
            source={require("../shared/assets/lightsecond.png")}
            style={{
              position: "absolute",
              top: 0,
              right: -10
            }}
          />

          <Image
            source={require("../shared/assets/light.png")}
            style={{
              position: "absolute",
              bottom: 0,
              left: -10
            }}
          />
        </View>
      )}
    </View>
  );
};
