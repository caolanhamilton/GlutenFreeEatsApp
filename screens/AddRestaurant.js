import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import React, { useLayoutEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import StarRating from "react-native-star-rating-widget";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createLocation, postReview } from "../api/apiCalls";
import { AuthContext } from "../Context";

export default function AddRestaurant({}) {
  const navigation = useNavigation();
  const [selectedGooglePlace, setSelectedGooglePlace] = useState(null);
  const [overAllRating, setOverallRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [description, setDescription] = useState("");
  const [dedicatedGlutenFree, setDedicatedGlutenFree] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { user, setUserLocations, userLocations } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "Add a new location",
    });
  });
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={"handled"}
      listViewDisplayed={false}
      contentContainerStyle={{ backgroundColor: "white", flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        listViewDisplayed={false}
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <View className="h-60">
          {!selectedGooglePlace ? (
            <View className="flex justify-end pb-2 pl-2 h-full">
              <View className="items-center pr-2">
                <MaterialIcons
                  name="add-location-alt"
                  size={80}
                  color="#6b21a8"
                />
              </View>
              <Text className="text-3xl font-bold mt-2 ml-4 pt-2 color-purple-800">
                Add a gluten-free spot
              </Text>
              <Text className="text-l font-bold ml-4 color-gray-500 mb-2">
                Type the name of a cafe or restaurant
              </Text>
            </View>
          ) : (
            <View className="bg-purple-200 h-60">
              <Image
                className="h-60 w-full"
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${selectedGooglePlace.image}&key=${GOOGLE_MAPS_KEY}`,
                }}
              ></Image>
            </View>
          )}
        </View>
        <View>
          <View className="flex-row w-full px-2 mr-2 self-center py-2">
            <View className="justify-center h-11">
              <MaterialIcons
                name="search"
                size={30}
                color="#6b21a8"
              ></MaterialIcons>
            </View>
            <View className="flex-1 pr-6">
              <GooglePlacesAutocomplete
                className="h1 w1"
                placeholder="Search for a restaurant or cafe"
                fetchDetails={true}
                query={{
                  key: GOOGLE_MAPS_KEY,
                  language: "en",
                  components: "country:gb",
                  types: "food|bar|cafe|restaurant|bakery",
                }}
                onPress={(data, details = null) => {
                  setSelectedGooglePlace({
                    name: details.name,
                    address: details.formatted_address,
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng,
                    phone: details.international_phone_number,
                    image: details.photos[0].photo_reference,
                  });
                }}
                styles={{
                  textInputContainer: {
                    marginBottom: 0,
                    borderRadius: 10,
                    width: "100%",
                    alignSelf: "center",
                  },
                  listView: {
                    alignSelf: "center",
                    borderRadius: 15,
                    width: "100%",
                    backgroundColor: "#fafafa",
                  },
                  row: {
                    backgroundColor: "#fafafa",
                  },
                  poweredContainer: {
                    backgroundColor: "#fafafa",
                  },
                  textInput: {
                    height: 45,
                    borderRadius: 40,
                    color: "#6b7280",
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                  },
                }}
              ></GooglePlacesAutocomplete>
            </View>
          </View>
          <>
            {/* Location basic info */}
            {selectedGooglePlace && (
              <View className="mx-4 rounded-xl p-2 my-2 bg-gray-50">
                <Text className="text-2xl text-purple-800 font-semibold">
                  {selectedGooglePlace.name}
                </Text>
                <Text className="text-lg">{selectedGooglePlace.address}</Text>
                {selectedGooglePlace.phone && (
                  <Text className="text-lg">{selectedGooglePlace.phone}</Text>
                )}

                <View className="self-end flex-row items-center">
                  <TouchableOpacity
                    className={`border-solid border-2 border-green-300 ${
                      addressConfirmed ? " border-red-400" : "bg-green-200"
                    } p-3 m-1 rounded-3xl`}
                    onPress={() => {
                      if (addressConfirmed) {
                        setAddressConfirmed(false);
                        setSelectedGooglePlace(null);
                      } else {
                        setAddressConfirmed(true);
                      }
                    }}
                  >
                    <Text>{addressConfirmed ? "Change" : "Confirm"}</Text>
                  </TouchableOpacity>
                  <View className="mx-1">
                    {addressConfirmed ? (
                      <Ionicons
                        name="checkmark-circle-sharp"
                        size={30}
                        color="#86efac"
                      />
                    ) : (
                      <Entypo
                        name="circle-with-cross"
                        size={30}
                        color="#f87171"
                      />
                    )}
                  </View>
                </View>
              </View>
            )}

            {/* Add description of this location */}
            {addressConfirmed && (
              <View>
                <View className="mx-4 rounded-xl bg-google p-2 my-2 bg-gray-50">
                  <Text className="text-lg font-semibold">
                    Add a description of {selectedGooglePlace.name}
                  </Text>
                  <TextInput
                    className="bg-white m-1 mx-2 p-2 rounded-xl"
                    multiline={true}
                    fontSize={16}
                    onChangeText={(text) => setDescription(text)}
                    returnKeyType="done"
                    blurOnSubmit={true}
                  ></TextInput>
                  <View className="self-end flex-row items-center mx-1">
                    {description.length < 20 && (
                      <Text className="self-center color-gray-400 p-1">
                        {20 - description.length} more characters
                      </Text>
                    )}
                    {description.length >= 20 ? (
                      <Ionicons
                        name="checkmark-circle-sharp"
                        size={30}
                        color="#86efac"
                      />
                    ) : (
                      <Entypo
                        name="circle-with-cross"
                        size={30}
                        color="#f87171"
                      />
                    )}
                  </View>
                </View>

                {/* Review */}
                <View className="mx-4 rounded-xl  bg-gray-50 p-2 my-2">
                  <Text className="text-lg font-semibold mb-1">
                    Leave a review of {selectedGooglePlace.name}
                  </Text>
                  <StarRating
                    rating={overAllRating}
                    onChange={setOverallRating}
                    color="#6b21a8"
                    starSize={30}
                    starStyle={{}}
                  ></StarRating>
                  <TextInput
                    className="bg-white m-1 mx-2 p-2 rounded-xl"
                    multiline={true}
                    fontSize={16}
                    onChangeText={(text) => setReviewText(text)}
                    placeholder="Describe your experience"
                    returnKeyType="done"
                    blurOnSubmit={true}
                  ></TextInput>
                  <View className="self-end flex-row items-center mx-1">
                    {reviewText.length < 20 && (
                      <Text className="self-center color-gray-400 p-1">
                        {20 - reviewText.length} more characters
                      </Text>
                    )}
                    {reviewText.length >= 20 ? (
                      <Ionicons
                        name="checkmark-circle-sharp"
                        size={30}
                        color="#86efac"
                      />
                    ) : (
                      <Entypo
                        name="circle-with-cross"
                        size={30}
                        color="#f87171"
                      />
                    )}
                  </View>
                </View>

                {/* Dedicated gluten free */}
                <View className="mx-4 rounded-xl  bg-gray-50 p-2 my-2">
                  <Text className="text-lg font-semibold">
                    Is {selectedGooglePlace.name} dedicated gluten-free?
                  </Text>
                  <View className="flex-row">
                    <TouchableOpacity
                      className={`bg-white border-2 border-green-300 p-3 m-1 self-start rounded-3xl ${
                        dedicatedGlutenFree ? "bg-green-200" : " bg-gray-50"
                      }`}
                      onPress={() => {
                        setDedicatedGlutenFree(true);
                        setSafetyRating(5);
                      }}
                    >
                      <Text>Yes, 100% GF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`bg-white border-2 border-red-400 p-3 m-1 self-start rounded-3xl ${
                        !dedicatedGlutenFree ? "bg-red-300" : "bg-white"
                      }`}
                      onPress={() => {
                        setDedicatedGlutenFree(false);
                        setSafetyRating(0);
                      }}
                    >
                      <Text>No, handles gluten</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* How careful with cross-contamination? */}
                {!dedicatedGlutenFree && (
                  <View className="mx-4 rounded-xl bg-gray-50 p-2 my-2 mb-6">
                    <Text className="text-lg font-semibold">
                      How careful is {selectedGooglePlace.name} in handling
                      cross contamination?
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
              </View>
            )}
          </>
        </View>
        <TouchableOpacity
          className="rounded-full absolute bottom left-4 top-12 h-12 w-12 items-center justify-center p-2 bg-purple-800 drop-shadow-2xl"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        {addressConfirmed && description.length > 20 && reviewText.length > 20 && (
          <TouchableOpacity
            className={`bg-white border-2 border-green-300 p-3 mb-6 w-60 self-center rounded-3xl`}
            onPress={() => {
              setModalShow(true);
              selectedGooglePlace["dedicatedGlutenFree"] = dedicatedGlutenFree;
              selectedGooglePlace["description"] = description;
              selectedGooglePlace["userId"] = user.uid;
              createLocation(selectedGooglePlace).then((addedLocation) => {
                const reviewObj = {
                  locationId: addedLocation.data.id,
                  dedicatedGlutenFree: dedicatedGlutenFree,
                  safetyRating: safetyRating,
                  overallRating: overAllRating,
                  reviewText: reviewText,
                };
                postReview(reviewObj).then(() => {
                  setUserLocations([...userLocations, selectedGooglePlace]);
                });
              });
            }}
          >
            <Text className="font-bold text-base text-center">
              Add this location
            </Text>
          </TouchableOpacity>
        )}
        <Modal animationType={"slide"} transparent={true} visible={modalShow}>
          <View className="mt-80 rounded-t-3xl flex-1 items-center border-solid border-6 justify-center bg-purple-800">
            <Text className="text-3xl color-white font-bold pb-2">
              Thanks for your contribution!
            </Text>
            <Text className="text-xl color-white">
              It's been added to the app 🎉
            </Text>
            <TouchableOpacity
              className="m-6 h-28 w-28 items-center justify-center bg-white rounded-full p-4"
              onPress={() => {
                setModalShow(false);

                navigation.goBack();
              }}
            >
              <Ionicons name="home-outline" size={60} color="purple" />
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
