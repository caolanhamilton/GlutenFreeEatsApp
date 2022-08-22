import React, {useRef} from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
export default function GooglePlacesSearch({
  setLocation,
  setLocationName,
}) {
  const googlePlaceAutoCompleteRef = useRef(null);

  return (
    <GooglePlacesAutocomplete
      ref={googlePlaceAutoCompleteRef}
      onPress={(data, details) => {
        setLocation({
          coords: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        });
        setLocationName(data.description);
        googlePlaceAutoCompleteRef.current?.setAddressText("");
      }}
      placeholder="Set location manually"
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
          marginLeft: "12%",
          borderRadius: 15,
          width: "120%",
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
