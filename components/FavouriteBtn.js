import { TouchableOpacity, Text, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context";
import { addFavourite, removeFavourite } from "../api/apiCalls";

export default function FavouriteBtn({ locationId, restaurant }) {
  const [isFavourite, setIsFavourite] = useState(false);

  const { user, userFavouritedLocations, setUserFavouritedLocations } =
    useContext(AuthContext);

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourite(locationId);
      setUserFavouritedLocations(
        [...userFavouritedLocations]?.filter(
          (location) => location.id !== locationId
        )
      );
    } else {
      addFavourite(locationId);
      userFavouritedLocations ?
        setUserFavouritedLocations([restaurant, ...userFavouritedLocations]) : setUserFavouritedLocations([restaurant]);
    }
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    if (
      userFavouritedLocations &&
      userFavouritedLocations.some((location) => location.id === locationId)
    ) {
      setIsFavourite(true);
    }
  }, [user]);

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
