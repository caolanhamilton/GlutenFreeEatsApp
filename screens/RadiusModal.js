import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

export default function RadiusModal({
  isModalVisible,
  setModalVisible,
  setRadius,
}) {
  const [sliderValue, setSlideValue] = useState(100);

  return (
    <View className="flex">
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        onBackdropPress={() => setModalVisible(false)}
        scrollHorizontal={true}
        style={{ margin: 0, marginTop: 400 }}
        useNativeDriver={false}
        propagateSwipe={true}
      >
        <View className="flex-1 rounded-t-3xl  bg-purple-800">
          <View className="items-center">
            <View className="bg-purple-300 rounded-lg h-1.5 mt-2 w-32"></View>
          </View>
          <View className="flex-row p-2 pt-4 items-center justify-center">
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={32}
              color="white"
            />
            <Text className="text-3xl font-bold color-white pl-1">
              Set Distance
            </Text>
          </View>
          <Text className="text-xl text-center color-white pl-1 color-purple-300">
            Set the max distance from you or your set location a restaurant can
            be.
          </Text>
          <Text className={"text-2xl font-bold pt-5 color-white text-center"}>
            {sliderValue === 100 ? `Anywhere` : `${sliderValue} miles`}
          </Text>
          <Slider
            value={sliderValue}
            style={{ width: "80%", height: 40, alignSelf: "center" }}
            minimumValue={5}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            onValueChange={(value) => setSlideValue(Number(value.toFixed(0)))}
          />
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => {
                setRadius(sliderValue);
                setModalVisible(false);
              }}
              className="bg-white
              border-2
              border-green-300
              p-3
              m-1
              self-start
              rounded-3xl w-20
              "
            >
              <Text className="text-xl text-center font-bold">Set</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              className="bg-white
              border-2
              border-red-300
              p-3
              m-1
              self-start
              rounded-3xl
              w-30
              "
            >
              <Text className="text-xl font-bold text-center">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
