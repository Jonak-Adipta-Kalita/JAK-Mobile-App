import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../../../firebase";
import firebase from "firebase";
import globalStyles from "../../../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "../../../components/Loading";
import pushPrivateNotification from "../../../notify/privateNotification";
import PropTypes from "prop-types";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";

const ChangeEmailScreen = ({ navigation }) => {
    const [user, userLoading, userError] = useAuthState(auth);
    const [previousEmail, setPreviousEmail] = useState(user?.email);
    const [email, setEmail] = useState("");

    const changeEmail = () => {
        if (email === "") {
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
        } else if (email === previousEmail) {
            messageAlertShower(
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
                    pushPrivateNotification(user?.uid, {
                        title: "Email Changed Successfully!!",
                        message: `Your Email has been Successfully Changed to ${email} from ${previousEmail}!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                })
                .then(() => {
                    db.collection("users").doc(user?.uid).set(
                        {
                            email: email,
                        },
                        { merge: true }
                    );
                })
                .then(() => {
                    setEmail("");
                    setPreviousEmail(email);
                    navigation.jumpTo("HomeDrawer");
                })
                .then(() => {
                    messageAlertShower(
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
                    errorAlertShower(error);
                });
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change your Email!!",
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
