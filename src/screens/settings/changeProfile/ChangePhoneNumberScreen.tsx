import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPrivateNotification from "../../../notify/privateNotification";
import globalStyles from "../../../globalStyles";
import LoadingIndicator from "../../../components/Loading";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const ChangePhoneNumberScreen = () => {
    const navigation: any = useNavigation();
    const [user, userLoading, userError] = useAuthState(auth);
    const [previousPhoneNumber, setPreviousPhoneNumber] = useState(
        user?.phoneNumber
    );
    const [phoneNumber, setPhoneNumber] = useState("");

    const changePhoneNumber = () => {
        if (phoneNumber === "") {
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
        } else if (phoneNumber === previousPhoneNumber) {
            messageAlertShower(
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
            //TODO: Change Phone Number
            pushPrivateNotification(user.uid!, {
                title: "Phone Number Changed Successfully!!",
                message: `Your Phone Number has been Successfully Changed to ${phoneNumber} from ${previousPhoneNumber}!!`,
                timestamp: serverTimestamp(),
            })
                .then(() => {
                    setDoc(
                        doc(db, "users", user?.uid),
                        {
                            phoneNumber: phoneNumber,
                        },
                        {
                            merge: true,
                        }
                    );
                })
                .then(() => {
                    setPhoneNumber("");
                    setPreviousPhoneNumber(phoneNumber);
                    navigation.jumpTo("HomeDrawer");
                })
                .then(() => {
                    messageAlertShower(
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
                    errorAlertShower(error);
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
                    placeholder="Phone Number (Use Country Code)"
                    autoFocus
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    autoCompleteType={"tel"}
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
    inputBar: {},
});
