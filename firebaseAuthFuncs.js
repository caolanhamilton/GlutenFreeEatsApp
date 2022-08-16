// import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { Alert } from "react-native";


export const getIdToken = () => {
  return firebase
    .auth()
    .currentUser?.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      return idToken;
    })
    .catch(function (error) {
      console.log("could not get id token", error);
    });
};

export const login = (
  email,
  password,
  setEmail,
  setPassword,
  setConfirmPassword
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      setEmail("");
      setConfirmPassword("");
      setPassword("");
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Incorrect email formatting");
      }
      if (error.code === "auth/user-not-found") {
        Alert.alert("Sorry", "User with this email not found");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Sorry", "Wrong password");
      }
    });
};

export const register = async (
  email,
  password,
  
) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)

    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Sorry", "Email already in use");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Sorry", "Email not valid");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Sorry", "Password must be at least 6 characters");
      }
    });
};

export const resetPassword = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert("Success", "Password reset email sent");
    })
    .catch((error) => {
      console.log(error);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        return Alert.alert("Sorry", "User with this email not found");
      }
      if (error.code === "auth/missing-email") {
        Alert.alert("Sorry", "You haven't entered an email");
      }
    });
};

export const changeEmail = (newEmail, setNewEmailPress) => {
  return firebase
    .auth()
    .currentUser.updateEmail(newEmail)
    .then((user) => {
      setNewEmailPress(false);
      Alert.alert("Success", "Email changed successfully");
      return newEmail
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Incorrect email formatting");
      } else if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Email already in use");
      } else if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Error",
          "You must have recently signed in to change your email, please sign out and in again"
        );
      }
    });
};

export const deleteAccount = () => {
  firebase
    .auth()
    .currentUser.delete()
    .then(() => {
      Alert.alert("Success", "Account deleted successfully");
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Error",
          "You must have recently signed in to change your email, please sign out and in again"
        );
      }
    });
};

export const logout = () => {
  firebase.auth().signOut();
};
