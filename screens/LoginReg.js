import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { AuthContext } from "../Context";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AccountInfo from "../components/AccountInfo";
import { login, register, resetPassword, logout } from "../firebaseAuthFuncs";
import { getUserDetailsByID } from "../api/apiCalls";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginReg() {
  const { user, setUser, setUserFavouritedLocations } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function onAuthStateChanged(userDetails) {
    setUser(userDetails);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      getUserDetailsByID().then(({ data }) => {
        setUserFavouritedLocations(data?.favouritedLocations);
      });
    }
  }, [user]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
        marginTop: 0,
      }}
    >
      <View className="mt-24 ml-10">
        <Text className="text-5xl pt-4 font-extrabold color-purple-800">
          {user ? "Welcome 👋" : "Account"}
        </Text>
        <Text className="text-2xl font-bold color-gray-500">
          {user ? `${user.email}` : "Register or login to your account"}
        </Text>
      </View>
      <View
        className="bg-purple-800 h-full w-full mt-10
  bottom-0 rounded-t-[60px] p-8 pt-20"
      >
        {user && (
          <AccountInfo
            logout={logout}
            resetPassword={resetPassword}
          ></AccountInfo>
        )}

        {!user && (
          <View className="flex items-center justify-center">
            <TextInput
              className="flex text-[18px] bg-white h-12 w-full rounded-3xl p-2 mb-6"
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
              autoCapitalize="none"
              lineHeight={22}
            ></TextInput>

            <TextInput
              className={
                "bg-white text-[18px] h-12 w-full rounded-3xl p-2 mb-6" +
                (password.length > 5 ? " bg-green-100" : " bg-red-100") +
                (password.length === 0 ? "bg-white" : "")
              }
              placeholder="Password (6+ characters)"
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
              autoCapitalize="none"
              lineHeight={22}
              secureTextEntry={true}
            ></TextInput>

            {!hasAccount && (
              <>
                <TextInput
                  autoCapitalize="none"
                  className={
                    "bg-white text-[18px] h-12 w-full rounded-3xl p-2 mb-6" +
                    (password.length === confirmPassword.length &&
                    confirmPassword.length > 5
                      ? " bg-green-100"
                      : " bg-red-100") +
                    (confirmPassword.length === 0 ? "bg-white" : "")
                  }
                  placeholder="Confirm password"
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                  value={confirmPassword}
                  lineHeight={22}
                  secureTextEntry={true}
                ></TextInput>
                <TextInput
                  className={
                    "bg-white text-[18px] h-12 w-full rounded-3xl p-2 mb-6"
                  }
                  placeholder="First name"
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                  value={firstName}
                  autoCapitalize="none"
                  lineHeight={22}
                ></TextInput>
                <TextInput
                  className={
                    "bg-white text-[18px] h-12 w-full rounded-3xl p-2 mb-6"
                  }
                  placeholder="Last name"
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                  value={lastName}
                  lineHeight={22}
                ></TextInput>
              </>
            )}

            <TouchableOpacity
              onPress={() => {
                if (hasAccount && password.length !== 0) {
                  login(
                    email,
                    password,
                    setEmail,
                    setPassword,
                    setConfirmPassword
                  );
                } else if (hasAccount && password.length === 0) {
                  Alert.alert("Password missing", "Please enter a password");
                }
                if (
                  !hasAccount &&
                  password.length !== 0 &&
                  password === confirmPassword &&
                  firstName.length !== 0 &&
                  lastName.length !== 0
                ) {
                  register(
                    email,
                    password,
                    firstName,
                    lastName,
                    setEmail,
                    setPassword,
                    setConfirmPassword,
                    setFirstName,
                    setLastName
                  );
                } else if (password.length === 0) {
                  Alert.alert("Password missing", "Please enter a password");
                } else if (!hasAccount && password !== confirmPassword) {
                  Alert.alert("Passwords do not match", "Please try again");
                } else if (
                  !hasAccount &&
                  (firstName.length === 0 || lastName.length === 0)
                ) {
                  console.log(hasAccount);
                  Alert.alert("Name missing", "Please enter a name");
                }
              }}
              className="bg-white h-12 rounded-3xl p-2 w-60 mb-3"
            >
              <Text className="text-center font-semibold text-lg">
                {hasAccount ? "Login into your account" : "Sign up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                hasAccount ? setHasAccount(false) : setHasAccount(true);
              }}
              className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60 mb-3"
            >
              <Text className="text-center text-lg color-white font-bold">
                {hasAccount ? "Register" : "I have an account"}
              </Text>
            </TouchableOpacity>
            {hasAccount && (
              <TouchableOpacity
                onPress={() => {
                  resetPassword(email);
                }}
                className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60"
              >
                <Text className="text-center text-lg color-white font-bold">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        className="rounded-full h-12 w-12 items-center justify-center absolute bottom left-4 top-12 p-2 bg-purple-800"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="ios-arrow-back-outline" size={28} color="white" />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
