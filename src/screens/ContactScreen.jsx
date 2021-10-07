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
import globalStyles from "../globalStyles";
import PropTypes from "prop-types";

const ContactScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const submitRequestToContact = () => {
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
        } else if (email !== auth.currentUser.email) {
            Alert.alert(
                "Email not Correct!!",
                "Please Enter your Email Correctly!!",
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
                    db.collection("privateNotifications").add({
                        title: "Request to Contact Sent!!",
                        message:
                            "Your Request to Contact has been Successfully Sent!!",
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        user: email,
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
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Contact Me!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
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
                    style={styles.inputBar}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    style={styles.inputBar}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Phone Number (with Country Code)"
                    type="phone"
                    style={styles.inputBar}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <Input
                    placeholder="Why do you want to Contact Me?"
                    type="text"
                    style={styles.inputBar}
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
