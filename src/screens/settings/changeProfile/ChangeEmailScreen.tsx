import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../../../firebase";
import globalStyles from "../../../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "../../../components/Loading";
import pushPrivateNotification from "../../../notify/privateNotification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";

const ChangeEmailScreen = () => {
    const navigation: any = useNavigation();
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
            updateEmail(user!, email)
                .then(() => {
                    pushPrivateNotification(user?.uid!, {
                        title: "Email Changed Successfully!!",
                        message: `Your Email has been Successfully Changed to ${email} from ${previousEmail}!!`,
                        timestamp: serverTimestamp(),
                    });
                })
                .then(() => {
                    setDoc(
                        doc(db, "users", user?.uid!),
                        {
                            email: email,
                        },
                        {
                            merge: true,
                        }
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
                <SafeAreaView className="flex-1">
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
        <View className="mt-[20px] flex-1 items-center p-[10px]">
            <StatusBar style="auto" />
            <View className="w-[350px]">
                <Input
                    placeholder="Email"
                    autoFocus
                    inputStyle={[globalStyles.inputBar]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCompleteType={"email"}
                />
            </View>
            <Button
                containerStyle={[
                    globalStyles.button,
                    { marginTop: 10, width: 200 },
                ]}
                title="Upgrade"
                onPress={changeEmail}
            />
        </View>
    );
};

export default ChangeEmailScreen;
