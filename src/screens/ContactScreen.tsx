import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPrivateNotification from "../notify/privateNotification";
import globalStyles from "../globalStyles";
import LoadingIndicator from "../components/Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";

const ContactScreen = () => {
    const navigation: any = useNavigation();

    const [user, userLoading, userError] = useAuthState(auth);
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
                messageAlertShower(
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
                messageAlertShower(
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
                        navigation.jumpTo("HomeDrawer");
                    })
                    .then(() => {
                        messageAlertShower(
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
                        errorAlertShower(error);
                    });
            }
        } else {
            messageAlertShower(
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

    if (userError) errorAlertShower(userError);

    if (userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Name"
                    autoFocus
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCompleteType={"name"}
                />
                <Input
                    placeholder="Email"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCompleteType={"email"}
                />
                <Input
                    placeholder="Phone Number (with Country Code)"
                    inputStyle={[
                        globalStyles.inputBar,
                        styles.inputBar,
                        { paddingRight: 2 },
                    ]}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    autoCompleteType={"tel"}
                />
                <Input
                    placeholder="Why do you want to Contact Me?"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    autoCompleteType={"off"}
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
    inputBar: {},
});
