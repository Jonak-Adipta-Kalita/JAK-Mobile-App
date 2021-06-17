import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomAppleLoginButton() {
    const signIn = () => {};
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={signIn}>
                {/* button */}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {},
});
