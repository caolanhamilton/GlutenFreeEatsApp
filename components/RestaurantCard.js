import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GOOGLE_MAPS_KEY } from "@env";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="pr-2"
      onPress={() => {
        navigation.navigate("RestaurantScreen", { restaurant });
      }}
    >
      <Image
        className="h-56 w-72 rounded"
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${restaurant.image}&key=${GOOGLE_MAPS_KEY}`,
        }}
      />
      <Text className="font-bold text-lg pt-2">{restaurant.name}</Text>
      <View className={"flex-row items-center space-x-1"}>
        <MaterialCommunityIcons name="star" size={24} color="#6b21a8" />
        <Text className="text-gray-500 text-base font-bold">
          {restaurant.avgRating.toFixed(1)}
        </Text>
        <MaterialCommunityIcons
          name="map-marker-multiple"
          size={22}
          color="#6b21a8"
        />
        <Text className="text-gray-500 text-base">
          {restaurant.distance.toFixed(1)} mi
        </Text>
        <MaterialIcons name="security" size={20} color="#6b21a8" />
        <Text className="text-gray-500 text-base">
          {restaurant.avgSafetyRating.toFixed(1)}
        </Text>
        <View className="flex-row">
          {restaurant.dedicatedGlutenFree ? (
            <>
              <Ionicons
                name="checkmark-circle-sharp"
                size={22}
                color="#6b21a8"
              />
              <Text className="text-gray-500 text-base">DGF</Text>
            </>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
