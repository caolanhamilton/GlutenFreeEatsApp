import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import RestaurantCardHorizontal from "../components/RestaurantCardHorizontal";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFavourites } from "../api/apiCalls";


export default function VerticalRestaurantsList(params) {
  const listTitle = params.route.params.listTitle;
  const listSubtitle = params.route.params.listSubtitle;
  const lat = params.route.params.lat;
  const long = params.route.params.long;
  const radius = params.route.params.radius;
  const [restaurantList, setRestaurantList] = useState(
    params.route.params.restaurantList
  );

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
          <Text className="text-[20px] pt-5 color-gray-500">
            Sorry you have no favourites yet, click the heart icon on a
            restaurant's infomation page to add it to your favourites.
          </Text>
        </View>
      )}
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 66 }}
      >
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
