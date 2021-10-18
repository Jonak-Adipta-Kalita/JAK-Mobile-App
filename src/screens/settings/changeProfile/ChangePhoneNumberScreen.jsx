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
import { auth, db } from "../../../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import globalStyles from "../../../globalStyles";
import PropTypes from "prop-types";

const ChangePhoneNumberScreen = ({ navigation }) => {
	const [user] = useAuthState(auth);
    const [previousPhoneNumber, setPreviousPhoneNumber] = useState(
        user?.phoneNumber
    );
    const [phoneNumber, setPhoneNumber] = useState("");
    const changePhoneNumber = () => {
        if (phoneNumber === "") {
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
        } else if (phoneNumber === previousPhoneNumber) {
            Alert.alert(
                "Value same as Previous!!",
                "Its the same Phone Number as your Previous!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else {
            //TODO: Change or Set Phone Number
            db.collection("users")
				.doc(user?.uid)
				.collection("notifications")
                .add({
                    title: "Phone Number Changed Successfully!!",
                    message: `Your Phone Number has been Successfully Changed to ${phoneNumber} from ${previousPhoneNumber}!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                    setPhoneNumber("");
                    setPreviousPhoneNumber(phoneNumber);
                    navigation.jumpTo("Home");
                })
                .then(() => {
                    Alert.alert(
                        "Phone Number Changed Successfully!!",
                        "Your Phone Number is Successfully Changed!!",
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
            title: `${
                user?.phoneNumber
                    ? "Change your Phone Number!!"
                    : "Set your Phone Number!!"
            }`,
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
                    placeholder="Phone Number (Use Country Code)"
                    autoFocus
                    type="text"
                    style={styles.inputBar}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <Button
                containerStyle={[globalStyles.button, styles.button]}
                title="Upgrade"
                onPress={changePhoneNumber}
            />
        </View>
    );
};

ChangePhoneNumberScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ChangePhoneNumberScreen;

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
