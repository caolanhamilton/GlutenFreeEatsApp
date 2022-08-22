import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import GooglePlacesSearch from "../components/GooglePlacesSearch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import RestaurantsRow from "../components/HorizontalRestaurantRow.js";
import { getLocations } from "../api/apiCalls";
import * as Location from "expo-location";
import { GOOGLE_MAPS_KEY } from "@env";
import RadiusModal from "./RadiusModal";
import { AuthContext } from "../Context";




export default function HomeScreen() {
  const navigation = useNavigation();
  const [closeRestaurantList, setCloseRestaurantList] = useState([]);
  const [dedicatedRestaurantList, setDedicatedRestaurantList] = useState([]);
  const [sortBySafetyList, setSortBySafetyList] = useState([]);
  const [topReviewsList, setTopReviewsList] = useState([]);
  const [location, setLocation] = useState({
    coords: { latitude: 51.5072, longitude: 0.1276 },
  });
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("London");
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationBtnClicked, setLocationBtnClicked] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [radius, setRadius] = useState(100);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [dedicatedGfLoading, setDedicatedGfLoading] = useState(true);
  const { user, userLocations } = useContext(AuthContext);


  Location.setGoogleApiKey(GOOGLE_MAPS_KEY);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    Location.reverseGeocodeAsync(location.coords, {
      useGoogleMaps: true,
    }).then((res) => {
      const filteredResults = res.filter(
        (result) => result.street && result.subregion
      );
      setLocationName(
        `${filteredResults[0].street}, ${filteredResults[0].subregion}`
      );
    });
  }, [location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getLocations(
      { lat: location.coords.latitude, lng: location.coords.longitude },
      false,
      false,
      radius
    ).then((response) => {
      setCloseRestaurantList(response.data);
      setSortBySafetyList(
        [...response.data]
          .sort((a, b) => b.avgSafetyRating - a.avgSafetyRating)
          .filter(
            (restaurant) =>
              restaurant.avgSafetyRating > 3 &&
              restaurant.dedicatedGlutenFree === false
          )
      );
      setTopReviewsList(
        [...response.data].sort((a, b) => b.avgRating - a.avgRating)
      );
      setLocationsLoading(false);
    });
    getLocations(
      { lat: location.coords.latitude, lng: location.coords.longitude },
      "dedicatedGlutenFree",
      false,
      radius
    ).then((response) => {
      setDedicatedRestaurantList(response.data);
      setDedicatedGfLoading(false);
    });
  }, [location, radius, userLocations]);

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      <View className="flex-row items-center mx-4 space-x-2 mt-1">
        <View className="flex-1 flex-row">
          <Text className="font-extrabold text-2xl color-purple-800">
            Gluten Free Eats
          </Text>
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginReg");
            }}
          >
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={35}
              color="#6b21a8"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (user) {
                navigation.navigate("VerticalRestaurants", {
                  passedRestaurantList: false,
                  listTitle: "Favourites",
                  listSubtitle: "Spots you've saved",
                  lat: location.coords.latitude,
                  long: location.coords.longitude,
                  radius: radius,
                });
              } else {
                Alert.alert(
                  "Account required",
                  "Please log in to view favourites",
                  [
                    ,
                    {
                      text: "Login or create account",
                      onPress: () => {
                        navigation.navigate("LoginReg");
                      },
                    },
                    { text: "Maybe later" },
                  ]
                );
              }
            }}
          >
            <MaterialCommunityIcons
              name="heart-multiple"
              size={35}
              color={user ? "#6b21a8" : "#9ca3af"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center ml-4 space-x-0 pb-3">
        <Ionicons name="location-outline" size={20} color="#6b7280" />
        <Text className="text-gray-500 pr-2">{locationName}</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* SearchBar */}
        <View className="flex-row items-center space-x-2 pb-2 px-3">
          <View className="flex-row space-x-0 flex-1 flex">
            <View className="justify-center h-11">
              <MaterialCommunityIcons
                name="magnify"
                size={30}
                color="#6b21a8"
                padding={10}
              />
            </View>
            <GooglePlacesSearch
              setLocation={setLocation}
              setLocationName={setLocationName}
            ></GooglePlacesSearch>
            <View className="flex-row h-11 items-center pb-1">
              <TouchableOpacity
                onPress={() => {
                  if (userLocation) {
                    setLocation(userLocation);
                  }
                  setLocationBtnClicked(locationBtnClicked + 1);
                }}
              >
                <MaterialIcons name="my-location" size={28} color="#6b21a8" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={30}
                  color="#6b21a8"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Categories */}
        {/* <Categories></Categories> */}
        {/* Closest Restaurants Rows */}
        <RestaurantsRow
          restaurantList={closeRestaurantList}
          listTitle="Closest Restaurants"
          listSubtitle="Spots near you"
          listLoading={locationsLoading}
          setListLoading={setLocationsLoading}
        ></RestaurantsRow>
        {/* Dedicated Restaurants Rows */}
        <RestaurantsRow
          restaurantList={dedicatedRestaurantList}
          listTitle="Dedicated gluten free spots"
          listSubtitle="Places reported to be 100% gluten free"
          listLoading={dedicatedGfLoading}
          setListLoading={setDedicatedGfLoading}
        ></RestaurantsRow>
        {/* Sorted by safety row */}
        <RestaurantsRow
          restaurantList={sortBySafetyList}
          listTitle="Sorted by safety score"
          listSubtitle="Serve gluten but with a high safety score"
          listLoading={locationsLoading}
          setListLoading={setLocationsLoading}
        ></RestaurantsRow>
        {/* Sorted by safety row */}
        <RestaurantsRow
          restaurantList={topReviewsList}
          listTitle="Top rated spots"
          listSubtitle="Spots with the highest average rating"
          listLoading={locationsLoading}
          setListLoading={setLocationsLoading}
        ></RestaurantsRow>
      </ScrollView>
      <TouchableOpacity
        className={
          "absolute bottom-24 right-4 bg rounded-full p-2 drop-shadow-2xl" +
          (user ? " bg-purple-800" : " bg-gray-400")
        }
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 7,
        }}
        onPress={() => {
          if (user) {
            navigation.navigate("AddRestaurant");
          } else {
            Alert.alert(
              "Account required",
              "Please log in to add a restaurant",
              [
                ,
                {
                  text: "Login or create account",
                  onPress: () => {
                    navigation.navigate("LoginReg");
                  },
                },
                { text: "Maybe later" },
              ]
            );
          }
        }}
      >
        <MaterialIcons name="add-location-alt" size={36} color="white" />
      </TouchableOpacity>
      <RadiusModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        radius={radius}
        setRadius={setRadius}
      ></RadiusModal>
    </SafeAreaView>
  );
}
