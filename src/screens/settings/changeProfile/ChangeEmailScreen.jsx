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
import { db, auth } from "../../../firebase";
import firebase from "firebase";
import globalStyles from "../../../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";

const ChangeEmailScreen = ({ navigation }) => {
    const [user] = useAuthState(auth);
    const [previousEmail, setPreviousEmail] = useState(user?.email);
    const [email, setEmail] = useState("");
    const changeEmail = () => {
        if (email === "") {
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
        } else if (email === previousEmail) {
            Alert.alert(
                "Value same as Previous!!",
                "Its the same Email Address as your Previous!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else {
            user?.updateEmail(email)
                .then(() => {
                    db.collection("users")
                        .doc(user?.uid)
                        .collection("notifications")
                        .add({
                            title: "Email Changed Successfully!!",
                            message: `Your Email has been Successfully Changed to ${email} from ${previousEmail}!!`,
                            timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                        });
                })
                .then(() => {
                    db.collection("users").doc(user?.uid).set({
                        email: email,
                    });
                })
                .then(() => {
                    setEmail("");
                    setPreviousEmail(email);
                    navigation.jumpTo("Home");
                })
                .then(() => {
                    Alert.alert(
                        "Email Changed Successfully!!",
                        "Your Email is Successfully Changed!!",
                        [
                            {
                                text: "OK",
                                onPress: () => {},
                            },
                        ]
                    );
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
                    placeholder="Email"
                    autoFocus
                    type="email"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <Button
                containerStyle={[globalStyles.button, styles.button]}
                title="Upgrade"
                onPress={changeEmail}
            />
        </View>
    );
};

ChangeEmailScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ChangeEmailScreen;

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
