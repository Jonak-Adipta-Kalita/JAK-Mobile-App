import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "@env";
import { auth } from "../firebase";
import errorAlertShower from "../utils/errorAlertShower";

const googleAuth = async () => {
    const { type, idToken, accessToken } = await Google.logInAsync({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosStandaloneAppClientId: GOOGLE_IOS_CLIENT_ID,
        androidStandaloneAppClientId: GOOGLE_ANDROID_CLIENT_ID,
    });
    if (type === "success") {
        const credential = await firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
        );
        await auth.signInWithCredential(credential).catch((error) => {
            errorAlertShower(error);
        });
    }
};

export default googleAuth;