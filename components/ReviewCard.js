import { View, Text } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function ReviewCard({ review }) {
  return (
    <View className="bg-gray-200 mx-4 my-1 p-2 rounded-lg">
      <View className="flex-row items-center">
        <MaterialCommunityIcons name="star" size={24} color="#6b21a8" />
        <Text className="py-1 pr-2">{review.overallRating?.toFixed(1)}</Text>
        <MaterialIcons name="security" size={20} color="#6b21a8" />
        <Text>{review.safetyRating?.toFixed(1)}</Text>
      </View>
      <Text className="text-[16px]">{review.reviewText}</Text>
      <Text className="text-right text-xs right-1">by username</Text>
    </View>
  );
}
