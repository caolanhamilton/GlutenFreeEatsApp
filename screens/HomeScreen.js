import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import GooglePlacesSearch from "../components/GooglePlacesSearch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Categories from "../components/Categories";
import RestaurantsRow from "../components/HorizontalRestaurantRow.js";
import { getLocations,} from "../api/apiCalls";


export default function HomeScreen() {
  const navigation = useNavigation();
  const [closeRestaurantList, setCloseRestaurantList] = useState([]);
  const [dedicatedRestaurantList, setDedicatedRestaurantList] = useState([]);
  const [sortBySafetyList, setSortBySafetyList] = useState([]);
  const [topReviewsList, setTopReviewsList] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getLocations({ lat: 53.483959, lng: -2.2426 }, false).then((response) => {
      setCloseRestaurantList(response.data);
      setSortBySafetyList(
        [...response.data].sort((a, b) => b.avgSafetyRating - a.avgSafetyRating).filter((restaurant) => restaurant.avgSafetyRating > 3 && restaurant.dedicatedGlutenFree === false)
      );
      setTopReviewsList([...response.data].sort((a, b) => b.avgRating - a.avgRating));
    });
    getLocations({ lat: 53.483959, lng: -2.2426 }, 'dedicatedGlutenFree').then((response) => { 
      setDedicatedRestaurantList(response.data);
    })
  }, []);

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <View className="flex-1 flex-row">
          <Text className="font-extrabold text-2xl color-purple-800">
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
        <RestaurantsRow
          restaurantList={closeRestaurantList}
          listTitle="Closest Restaurants"
          listSubtitle="Spots near you"
        ></RestaurantsRow>
        {/* Dedicated Restaurants Rows */}
        <RestaurantsRow
          restaurantList={dedicatedRestaurantList}
          listTitle="Dedicated gluten free spots"
          listSubtitle="Places reported to be 100% gluten free"
        ></RestaurantsRow>
        {/* Sorted by safety row */}
        <RestaurantsRow
          restaurantList={sortBySafetyList}
          listTitle="Sorted by safety score"
          listSubtitle="Serve gluten but with a high safety score"
        ></RestaurantsRow>
        {/* Sorted by safety row */}
        <RestaurantsRow
        restaurantList={topReviewsList} listTitle="Top rated spots" listSubtitle="Spots with the highest average rating"></RestaurantsRow>

      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-20 right-4 bg rounded-full p-2 bg-purple-800 drop-shadow-2xl"
        onPress={() => {
          navigation.navigate("AddRestaurant");
        }}
      >
        <MaterialIcons name="add-location-alt" size={36} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
