import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../Context";

export default function ReviewCard({ review }) {
  const { user } = useContext(AuthContext);
  return (
    <View className="bg-gray-200 mx-4 my-1 p-2 rounded-lg">
      <View className="flex-row items-center">
        <MaterialCommunityIcons name="star" size={24} color="#6b21a8" />
        <Text className="py-1 pr-2">{review.overallRating?.toFixed(1)}</Text>
        <MaterialIcons name="security" size={20} color="#6b21a8" />
        <Text>{review.safetyRating?.toFixed(1)}</Text>
      </View>
      <Text className="text-[16px]">{review.reviewText}</Text>
      <Text className="text-right text-xs right-1">
        Posted by
        {review.userId === user.uid
          ? " you."
          : review.userFirstName + " " + review.userLastName[0]}
      </Text>
    </View>
  );
}
