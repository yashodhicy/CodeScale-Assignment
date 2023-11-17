import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from 'firebase/auth'
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import {AsyncStorage } from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBjwkRii0teozC3QJ72meSNiAO4Mp_Sdn4",
  authDomain: "auth-1284a.firebaseapp.com",
  projectId: "auth-1284a",
  storageBucket: "auth-1284a.appspot.com",
  messagingSenderId: "592549725533",
  appId: "1:592549725533:web:6b25011d98afc7b52354b4",
  measurementId: "G-KRQZH1KFTR"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH =  getAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);