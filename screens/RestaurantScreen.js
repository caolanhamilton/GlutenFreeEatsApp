import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_KEY } from "@env";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { getReviewsById, postReview } from "../api/apiCalls";
import ReviewCard from "../components/ReviewCard";
import AddReviewModal from "./AddReviewModal";

export default function RestaurantScreen(params) {
  const restaurant = params.route.params.restaurant;
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "Add a new location",
    });
  });
  useEffect(() => {
    getReviewsById(restaurant.id).then((response) => {
      setReviews(response.data);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <Image
          className="h-60 w-full"
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${restaurant.image}&key=${GOOGLE_MAPS_KEY}`,
          }}
        ></Image>
        {/* Address & nav/fav button */}
        <View className="flex-row w-full">
          <View className="w-2/3">
            <Text className="text-xl font-bold mt-2 ml-4 pt-2 color-purple-800">
              {restaurant.name}
            </Text>
            {/* Address */}
            <View className="p-4 pt-1">
              <TouchableOpacity onPress={() => {
                const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
                Linking.openURL(
                  `${scheme}$0,0?q=${restaurant.name} ${restaurant.address}`
                )
              }}>
                <Text className="text-lg">{restaurant.address}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{${restaurant.phone}}`);
                }}
              >
                <Text className="text-lg color-purple-800">
                  {restaurant.phone}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-1/3 justify-center">
            <View className="self-center">
              <View className="flex-col">
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="heart"
                    size={50}
                    color="#6b21a8"
                  />
                  <Text>Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
                    Linking.openURL(
                      `${scheme}$0,0?q=${restaurant.name} ${restaurant.address}`
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="map"
                    size={50}
                    color="#6b21a8"
                  />
                  <Text>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Features */}
        <View className="bg-purple-800 h-15.5 rounded-md m-2 flex-row flex-wrap items-center justify-center">
          <View className="flex-row pl-2 items-center">
            <MaterialCommunityIcons name="star" size={24} color="white" />
            <Text className="color-white text-base font-bold pr-4">
              {restaurant.avgRating.toFixed(1)} average rating
            </Text>
          </View>
          <View className="flex-row pl-2 items-center">
            <MaterialCommunityIcons
              name="map-marker-multiple"
              size={22}
              color="white"
            />
            <Text className="color-white text-base pr-4 font-bold">
              {restaurant.distance.toFixed(1)} miles away
            </Text>
          </View>
          <View className="flex-row pl-2 items-center">
            <MaterialIcons name="security" size={20} color="white" />
            <Text className="color-white text-base pr-4 font-bold">
              {restaurant.avgSafetyRating.toFixed(1)} safety score
            </Text>
          </View>
          <View className="flex-row items-center">
            {restaurant.dedicatedGlutenFree ? (
              <>
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={22}
                  color="white"
                />
                <Text className="color-white text-base font-bold">
                  Dedicated gluten free
                </Text>
              </>
            ) : null}
          </View>
        </View>
        {/* Reviews */}
        <View>
          <Text className="text-xl font-semibold mt-2 ml-4 pt-2 color-purple-800">
            Reviews
          </Text>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>

        <View className="self-end flex-row items-center"></View>

        <TouchableOpacity
          className="rounded-full drop-shadow-lg  absolute bottom left-4 top-12 p-2 bg-purple-800 drop-shadow-2xl"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <View>
        <TouchableOpacity
          className="absolute bottom-4 right-4 bg rounded-full p-2 bg-purple-800 drop-shadow-2xl"
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="add-comment" size={36} color="white" />
        </TouchableOpacity>
      </View>
      <AddReviewModal
        reviews={reviews}
        setReviews={setReviews}
        restaurant={restaurant}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
