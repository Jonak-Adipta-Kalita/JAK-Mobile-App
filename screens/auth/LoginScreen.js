import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { auth, provider } from "../../firebase";

export default function LoginScreen({ navigation }) {
    const googleSignIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Login",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 20,
                        }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ width: 300 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("LoginWithEmail")}
                >
				
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={googleSignIn}>
				
                </TouchableOpacity>
            </View>
        </View>
    );
}

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 300,
    },
});
