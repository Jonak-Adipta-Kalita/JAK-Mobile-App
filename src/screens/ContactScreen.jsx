import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPrivateNotification from "../notify/privateNotification";
import globalStyles from "../globalStyles";
import PropTypes from "prop-types";

const ContactScreen = ({ navigation }) => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const submitRequestToContact = () => {
        if (user) {
            if (
                name === "" ||
                email === "" ||
                phoneNumber === "" ||
                message === ""
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
            } else if (email !== user?.email || name !== user?.displayName) {
                Alert.alert(
                    "Some Values are not Correct!!",
                    "Please Enter your Value Correctly!!",
                    [
                        {
                            text: "OK",
                            onPress: () => {},
                        },
                    ]
                );
            } else {
                db.collection("requestToContact")
                    .add({
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        message: message,
                    })
                    .then(() => {
                        pushPrivateNotification(user?.uid, {
                            title: "Request to Contact Sent!!",
                            message:
                                "Your Request to Contact has been Successfully Sent!!",
                            timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                        });
                    })
                    .then(() => {
                        setName("");
                        setEmail("");
                        setPhoneNumber("");
                        setMessage("");
                        navigation.jumpTo("Home");
                    })
                    .then(() => {
                        Alert.alert(
                            "Request Sent!!",
                            "Your Request to Contact is Sent Successfully!!",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {},
                                },
                            ]
                        );
                    })
                    .catch((error) => {
                        Alert.alert("Error Occurred!!", error.message, [
                            {
                                text: "OK",
                                onPress: () => {},
                            },
                        ]);
                    });
            }
        } else {
            Alert.alert(
                "No User Data Found!!",
                "Please Login or Register to the App!!",
                [
                    {
                        text: "Login",
                        onPress: () => navigation.navigate("Login"),
                    },
                    {
                        text: "Register",
                        onPress: () => navigation.navigate("Register"),
                    },
                ]
            );
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Contact Me!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} />
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
                    placeholder="Name"
                    autoFocus
                    type="text"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Phone Number (with Country Code)"
                    type="phone"
                    inputStyle={[
                        globalStyles.inputBar,
                        styles.inputBar,
                        { paddingRight: 2 },
                    ]}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <Input
                    placeholder="Why do you want to Contact Me?"
                    type="text"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
            </View>
            <Button
                containerStyle={[globalStyles.button, { marginTop: 10 }]}
                title="Submit"
                onPress={submitRequestToContact}
            />
        </View>
    );
};

ContactScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginTop: 20,
    },
    inputContainer: {
        width: 350,
    },
});
