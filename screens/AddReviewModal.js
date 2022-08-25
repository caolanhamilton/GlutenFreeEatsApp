import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import StarRating from "react-native-star-rating-widget";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { postReview } from "../api/apiCalls";
import { AuthContext } from "../Context";
import { Dimensions } from "react-native";

export default function AddReviewModal({
  restaurant,
  isModalVisible,
  setModalVisible,
  setReviews,
  reviews,
}) {
  const [overAllRating, setOverallRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewObj, setReviewObj] = useState({});
  const { user } = useContext(AuthContext);
  const deviceHeight = Dimensions.get("screen").height;

  return (
    <View className={"flex-1"}>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        onBackdropPress={() => setModalVisible(false)}
        scrollHorizontal={true}
        style={{ margin: 0, marginTop: 200 }}
        useNativeDriver={false}
        propagateSwipe={true}
        statusBarTranslucent
      >
        <View className="flex-1 rounded-t-3xl  bg-purple-800">
          <View className="items-center">
            <View className="bg-purple-300 rounded-lg h-1.5 mt-2 w-32"></View>
          </View>
          <View className="flex-row p-2 pt-4 items-center justify-center">
            <MaterialIcons name="add-comment" size={32} color="white" />
            <Text className="text-3xl font-bold color-white pl-1">
              Add a review
            </Text>
          </View>
          <View>
            {/* Review */}
            <ScrollView className="border-2 border-purple-400 rounded-xl bg-white px-4 pt-2 mx-4 my-4">
              <Text className="text-lg font-bold mb-1">
                Leave a review of {restaurant.name}
              </Text>
              <StarRating
                rating={overAllRating}
                onChange={setOverallRating}
                color="#6b21a8"
                starSize={30}
                starStyle={{}}
              ></StarRating>
              <TextInput
                className="bg-gray-50 m-1 p-2 rounded-xl"
                multiline={true}
                fontSize={16}
                onChangeText={(text) => setReviewText(text)}
                placeholder="Describe your experience"
                returnKeyType="done"
                blurOnSubmit={true}
              ></TextInput>
              <View className="self-end flex-row items-center">
                {reviewText.length < 20 && (
                  <Text className="self-center color-gray-400 p-1">
                    {20 - reviewText.length} more characters
                  </Text>
                )}
                {reviewText.length >= 20 ? (
                  <Ionicons
                    name="checkmark-circle-sharp"
                    size={24}
                    color="#86efac"
                  />
                ) : (
                  <Entypo name="circle-with-cross" size={24} color="#f87171" />
                )}
              </View>
            </ScrollView>
            {/* How careful with cross-contamination? */}
            {!restaurant.dedicatedGlutenFree && (
              <View className=" border-2 border-purple-400 mx-2 rounded-xl bg-white px-4 py-2 m-4 mb-4">
                <Text className="text-lg font-bold pb-1">
                  How careful is {restaurant.name} in handling cross
                  contamination?
                </Text>
                <StarRating
                  rating={safetyRating}
                  onChange={setSafetyRating}
                  color="#6b21a8"
                  starSize={30}
                  starStyle={{}}
                ></StarRating>
              </View>
            )}
            {/* Submit review */}
            {reviewText.length > 20 && (
              <TouchableOpacity
                className={`bg-white border-2 border-purple-400 p-2 mb-6 w-40 self-center rounded-3xl`}
                onPress={() => {
                  reviewObj["locationId"] = restaurant.id;
                  reviewObj["dedicatedGlutenFree"] =
                    restaurant.dedicatedGlutenFree;
                  reviewObj["safetyRating"] = restaurant.dedicatedGlutenFree
                    ? 5
                    : safetyRating;
                  reviewObj["overallRating"] = overAllRating;
                  reviewObj["reviewText"] = reviewText;
                  reviewObj["userId"] = user.uid;
                  postReview(reviewObj).then(() => {
                    setReviews([...reviews, reviewObj]);
                    setModalVisible(false);
                  });
                }}
              >
                <Text className="font-bold text-base text-center">Post</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
