import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
export default function RestaurantsRow({
  restaurantList,
  listTitle,
  listSubtitle,
  listLoading,
  setListLoading,
}) {
  const navigation = useNavigation();
  const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />;

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
        {listLoading ? (
          <>
            {Array.apply(null, { length: 2 }).map((e, index) => (
              <View className="pr-2 w-72" key={index}>
                <Skeleton
                  show={true}
                  colors={["#f3e8ff", "#e9d5ff", "#faf5ff"]}
                >
                  <View className="h-56 rounded"></View>
                </Skeleton>
                <Spacer height={4}></Spacer>
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
          </>
        ) : (
          restaurantList.map((restaurant) => {
            return (
              <RestaurantCard
                restaurant={restaurant}
                key={restaurant.id}
                listLoading={listLoading}
                setListLoading={setListLoading}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
