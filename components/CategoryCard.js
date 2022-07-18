import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryCard({ cat, img, id }) {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image className="h-20 w-20 rounded" source={{ uri: img }}></Image>
      <Text className="text-white text-base font-bold text-l absolute bottom-1 left-1">{cat}</Text>
    </TouchableOpacity>
  );
}
