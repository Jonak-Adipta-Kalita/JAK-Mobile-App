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

export default function CustomAppleLoginButton() {
    const signIn = async () => {};
    const [assets, error] = useAssets([
        require("../../../assets/loginButtons/ios/apple.png")
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
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={signIn}>
            <Image
                    style={{
                        width: 70,
                        height: 70,
                    }}
                    source={require("../../../assets/loginButtons/ios/apple.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {},
});
