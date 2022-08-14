import React from "react";
import { TouchableOpacity, View } from "react-native";
import images from "../images";
import { Image } from "react-native-elements";
import { useAssets } from "expo-asset";
import LoadingIndicator from "../components/Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import * as Google from "expo-auth-session/providers/google";
import {
    EXPO_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
} from "@env";

interface Props {
    brand: "google" | "apple";
}

const LoginButton = ({ brand }: Props) => {
    const [googleRequest, googleResponse, googlePromptAsync] =
        Google.useAuthRequest({
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
            // Google Login
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
