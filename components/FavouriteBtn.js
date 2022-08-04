import { TouchableOpacity, Text, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context";
import { addFavourite, removeFavourite } from "../api/apiCalls";

export default function FavouriteBtn({ favouritedBy, locationId }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleFavourite = () => {
    isFavourite
      ? removeFavourite(user.uid, locationId)
      : addFavourite(user.uid, locationId);
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    favouritedBy.filter((userWhoHasFavourtied) => {
      if (userWhoHasFavourtied?.id === user?.uid) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        if (user) {
          toggleFavourite();
        } else {
          Alert.alert(
            "Account required",
            "Please log in to favourite a location",
            [
              ,
              {
                text: "Login or create account",
                onPress: () => console.log("Log in or create"),
              },
              { text: "Maybe later" },
            ]
          );
        }
      }}
    >
      {isFavourite ? (
        <MaterialCommunityIcons name="heart" size={50} color={"#6b21a8"} />
      ) : (
        <MaterialCommunityIcons
          name="heart-outline"
          size={50}
          color={user ? "#6b21a8" : "#9ca3af"}
        />
      )}
      <Text>Favorite</Text>
    </TouchableOpacity>
  );
}
