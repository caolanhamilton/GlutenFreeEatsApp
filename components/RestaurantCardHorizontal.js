import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GOOGLE_MAPS_KEY } from "@env";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCardHorizontal({ restaurant }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="border-2 border-slate-100 rounded-xl mt-2 mx-2 mb-2"
      onPress={() => {
        navigation.navigate("RestaurantScreen", { restaurant });
      }}
    >
      <Image
        className="h-60 w-screen rounded-t-xl"
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${restaurant.image}&key=${GOOGLE_MAPS_KEY}`,
        }}
      />
      <View className="pl-2 pb-1">
        <Text className="font-bold text-xl pt-2">{restaurant.name}</Text>
        <View className={"flex-row items-center space-x-1"}>
          <MaterialCommunityIcons name="star" size={30} color="#6b21a8" />
          <Text className="text-gray-500 text-xl font-bold">
            {restaurant.avgRating?.toFixed(1)}
          </Text>
          <MaterialCommunityIcons
            name="map-marker-multiple"
            size={28}
            color="#6b21a8"
          />
          <Text className="text-gray-500 text-xl font-bold">
            {restaurant.distance?.toFixed(1)} mi
          </Text>
          <MaterialIcons name="security" size={26} color="#6b21a8" />
          <Text className="text-gray-500 text-xl font-bold">
            {restaurant.avgSafetyRating?.toFixed(1)}
          </Text>
          <View className="flex-row items-center space-x-1">
            {restaurant.dedicatedGlutenFree ? (
              <>
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={26}
                  color="#6b21a8"
                />
                <Text className="text-gray-500 text-xl font-bold">DGF</Text>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
