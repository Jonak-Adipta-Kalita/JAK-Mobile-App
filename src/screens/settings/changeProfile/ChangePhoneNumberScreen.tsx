import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPrivateNotification from "../../../notify/privateNotification";
import globalStyles from "../../../globalStyles";
import LoadingIndicator from "../../../components/Loading";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NavigationPropsDrawer } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";
import { useDocument } from "react-firebase-hooks/firestore";

const ChangePhoneNumberScreen = () => {
    const navigation = useNavigation<NavigationPropsDrawer>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [userData, userDataLoading, userDataError] = useDocument(
        doc(db, "users", user?.uid!)
    );
    const [previousPhoneNumber, setPreviousPhoneNumber] = useState(
        user?.phoneNumber || userData?.data()?.phoneNumber
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
            pushPrivateNotification(user?.uid!, {
                title: "Phone Number Changed Successfully!!",
                message: `Your Phone Number has been Successfully Changed to ${phoneNumber} ${
                    previousPhoneNumber ? `from ${previousPhoneNumber}!!` : ""
                }`,
                timestamp: serverTimestamp(),
            })
                .then(() => {
                    setDoc(
                        doc(db, "users", user?.uid!),
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
            title: `${previousPhoneNumber ? "Change" : "Set"} your Phone No.!!`,
            headerLeft: () => <ArrowGoBack />,
        });
    }, [navigation]);

    if (userError) errorAlertShower(userError);

    if (userDataError) errorAlertShower(userDataError);

    if (userLoading || userDataLoading) {
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
                    placeholder="Phone Number (Use Country Code)"
                    autoFocus
                    inputStyle={[globalStyles.inputBar]}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    autoComplete="tel"
                />
            </View>
            <Button
                containerStyle={[
                    globalStyles.button,
                    { marginTop: 10, width: 200 },
                ]}
                title="Upgrade"
                onPress={changePhoneNumber}
            />
        </View>
    );
};

export default ChangePhoneNumberScreen;
