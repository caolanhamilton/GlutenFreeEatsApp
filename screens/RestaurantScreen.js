import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_KEY } from "@env";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { getReviewsById } from "../api/apiCalls";
import ReviewCard from "../components/ReviewCard";
import AddReviewModal from "./AddReviewModal";
import FavouriteBtn from "../components/FavouriteBtn";
import { AuthContext } from "../Context";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

export default function RestaurantScreen(params) {
  const restaurant = params.route.params.restaurant;
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "Add a new location",
    });
  });
  useEffect(() => {
    getReviewsById(restaurant.id).then((response) => {
      setReviews(response.data);
      setReviewsLoading(false);
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
            <Text className="text-3xl font-extrabold mt-2 ml-4 pt-2 color-purple-800">
              {restaurant.name}
            </Text>
            {/* Address */}
            <View className="p-4 pt-1">
              <TouchableOpacity
                onPress={() => {
                  const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
                  Linking.openURL(
                    `${scheme}$0,0?q=${restaurant.name} ${restaurant.address}`
                  );
                }}
              >
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
                <FavouriteBtn
                  locationId={restaurant.id}
                  restaurant={restaurant}
                />
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
        <View
          className="bg-purple-800 h-15.5 rounded-md m-2 flex-row flex-wrap items-center justify-center pb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
            elevation: 5,
          }}
        >
          <Text className="text-xl text-white  italic py-2 px-3">
            {restaurant.description}
          </Text>
          <View className="flex-row pl-2 items-center">
            <MaterialCommunityIcons name="star" size={24} color="white" />
            <Text className="color-white text-base font-bold pr-4">
              {restaurant.avgRating?.toFixed(1)} average rating
            </Text>
          </View>
          <View className="flex-row pl-2 items-center">
            <MaterialCommunityIcons
              name="map-marker-multiple"
              size={22}
              color="white"
            />
            <Text className="color-white text-base pr-4 font-bold">
              {restaurant.distance?.toFixed(0)} miles away
            </Text>
          </View>
          <View className="flex-row pl-2 items-center">
            <MaterialIcons name="security" size={20} color="white" />
            <Text className="color-white text-base pr-4 font-bold">
              {restaurant.avgSafetyRating?.toFixed(1)} safety score
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
          {reviewsLoading ? (
            <View className="m-4 rounded-lg">
              {Array.apply(null, { length: 3 }).map((e, index) => (
                <View key={index}>
                  <Skeleton
                    show={true}
                    colors={["#f3e8ff", "#e9d5ff", "#faf5ff"]}
                    height={80}
                    width={"100%"}
                  ></Skeleton>
                  <Spacer height={8}></Spacer>
                </View>
              ))}
            </View>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </View>

        <View className="self-end flex-row items-center"></View>

        <TouchableOpacity
          className="rounded-full  absolute bottom left-4 top-12 p-2 h-12 w-12 items-center justify-center bg-purple-800"
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 6,
          }}
        >
          <Ionicons name="ios-arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <View>
        <TouchableOpacity
          className={
            "absolute bottom-4 right-4 bg rounded-full p-3 drop-shadow-2xl" +
            (user ? " bg-purple-800" : " bg-gray-400")
          }
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 1,
          }}
          onPress={() => {
            if (user) {
              setModalVisible(true);
            } else {
              Alert.alert(
                "Account required",
                "Please log in to leave a review",
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
          <MaterialIcons name="add-comment" size={32} color="white" />
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
