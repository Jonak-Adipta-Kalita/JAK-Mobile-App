import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../../../firebase";
import firebase from "firebase";
import globalStyles from "../../../globalStyles";
import LoadingIndicator from "../../../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPrivateNotification from "../../../notify/privateNotification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";
import PropTypes from "prop-types";

const ChangeNameScreen = ({ navigation }) => {
    const [user, userLoading, userError] = useAuthState(auth);
    const [previousName, setPreviousName] = useState(user?.displayName);
    const [name, setName] = useState("");

    const changeName = () => {
        if (name === "") {
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
        } else if (name === previousName) {
            messageAlertShower(
                "Value same as Previous!!",
                "Its the same Name as your Previous!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else {
            user?.updateProfile({
                displayName: name,
            })
                .then(() => {
                    pushPrivateNotification(user?.uid, {
                        title: "Name Changed Successfully!!",
                        message: `Your Name has been Successfully Changed to ${name} from ${previousName}!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                })
                .then(() => {
                    db.collection("users").doc(user?.uid).set(
                        {
                            displayName: name,
                        },
                        { merge: true }
                    );
                })
                .then(() => {
                    setName("");
                    setPreviousName(name);
                    navigation.jumpTo("HomeDrawer");
                })
                .then(() => {
                    messageAlertShower(
                        "Name Changed Successfully!!",
                        "Your Name is Successfully Changed!!",
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
            title: "Change your Name!!",
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
                    type="text"
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <Button
                containerStyle={[globalStyles.button, styles.button]}
                title="Upgrade"
                onPress={changeName}
            />
        </View>
    );
};

ChangeNameScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ChangeNameScreen;

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
        marginTop: 10,
    },
});
