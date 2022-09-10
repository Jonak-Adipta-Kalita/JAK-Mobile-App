import React, { useState, useEffect } from "react";
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
import { ProviderId, User } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
    brand: "google" | "apple";
}

const LoginButton = ({ brand }: Props) => {
    const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(
        null
    );
    const [googleUserInfo, setGoogleUserInfo] = useState<User | null>(null);
    const [googleRequest, googleResponse, googlePromptAsync] =
        Google.useAuthRequest({
            androidClientId: GOOGLE_ANDROID_CLIENT_ID,
            iosClientId: GOOGLE_IOS_CLIENT_ID,
            expoClientId: EXPO_CLIENT_ID,
        });

    useEffect(() => {
        if (googleResponse?.type === "success") {
            setGoogleAccessToken(googleResponse?.authentication?.accessToken!);
        }
    }, [googleResponse, googleRequest]);

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
            if (googleResponse?.type === "success" && googleAccessToken) {
                googlePromptAsync({ showInRecents: true });

                const userInfo = await fetch(
                    "https://www.googleapis.com/userinfo/v2/me?scope=https://www.googleapis.com/auth/userinfo.profile",
                    {
                        headers: {
                            Authorization: `Bearer ${googleAccessToken}`,
                        },
                    }
                );
                userInfo?.json()?.then((data) =>
                    setGoogleUserInfo({
                        email: data.email,
                        displayName: data.name,
                        photoURL: data.picture,
                        emailVerified: data.verified_email,
                        refreshToken:
                            googleResponse?.authentication?.refreshToken!,
                        uid: googleResponse?.authentication?.idToken!,
                        phoneNumber: null,
                        metadata: {
                            creationTime: Date.now().toString(),
                            lastSignInTime: Date.now().toString(),
                        },
                        isAnonymous: false,
                        providerData: [
                            {
                                email: data.email,
                                displayName: data.name,
                                photoURL: data.picture,
                                uid: googleResponse?.authentication?.idToken!,
                                phoneNumber: null,
                                providerId: ProviderId.GOOGLE,
                            },
                        ],
                        providerId: ProviderId.GOOGLE,
                        tenantId: auth.tenantId,
                    })
                );
                console.log(googleUserInfo);
            }
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
