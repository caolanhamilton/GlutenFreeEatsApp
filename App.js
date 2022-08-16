import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import AddRestaurant from "./screens/AddRestaurant";
import RestaurantScreen from "./screens/RestaurantScreen";
import VerticalRestaurantsList from "./screens/VerticalRestaurantsListPage";
import UserLocations from "./screens/UserLocations"; 
import { AuthContextProvider } from "./Context";
import LoginReg from "./screens/LoginReg";
import UserReviews from "./screens/UserReviews";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen
              name="AddRestaurant"
              component={AddRestaurant}
            ></Stack.Screen>
            <Stack.Screen
              name="RestaurantScreen"
              component={RestaurantScreen}
            ></Stack.Screen>
            <Stack.Screen
              name="VerticalRestaurants"
              component={VerticalRestaurantsList}
            ></Stack.Screen>
              <Stack.Screen name="LoginReg" component={LoginReg}></Stack.Screen>
              <Stack.Screen name="UserLocations" component={UserLocations}></Stack.Screen>
              <Stack.Screen name="UserReviews" component={UserReviews}></Stack.Screen>
          </Stack.Navigator>
        </TailwindProvider>
      </NavigationContainer>
      </SafeAreaProvider>
      </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
