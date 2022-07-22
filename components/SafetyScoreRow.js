import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import RestaurantCard from "./RestaurantCard";
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'

export default function DedicatedRow({ dedicatedRestaurantList }) {
  return (
    <View>
      <TouchableOpacity className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">Dedicated gluten free spots</Text>
        <FontAwesome5 name="arrow-right" size={24} color="#6b21a8" />
      </TouchableOpacity>
      <Text className="text-xs text-gray-500 px-4">
        Places reported to be 100% gluten free
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
        {dedicatedRestaurantList.map((restaurant) => {
          return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
        })}
      </ScrollView>
    </View>
  );
}