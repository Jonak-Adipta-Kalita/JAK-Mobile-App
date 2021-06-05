import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
    GoogleLoginButton,
    createButton,
    createSvgIcon,
} from "react-social-login-buttons";

export default function LoginScreen({ navigation }) {
    const googleSignIn = () => {};
    const EmailLoginButton = createButton({
        text: "Log in with Email",
        icon: createSvgIcon(() => <MaterialIcons name="email" size={24} />),
        iconFormat: (name) => `fa fa-${name}`,
        style: { background: "#fff", color: "black" },
        activeStyle: { background: "#EFF0EE" },
    });
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
        <View>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("LoginWithEmail")}
                >
                    <EmailLoginButton />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={googleSignIn}>
                    <GoogleLoginButton />
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
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 300,
    },
});
