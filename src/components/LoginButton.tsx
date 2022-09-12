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
} from "@env";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, db } from "../firebase";
import pushPublicNotification from "../notify/publicNotification";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import pushPrivateNotification from "../notify/privateNotification";

interface Props {
    brand: "google" | "apple";
}

const LoginButton = ({ brand }: Props) => {
    const [, , googlePromptAsync] = Google.useAuthRequest({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
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
                .then(async (logginResult) => {
                    if (
                        logginResult?.type === "success" &&
                        logginResult?.authentication?.accessToken
                    ) {
                        const credentials = GoogleAuthProvider.credential(
                            logginResult?.authentication?.idToken,
                            logginResult?.authentication?.accessToken
                        );
                        await signInWithCredential(auth, credentials).then(
                            async (authUser) => {
                                const userFetched = await getDoc(
                                    doc(db, "users", authUser?.user?.uid!)
                                );

                                if (userFetched) {
                                    await pushPrivateNotification(
                                        authUser.user.uid,
                                        {
                                            title: `Welcome again ${authUser.user.displayName}!!`,
                                            message: `Welcome again ${authUser.user.email}. Nice to meet you!!`,
                                            timestamp: serverTimestamp(),
                                        }
                                    );
                                } else {
                                    await pushPrivateNotification(
                                        authUser.user.uid,
                                        {
                                            title: "Welcome!!",
                                            message: `Welcome ${authUser.user.email}. Nice to meet you!!`,
                                            timestamp: serverTimestamp(),
                                        }
                                    )
                                        .then(() => {
                                            setDoc(
                                                doc(
                                                    db,
                                                    "users",
                                                    authUser.user.uid!
                                                ),
                                                {
                                                    uid: authUser.user.uid!,
                                                    email: authUser.user.email,
                                                    displayName:
                                                        authUser.user
                                                            .displayName,
                                                    photoURL:
                                                        authUser.user.photoURL,
                                                    phoneNumber:
                                                        authUser.user
                                                            .phoneNumber || "",
                                                    emailVerified:
                                                        authUser?.user
                                                            ?.emailVerified,
                                                }
                                            );
                                        })
                                        .then(() => {
                                            pushPublicNotification({
                                                title: "New member in the Ligtning Family!!",
                                                message: `${authUser.user.email} Joined the Ligtning Family!! Yippie!!`,
                                                timestamp: serverTimestamp(),
                                            });
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
