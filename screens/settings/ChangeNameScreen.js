import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import PropTypes from "prop-types";

export default function ChangeNameScreen({ navigation }) {
    const [name, setName] = useState("");
    const changeName = () => {
        if (name === "") {
            alert("Please Enter all the Values in the Form!!");
        } else {
            auth.currentUser
                .updateProfile({
                    displayName: name,
                })
                .then(() => {
                    db.collection("privateNotifications").add({
                        title: "Name Changed Successfully!!",
                        message: `Your Name has been Successfully Changed to ${name}!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        user: auth?.currentUser?.email,
                    });
                })
                .then(() => {
                    setName("");
                    navigation.jumpTo("Home");
                })
                .then(() => alert("Your Name is Successfully Changed!!"))
                .catch((error) => alert(error.message));
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change your Name!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 20,
                        }}
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
            </View>
            <Button
                style={styles.button}
                title="Upgrade"
                onPress={changeName}
            />
        </View>
    );
}

ChangeNameScreen.propTypes = {
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
