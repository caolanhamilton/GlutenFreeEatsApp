import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBo46Fz4CMAO34PiMeocPXfdLrR27w0K-M",
  authDomain: "gfapp-356213.firebaseapp.com",
  projectId: "gfapp-356213",
  storageBucket: "gfapp-356213.appspot.com",
  messagingSenderId: "913705769140",
  appId: "1:913705769140:web:8a8d31db47387ef4d9dfe1",
  measurementId: "G-NWDLDNLWW9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}