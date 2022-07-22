import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TopRatedRow({ topReviewsList }) {
  return (
    <View>
      <TouchableOpacity className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">Top rated spots</Text>
        <FontAwesome5 name="arrow-right" size={24} color="#6b21a8" />
      </TouchableOpacity>
      <Text className="text-xs text-gray-500 px-4">
        Spots with the highest average rating
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        {topReviewsList.map((restaurant) => {
          return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
        })}
      </ScrollView>
    </View>
  );
}
