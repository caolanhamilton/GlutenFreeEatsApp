import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context";
import {
  logout,
  resetPassword,
  deleteAccount,
  changeEmail,
} from "../firebaseAuthFuncs";
import { deleteUser, updateUserEmail } from "../api/apiCalls";
import { useNavigation } from "@react-navigation/native";

export default function AccountInfo() {
  const { user } = useContext(AuthContext);
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [newEmailPress, setNewEmailPress] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex items-center justify-center">
      <Text className="text-center color-white font-extrabold text-xl pb-2">
        Manage your posts
      </Text>
      <View className="self-between gap-x-2 flex-row items-center mb-4">
        <TouchableOpacity
          onPress={() => {navigation.navigate("UserReviews")}}
          className="bg-white border-2 border-white h-12 rounded-3xl p-2 w-1/3 mb-3"
        >
          <Text className="text-center color-purple-800 font-semibold text-lg">
            Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {navigation.navigate("UserLocations")}}
          className="bg-white border-2 border-white h-12 rounded-3xl p-2 w-30 mb-3 w-1/3"
        >
          <Text className="text-center color-purple-800 font-semibold text-lg">
            Locations
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center color-white font-extrabold text-xl pb-2">
        Account management
      </Text>
      <TouchableOpacity
        onPress={logout}
        className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60 mb-3"
      >
        <Text className="text-center color-white font-semibold text-lg">
          Logout
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          resetPassword(user.email);
        }}
        className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60 mb-3"
      >
        <Text className="text-center color-white font-semibold text-lg">
          Reset password
        </Text>
      </TouchableOpacity>
      {!newEmailPress && (
        <TouchableOpacity
          onPress={() => {
            setNewEmailPress(true);
          }}
          className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60 mb-3"
        >
          <Text className="text-center color-white font-semibold text-lg">
            Change email
          </Text>
        </TouchableOpacity>
      )}

      {newEmailPress && (
        <View className="flex w-full items-center justify-center">
          <TextInput
            className={"bg-white text-[18px] h-12 w-full rounded-3xl p-2 mb-6"}
            placeholder="New email"
            onChangeText={(text) => {
              setNewEmail(text);
            }}
            value={newEmail}
            autoCapitalize="none"
            lineHeight={22}
          ></TextInput>
          <TextInput
            className={
              "bg-white text-[18px] h-12 w-full rounded-3xl p-2 mb-6" +
              (newEmail === confirmNewEmail && newEmail.length > 0
                ? " bg-green-100"
                : " bg-red-100") +
              (confirmNewEmail.length === 0 ? "bg-white" : "")
            }
            placeholder="Confirm new email"
            onChangeText={(text) => {
              setConfirmNewEmail(text);
            }}
            value={confirmNewEmail}
            autoCapitalize="none"
            lineHeight={22}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              if (newEmail.length === 0) {
                Alert.alert("Error", "Please enter a new email");
              }
              if (newEmail === confirmNewEmail && newEmail.length > 0) {
                changeEmail(newEmail, setNewEmailPress).then((changedEmail) => { 
                  updateUserEmail(changedEmail)
                })
                
              }
            }}
            className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60 mb-3"
          >
            <Text className="text-center color-white font-semibold text-lg">
              Confirm email change
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          deleteUser().then(() => {
            deleteAccount();
          });
        }}
        className="bg-purple border-2 border-white h-12 rounded-3xl p-2 w-60 mb-3"
      >
        <Text className="text-center color-white font-semibold text-lg">
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
