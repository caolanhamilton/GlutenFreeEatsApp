import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteReview } from "../api/apiCalls";

export default function UserReviews() {
  const { userPostedReviews, setUserPostedReviews } = useContext(AuthContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

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
            Posted reviews
          </Text>
          <Text className="text-l font-bold color-gray-500">
            Remove reviews you've added
          </Text>
        </View>
      </View>
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {userPostedReviews.length === 0 && (
          <View className="pt-10 p-8 flex items-center justify-center">
            <MaterialCommunityIcons
              name="comment-outline"
              size={70}
              color={"#9ca3af"}
            />
            <Text className="text-[20px] pt-5 color-gray-500">
              You have not posted any reviews. You can add reviews when viewing
              a place.
            </Text>
          </View>
        )}

        {userPostedReviews.map((review, index) => {
          return (
            <View
              key={index}
              className="bg-gray-200 mx-4 my-1 p-2 rounded-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1,
                elevation: 1,
              }}
          >
              <View className="flex-row items-center">
                <View className="flex flex-1 flex-row items-center w-1/3">
                  <MaterialCommunityIcons
                    name="star"
                    size={24}
                    color="#6b21a8"
                  />
                  <Text className="py-1 pr-2">
                    {review.overallRating?.toFixed(1)}
                  </Text>
                  <MaterialIcons name="security" size={20} color="#6b21a8" />
                  <Text>{review.safetyRating?.toFixed(1)}</Text>
                </View>
                <TouchableOpacity
                  className="flex-1 w-1/3 flex-row justify-end"
                  onPress={() => {
                    Alert.alert(
                      "Delete",
                      "Are you sure you want to delete this review?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => {},
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          onPress: () => {
                            deleteReview(review.id).then(() => {
                              setUserPostedReviews(
                                userPostedReviews.filter(
                                  (currentReview) =>
                                    currentReview.id !== review.id
                                )
                              );
                            });
                          },
                        },
                      ]
                    );
                  }}
                >
                  <MaterialIcons name="delete" size={36} color="#6b21a8" />
                </TouchableOpacity>
              </View>
              <Text className="text-[16px]">{review.reviewText}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
