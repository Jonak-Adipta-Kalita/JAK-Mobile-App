import React from "react";
import { TouchableOpacity, View } from "react-native";
import images from "../images";
import { Image } from "@rneui/themed";
import { useAssets } from "expo-asset";
import LoadingIndicator from "../components/Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import * as Google from "expo-auth-session/providers/google";
import {
    EXPO_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    PACKAGE_NAME,
} from "@env";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import pushPrivateNotification from "../notify/privateNotification";
import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";

interface Props {
    brand: "google" | "apple";
}

const LoginButton = ({ brand }: Props) => {
    const [, , googlePromptAsync] = Google.useAuthRequest({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
        redirectUri: makeRedirectUri(
            Constants.appOwnership === "expo"
                ? {
                      useProxy: true,
                      projectNameForProxy: `@${Constants.expoConfig?.owner}/${Constants.expoConfig?.slug}`,
                  }
                : { native: `${PACKAGE_NAME}://` }
        ),
    });

    let imageFile;

    if (brand === "google") {
        imageFile = images.loginButtons.google;
    } else if (brand === "apple") {
        imageFile = images.loginButtons.apple;
    }

    const [assets, assetsError] = useAssets([imageFile]);

    if (assetsError) errorAlertShower(assetsError);

    if (!assets) {
        return <LoadingIndicator dimensions={{ width: 70, height: 70 }} />;
    }

    const signIn = async () => {
        if (brand === "google") {
            await googlePromptAsync({ showInRecents: true })
                .then(async (loginResult) => {
                    if (
                        loginResult?.type === "success" &&
                        loginResult?.authentication?.accessToken
                    ) {
                        const credentials = GoogleAuthProvider.credential(
                            loginResult?.authentication?.idToken,
                            loginResult?.authentication?.accessToken
                        );
                        await signInWithCredential(auth, credentials).then(
                            async (authUser) => {
                                const userFetched = await getDoc(
                                    doc(db, "users", authUser?.user?.uid!)
                                );

                                if (userFetched.exists()) {
                                    await pushPrivateNotification(
                                        authUser.user.uid,
                                        {
                                            title: `Welcome back ${authUser.user.displayName}!!`,
                                            message: `Welcome back ${authUser.user.displayName}. Nice to meet you!!`,
                                            timestamp: serverTimestamp(),
                                        }
                                    );
                                } else {
                                    await pushPrivateNotification(
                                        authUser.user.uid,
                                        {
                                            title: "Welcome!!",
                                            message: `Welcome ${authUser.user.displayName}. Nice to meet you!!`,
                                            timestamp: serverTimestamp(),
                                        }
                                    ).then(() => {
                                        setDoc(
                                            doc(
                                                db,
                                                "users",
                                                authUser.user.uid!
                                            ),
                                            {
                                                uid: authUser.user.uid,
                                                email: authUser.user.email,
                                                displayName:
                                                    authUser.user.displayName,
                                                photoURL:
                                                    authUser.user.photoURL,
                                                phoneNumber:
                                                    authUser.user.phoneNumber ||
                                                    "",
                                                emailVerified:
                                                    authUser?.user
                                                        ?.emailVerified,
                                            }
                                        );
                                    });
                                }
                            }
                        );
                    }
                    return Promise.reject();
                })
                .catch((error) => errorAlertShower(error));
        } else if (brand === "apple") {
            // Apple Login
        }
    };

    return (
        <View>
            <TouchableOpacity style={{}} onPress={signIn}>
                <Image style={{ width: 70, height: 70 }} source={imageFile} />
            </TouchableOpacity>
        </View>
    );
};

export default LoginButton;
