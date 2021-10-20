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
import {
    AntDesign,
    Feather,
    MaterialIcons,
    FontAwesome5,
    Entypo,
} from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import globalStyles from "../../globalStyles";
import firebase from "firebase";
import PropTypes from "prop-types";

const RegisterScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
            confirmPassword === "" ||
            phoneNumber === ""
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
                    authUser.user
                        .updateProfile({
                            displayName: name,
                            photoURL: avatar,
                            phoneNumber: phoneNumber,
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
                            db.collection("users")
                                .doc(authUser.user.uid)
                                .collection("notifications")
                                .add({
                                    title: "Welcome!!",
                                    message: `Welcome ${email}. Nice to meet you!!`,
                                    timestamp:
                                        firebase.firestore.FieldValue.serverTimestamp(),
                                });
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
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    onChangeText={(text) => setName(text)}
                    leftIcon={() => (
                        <FontAwesome5 name="user-alt" size={24} color="black" />
                    )}
                />

                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    leftIcon={() => (
                        <MaterialIcons name="email" size={24} color="black" />
                    )}
                    onChangeText={(text) => setEmail(text)}
                />

                <View style={styles.passwordContainer}>
                    <Input
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        type="password"
                        value={password}
                        inputStyle={[globalStyles.inputBar, styles.inputBar]}
                        onChangeText={(text) => setPassword(text)}
                        leftIcon={() => (
                            <MaterialIcons
                                name="lock"
                                size={24}
                                color="black"
                            />
                        )}
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
                        inputStyle={[globalStyles.inputBar, styles.inputBar]}
                        onChangeText={(text) => setConfirmPassword(text)}
                        leftIcon={() => (
                            <MaterialIcons
                                name="lock"
                                size={24}
                                color="black"
                            />
                        )}
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

                <Input
                    placeholder="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    leftIcon={() => (
                        <Entypo name="phone" size={24} color="black" />
                    )}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
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
        bottom:
            Platform.OS === "android" ? 35 : Platform.OS === "ios" ? 35 : 17,
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
