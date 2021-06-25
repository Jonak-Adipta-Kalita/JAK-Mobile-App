import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";

export default function CustomGoogleLoginButton() {
    const signIn = async () => {};
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Image
                    style={{
                        width: 70,
                        height: 70,
                    }}
                    source={{
                        uri: "https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/blob/main/assets/loginButtons/android/google.png?raw=true"
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {},
});
