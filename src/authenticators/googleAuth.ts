import { auth } from "../firebase";
import * as Google from "expo-auth-session/providers/google";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import {
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    EXPO_CLIENT_ID,
} from "@env";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const googleAuth = async () => {
    await Google.logInAsync({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    }).then(async (loginResult) => {
        if (loginResult.type === "success") {
            const { idToken, accessToken } = loginResult;
            const credential = GoogleAuthProvider.credential(
                idToken,
                accessToken
            );

            await signInWithCredential(auth, credential).catch((error) => {
                errorAlertShower(error);
            });
        }
    });
};

export default googleAuth;
