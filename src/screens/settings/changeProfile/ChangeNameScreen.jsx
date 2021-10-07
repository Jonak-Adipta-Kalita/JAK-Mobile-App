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
import PropTypes from "prop-types";

const ChangeNameScreen = ({ navigation }) => {
    const [previousName, setPreviousName] = useState(
        auth?.currentUser?.displayName
    );
    const [name, setName] = useState("");
    const changeName = () => {
        if (name === "") {
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
        } else if (name === previousName) {
            Alert.alert(
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
            auth.currentUser
                .updateProfile({
                    displayName: name,
                })
                .then(() => {
                    db.collection("privateNotifications").add({
                        title: "Name Changed Successfully!!",
                        message: `Your Name has been Successfully Changed to ${name} from ${previousName}!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        user: auth?.currentUser?.email,
                    });
                })
                .then(() => {
                    setName("");
                    setPreviousName(name);
                    navigation.jumpTo("Home");
                })
                .then(() => {
                    Alert.alert(
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
