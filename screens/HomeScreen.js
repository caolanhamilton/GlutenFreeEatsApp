import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GooglePlacesSearch from "../components/GooglePlacesSearch";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AdjustmentsIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import ClosestRow from "../components/ClosestRow";
import CeliacRow from "../components/CeliacRow";

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const closeRestaurantList = [
    {
      id: 1,
      categoryId: 5,
      name: "Pizza Hut",
      address: "123 Main St",
      distance: "1.2km",
      category: "Italian",
      rating: 4.5,
      price: "$",
      image:
        "https://assets.manchesterarndale.com/app/uploads/2020/07/Pizza-Hut.jpg",
    },
    {
      id: 2,
      categoryId: 5,
      name: "Piccolino",
      address: "453 Fake St",
      distance: "1.2km",
      category: "Italian",
      rating: 4.2,
      price: "$$",
      image:
        "https://confidentialguides-com.s3.eu-west-1.amazonaws.com/app/uploads/2018/09/20170607-San-Carlo-Cicchetti-New-Menu-14-660x500.jpg",
    },
    {
      id: 3,
      categoryId: 2,
      name: "Wagamama",
      address: "Unit 4, Parswood Road",
      distance: "3.2km",
      category: "Asian",
      rating: 4.2,
      price: "$$",
      image:
        "https://www.bighospitality.co.uk/var/wrbm_gb_hospitality/storage/images/_aliases/wrbm_large/8/0/5/7/1897508-1-eng-GB/Wagamama-launches-first-restaurant-in-Italy.jpg",
    },
    {
      id: 4,
      categoryId: 2,
      name: "Pho",
      address: "23, Exchange Square",
      distance: "5",
      category: "Asian",
      rating: 4.2,
      price: "$$",
      image:
        "https://i.pinimg.com/736x/55/12/f8/5512f8474406389e1ac53fb38e714810--pho-manchester.jpg",
    },
  ];

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <View className="flex-1 flex-row">
          <Text className="font-extrabold text-xl color-purple-800">
            Gluten Free Eats
          </Text>
        </View>
        <View className="flex-row justify-end">
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={35}
            color="#6b21a8"
          />
          <MaterialCommunityIcons
            name="heart-multiple"
            size={35}
            color="#6b21a8"
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* SearchBar */}
        <View className="flex-row items-center space-x-2 pb-2 px-3">
          <View className="flex-row space-x-2 flex-1 flex items-center justify-center">
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color="#6b21a8"
              padding={10}
            />
            <GooglePlacesSearch></GooglePlacesSearch>
            <MaterialCommunityIcons
              name="tune-vertical"
              size={30}
              color="#6b21a8"
            />
          </View>
        </View>
        {/* Categories */}
        <Categories></Categories>
        {/* Closest Restaurants Rows */}
        <ClosestRow closeRestaurantList={closeRestaurantList}></ClosestRow>
        {/* Sorted for celiacs */}
        <CeliacRow closeRestaurantList={closeRestaurantList}></CeliacRow>
      </ScrollView>
    </SafeAreaView>
  );
}
