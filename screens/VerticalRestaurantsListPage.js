import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import RestaurantCardHorizontal from "../components/RestaurantCardHorizontal";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFavourites } from "../api/apiCalls";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export default function VerticalRestaurantsList({
  route: {
    params: {
      listSubtitle,
      listTitle,
      lat,
      long,
      radius,
      passedRestaurantList,
    },
  },
}) {
  const [restaurantList, setRestaurantList] = useState(passedRestaurantList);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const Spacer = ({ height = 8 }) =>
  <MotiView style={{ height }} />;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    if (listTitle === "Favourites") {
      getFavourites(lat, long, radius).then(({ data }) => {
        setRestaurantList(data);
        setLoadingFavs(false);
      });
    }
  }, [navigation.isFocused()]);

  const isFocused = useIsFocused();

  return (
    <SafeAreaView className="bg-white flex-1">
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
            {listTitle} {isFocused}
          </Text>
          <Text className="text-l font-bold color-gray-500">
            {listSubtitle}
          </Text>
        </View>
      </View>
      {restaurantList.length === 0 && (
        <View className="pt-10 p-8 flex items-center justify-center">
          <MaterialCommunityIcons
            name="heart-outline"
            size={70}
            color={"#9ca3af"}
          />
          {listTitle === "Favourites" ? (
            <Text className="text-[20px] pt-5 color-gray-500">
              Sorry you have no favourites yet, click the heart icon on a
              restaurant's information page to add it to your favourites.
            </Text>
          ) : (
            <Text className="text-[20px] pt-5 color-gray-500">
              Sorry there are no restaurants within the set radius. You can try
              adjusting the search radius or changing the location on the home
              screen.
            </Text>
          )}
        </View>
      )}
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 66 }}
      >
        {listTitle === "Favourites" && loadingFavs && (
          <View className="mt-2 mx-2 mb-2 ">
            {Array.apply(null, { length: 3 }).map((e, index) => (
              <View className="mb-2" key={index}>
                <Skeleton
                  show={true}
                  colors={["#f3e8ff", "#e9d5ff", "#faf5ff"]}
                >
                  <View className="h-60 w-screen rounded-t-xl"></View>
                </Skeleton>
                <Spacer height={8}></Spacer>
                <Skeleton
                  show={true}
                  width="70%"
                  height={20}
                  colors={["#f3e8ff", "#e9d5ff", "#faf5ff"]}
                ></Skeleton>
                <Spacer height={4}></Spacer>
                <Skeleton
                  show={true}
                  width="60%"
                  height={20}
                  colors={["#f3e8ff", "#e9d5ff", "#faf5ff"]}
                ></Skeleton>
              </View>
            ))}
          </View>
        )}

        {restaurantList?.length > 0 &&
          restaurantList.map((restaurant) => {
            return (
              <RestaurantCardHorizontal
                restaurant={restaurant}
                key={restaurant.id}
                favourites={true}
                setRestaurantList={setRestaurantList}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
