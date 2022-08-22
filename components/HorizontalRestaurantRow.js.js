import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function RestaurantsRow({
  restaurantList,
  listTitle,
  listSubtitle,
}) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        className="mt-2 flex-row items-center justify-between px-4"
        onPress={() => {
          navigation.navigate("VerticalRestaurants", {
            passedRestaurantList: restaurantList,
            listTitle,
            listSubtitle,
          });
        }}
      >
        <Text className="font-bold text-lg">{listTitle}</Text>
        <FontAwesome5 name="arrow-right" size={24} color="#6b21a8" />
      </TouchableOpacity>
      <Text className="text-xs text-gray-500 px-4">{listSubtitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        {restaurantList.map((restaurant) => {
          return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
        })}
      </ScrollView>
    </View>
  );
}
