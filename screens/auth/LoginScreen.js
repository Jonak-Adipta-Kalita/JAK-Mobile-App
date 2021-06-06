import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../../firebase";
import PropTypes from "prop-types";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) navigation.replace("Home");
        });
        return unSubscribe;
    }, []);
    const signInEmail = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) =>
            alert(error.message)
        );
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Login!!",
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
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signInEmail}
                />
            </View>
            <Button
                onPress={signInEmail}
                containerStyle={styles.button}
                title="Login"
            />
            <Button
                containerStyle={styles.button}
                title="Register"
                type="outline"
                onPress={() => navigation.navigate("Register")}
            />
            <View style={{ height: 100 }} />
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
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
