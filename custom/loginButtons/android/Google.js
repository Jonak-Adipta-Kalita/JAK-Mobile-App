import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { useAssets } from 'expo-asset';

export default function CustomGoogleLoginButton() {
    const [assets, error] = useAssets([
        require("../../../assets/loginButtons/android/google.png")
    ]);
    if (!assets) {
        return (
            <ActivityIndicator
                style={{
                    width: 70,
                    height: 70,
                }}
            />
        )
    }
    if (error) {
        Alert.alert("Error Occured", error.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ])
    }
    const signIn = async () => {};
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Image
                    style={{
                        width: 70,
                        height: 70,
                    }}
                    source={require("../../../assets/loginButtons/android/google.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {},
});
