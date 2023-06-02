import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from "@env";

const app = !getApps().length
    ? initializeApp({
          apiKey: FIREBASE_API_KEY,
          authDomain: FIREBASE_AUTH_DOMAIN,
          projectId: FIREBASE_PROJECT_ID,
          storageBucket: FIREBASE_STORAGE_BUCKET,
          messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
          appId: FIREBASE_APP_ID,
          measurementId: FIREBASE_MEASUREMENT_ID,
      })
    : getApp();
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage();

export { app, db, auth, storage };
