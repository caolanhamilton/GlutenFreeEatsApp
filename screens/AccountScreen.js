import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useRef, useState, useEffect, useContext } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { AuthContext } from "../Context";

export default function AccountScreen() {

  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  // Handle user state changes
  function onAuthStateChanged(userDetails) {
    setUser(userDetails);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("caolanhamilton75@gmail.com", "password")
      .then((userInfo) => {
        // setUser(userInfo);
        Alert.alert("Success", "You are logged in");
      })
      .catch((error) => {
        console.log(error, "error");
        alert(error);
      });
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      {user && (
        <View>
          <Text>{user.email} signed in!</Text>
          <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {!user && (
        <View>
          <TextInput
            placeholder="Enter email"
            onChange={(text) => {
              setEmail(text);
            }}
          ></TextInput>
          <TextInput
            placeholder="Enter password"
            onChange={(text) => {
              setPassword(text);
            }}
          ></TextInput>
          <TouchableOpacity onPress={login}>
            <Text>Login with email</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
