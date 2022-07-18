import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RestaurantCard({ restaurant }) {
  return (
    <TouchableOpacity className="pr-2">
      <Image className="h-56 w-72 rounded" source={{ uri: restaurant.image }} />
      <Text className="font-bold text-lg pt-2">{restaurant.name}</Text>
      <View className={"flex-row items-center space-x-1"}>
        <MaterialCommunityIcons name="star" size={24} color="#6b21a8" />
        <Text className="text-gray-500 text-base font-bold">
          {restaurant.rating}
        </Text>
        <Text className="text-gray-500 text-base">
          {restaurant.category}
          {" ·"}
        </Text>
        <Text className="text-gray-500 text-base">{restaurant.distance}</Text>
      </View>
    </TouchableOpacity>
  );
}
