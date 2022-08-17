import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { GOOGLE_MAPS_KEY } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteLocation } from "../api/apiCalls";

export default function UserLocations() {
  const { userLocations, setUserLocations } = useContext(AuthContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-row px-6 pb-3 items-center border-b-2 border-slate-100  w-screen">
        <TouchableOpacity
          className="flex items-center justify-center mr-2"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back-outline" size={30} color="#6b21a8" />
        </TouchableOpacity>
        <View>
          <Text className="text-xl pt-1 font-extrabold color-purple-800">
            Posted locations
          </Text>
          <Text className="text-l font-bold color-gray-500">
            Remove places you've added
          </Text>
        </View>
      </View>
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {userLocations.length === 0 && (
          <View className="pt-10 p-8 flex items-center justify-center">
            <MaterialCommunityIcons
              name="heart-outline"
              size={70}
              color={"#9ca3af"}
            />
            <Text className="text-[20px] pt-5 color-gray-500">
              You have not posted any locations. You can add locations from the home screen.
            </Text>
          </View>
        )}
        {userLocations.map((location, index) => {
          return (
            <View
              key={index}
              className="flex m-2 bg-white rounded-xl flex-row h-28   w-screen bg-black/20"
            >
              <ImageBackground
                className="h-full w-full absolute"
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${location.image}&key=${GOOGLE_MAPS_KEY}`,
                }}
                imageStyle={{
                  borderRadius: 12,
                }}
              >
                <View className="flex flex-1 flex-row bg-purple-800/40 rounded-2xl">
                  <View
                    className="flex-1 flex flex-col  pl-6 justify-center"
                    style={{
                      shadowColor: "black",
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 0.6,
                      shadowRadius: 5.0,
                      elevation: 2,
                    }}
                  >
                    <Text className="text-2xl font-extrabold color-white">
                      {location.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="rounded-full p-6 justify-center"
                    onPress={() => {
                      Alert.alert(
                        "Delete",
                        "Are you sure you want to delete this location?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel",
                          },
                          {
                            text: "Delete",
                            onPress: () => {
                              deleteLocation(location.id).then(() => {
                                setUserLocations(
                                  userLocations.filter(
                                    (currentLocation) =>
                                      currentLocation.id !== location.id
                                  )
                                );
                              });
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <MaterialIcons
                      name="delete"
                      size={48}
                      color="white"
                      style={{
                        shadowColor: "purple",
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.6,
                        shadowRadius: 5.0,
                        elevation: 2,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
