import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import RestaurantCardHorizontal from "../components/RestaurantCardHorizontal";
import { Ionicons } from "@expo/vector-icons";

export default function VerticalRestaurantsList(params) {
  const restaurantList = params.route.params.restaurantList;
  const listTitle = params.route.params.listTitle;
  const listSubtitle = params.route.params.listSubtitle;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "Add a new location",
    });
  });
  return (
    <SafeAreaView className="bg-white">
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
            {listTitle}
          </Text>
          <Text className="text-l font-bold color-gray-500">
            {listSubtitle}
          </Text>
        </View>
      </View>
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 66 }}
      >
        {restaurantList.map((restaurant) => {
          return (
            <RestaurantCardHorizontal
              restaurant={restaurant}
              key={restaurant.id}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
