import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { Platform } from "react-native";
import firebase from "firebase";
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
        auth.signInWithEmailAndPassword(email, password)
            .then(() =>
                db.collection("publicNotifications").add({
                    title: "Member came back to the Ligtning Family!!",
                    message: `${email} came back to the Ligtning Family!! Yippie!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            )
            .then(() => {
                db.collection("privateNotifications").add({
                    title: "Welcome Back!!",
                    message: `Welcome back ${email}. Nice to meet you again!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: email,
                });
            })
            .catch((error) => alert(error.message));
    };
    const signInGoogle = () => {};
    const signInApple = () => {};
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
            <Text
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    color: "#594d4c",
                    fontSize: 20,
                }}
            >
                Or
            </Text>
            {Platform.OS === "android" ||
                (Platform.OS === "windows" && (
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={signInGoogle}
                        >
                            {/* Google Login */}
                        </TouchableOpacity>
                    </ScrollView>
                ))}
            {Platform.OS === "ios" ||
                (Platform.OS === "macos" && (
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={signInApple}
                        >
                            {/* Apple Login */}
                        </TouchableOpacity>
                    </ScrollView>
                ))}
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
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
        marginTop: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    loginButton: {
        width: 300,
        marginTop: 40,
    },
});
