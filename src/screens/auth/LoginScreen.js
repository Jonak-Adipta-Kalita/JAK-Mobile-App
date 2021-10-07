import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import PropTypes from "prop-types";
import LoginButton from "../../components/LoginButton";

const LoginScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
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
            .then(() => {
                db.collection("publicNotifications").add({
                    title: "Member came back to the Ligtning Family!!",
                    message: `${email} came back to the Ligtning Family!! Yippie!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            })
            .then(() => {
                db.collection("privateNotifications").add({
                    title: "Welcome Back!!",
                    message: `Welcome back ${email}. Nice to meet you again!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: email,
                });
            })
            .catch((error) => {
                Alert.alert("Error Occured!!", error.message, [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]);
            });
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
                <View style={styles.passwordContainer}>
                    <Input
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        type="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onSubmitEditing={signInEmail}
                    />
                    <TouchableOpacity
                        style={styles.showPasswordContainer}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <Feather
                                name="eye"
                                size={20}
                                color="black"
                                style={styles.showPasswordIcon}
                            />
                        ) : (
                            <Feather
                                name="eye-off"
                                size={20}
                                color="black"
                                style={styles.showPasswordIcon}
                            />
                        )}
                    </TouchableOpacity>
                </View>
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

            {Platform.OS === "android" ||
                (Platform.OS === "ios" && (
                    <View>
                        <Text
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                color: "#594d4c",
                                alignSelf: "center",
                                fontSize: 20,
                            }}
                        >
                            Or
                        </Text>
                        <ScrollView
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            {Platform.OS === "android" && (
                                <LoginButton brand="google" />
                            )}
                            {Platform.OS === "ios" && (
                                <LoginButton brand="apple" />
                            )}
                        </ScrollView>
                    </View>
                ))}
        </View>
    );
};

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    inputContainer: {
        width: 300,
        marginTop: 10,
    },
    passwordContainer: {
        position: "relative",
    },
    showPasswordContainer: {
        position: "absolute",
        right: 15,
        bottom: Platform.OS === "android" ? 35 : Platform.OS === "ios" ? 35 : 17,
        height: 24,
        width: 24,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    loginButton: {
        width: 300,
        marginTop: 40,
    },
    showPasswordIcon: {},
});
