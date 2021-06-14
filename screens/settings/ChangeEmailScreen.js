import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import PropTypes from "prop-types";

export default function ChangeEmailScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const changeEmail = () => {
        if (email === "") {
            alert("Please Enter all the Values in the Form!!");
        } else {
            auth.currentUser
                .updateEmail(email)
                .then(() => {
                    // Write the code of changing Email in existing Firestore Private Notifications
                })
                .then(() => {
                    db.collection("privateNotifications").add({
                        title: "Email Changed Successfully!!",
                        message: `Your Email has been Successfully Changed to ${email}!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        user: auth?.currentUser?.email,
                    });
                })
                .then(() => {
                    setEmail("");
                    navigation.jumpTo("Home");
                })
                .then(() => alert("Your Email is Successfully Changed!!"))
                .catch((error) => alert(error.message));
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change your Email!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 20,
                        }}
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
                    placeholder="Email"
                    autoFocus
                    type="email"
                    style={styles.inputBar}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <Button
                style={styles.button}
                title="Upgrade"
                onPress={changeEmail}
            />
        </View>
    );
}

ChangeEmailScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

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
    button: {
        width: 200,
        marginTop: 10,
    },
});
