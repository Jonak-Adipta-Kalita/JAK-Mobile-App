import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db } from "../firebase";
import PropTypes from "prop-types";

export default function ContactScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const submitRequestToContact = () => {
        db.collection("requestToContact")
            .add({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                message: message,
            })
            .then(() => alert("Request Sent!!"))
            .catch((error) => alert(error.message));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Contact Me!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
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
                style={styles.button}
                title="Submit"
                onPress={submitRequestToContact}
            />
        </View>
    );
}

ContactScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginTop: 50,
    },
    inputContainer: {
        width: 350,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
