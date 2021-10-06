import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import PropTypes from "prop-types";

const RegisterScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar] = useState(
        "https://static.wikia.nocookie.net/caramella-girls/images/9/99/Blankpfp.png/revision/latest?cb=20190122015011"
    );
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Register!!",
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
    const register = () => {
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            Alert.alert(
                "Value not Filled!!",
                "Please Enter all the Values in the Form!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else if (password !== confirmPassword) {
            Alert.alert(
                "Passwords doesn't Matches!!!!",
                "Please make sure your Password and Confirm Password is same!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    authUser.user.updateProfile({
                        displayName: name,
                        photoURL: avatar,
                    });
                })
                .then(() => {
                    db.collection("publicNotifications").add({
                        title: "New member in the Ligtning Family!!",
                        message: `${email} Joined the Ligtning Family!! Yippie!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                })
                .then(() => {
                    db.collection("privateNotifications").add({
                        title: "Welcome!!",
                        message: `Welcome ${email}. Nice to meet!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
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
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create an Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Input
                    placeholder="Email"
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

                <View style={styles.passwordConfirmContainer}>
                    <Input
                        placeholder="Confirm Password"
                        secureTextEntry={!showPassword}
                        type="password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
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
                containerStyle={styles.button}
                title="Register"
                onPress={register}
                raised
            />
        </View>
    );
};

RegisterScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    passwordContainer: {
        position: "relative",
    },
    showPasswordContainer: {
        position: "absolute",
        right: 15,
        bottom: Platform.OS === "android" && Platform.OS === "ios" ? 35 : 17,
        height: 24,
        width: 24,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    showPasswordIcon: {},
});
