import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";

export default function GooglePlacesSearch() {
  return (
    <GooglePlacesAutocomplete
      placeholder="Locations & Restaurants"
      fetchDetails={true}
      query={{
        key: GOOGLE_MAPS_KEY,
        language: "en",
        components: "country:gb",
        rankby: "distance",
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
          color: "#5d5d5d",
          fontSize: 16,
          backgroundColor: "#fafafa",
        },
      }}
    />
  );
}
