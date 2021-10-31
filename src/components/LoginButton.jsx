import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import images from "../images";
import { Image } from "react-native-elements";
import { useAssets } from "expo-asset";
import LoadingIndicator from "../components/Loading";
import googleAuth from "../authenticators/googleAuth";
import appleAuth from "../authenticators/appleAuth";
import errorAlertShower from "../utils/errorAlertShower";

const LoginButton = ({ brand }) => {
    let imageFile;

    if (brand === "google") {
        imageFile = images.loginButtons.google;
    } else if (brand === "apple") {
        imageFile = images.loginButtons.apple;
    }

    const [assets, assetsError] = useAssets([imageFile]);

    if (assetsError) {
        errorAlertShower(assetsError);
    }

    if (!assets) {
        return <LoadingIndicator dimensions={{ width: 70, height: 70 }} />;
    }

    const signIn = async () => {
        if (brand === "google") {
            await googleAuth();
        } else if (brand === "apple") {
            await appleAuth();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{}} onPress={signIn}>
                <Image style={{ width: 70, height: 70 }} source={imageFile} />
            </TouchableOpacity>
        </View>
    );
};

LoginButton.propTypes = {
    brand: PropTypes.string.isRequired,
};

export default LoginButton;

const styles = StyleSheet.create({
    container: {},
});
