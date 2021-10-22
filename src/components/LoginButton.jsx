import React from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import PropTypes from "prop-types";
import images from "../images";
import { Image } from "react-native-elements";
import { useAssets } from "expo-asset";
import LoadingIndicator from "../components/Loading";

const LoginButton = ({ brand }) => {
    let imageFile;
    if (brand === "google") {
        imageFile = images.loginButtons.google;
    } else if (brand === "apple") {
        imageFile = images.loginButtons.apple;
    }

    const [assets, error] = useAssets([imageFile]);
    if (error) {
        Alert.alert("Error Occured", error.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ]);
    }
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
        <View style={styles.container}>
            <TouchableOpacity style={{}} onPress={signIn}>
                <Image style={styles.dimensions} source={imageFile} />
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
