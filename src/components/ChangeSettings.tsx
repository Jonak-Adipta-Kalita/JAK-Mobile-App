import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { View } from "react-native";
import globalStyles from "../globalStyles";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../@types/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import LoadingIndicator from "./Loading";
import messageAlertShower from "../utils/alertShowers/messageAlertShower";
import { updateEmail, updateProfile } from "firebase/auth";
import pushPrivateNotification from "../notify/privateNotification";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const ChangeSettings = ({
    changeFunction,
    children,
    loading,
    error,
}: {
    changeFunction: () => void;
    children: React.ReactNode;
    loading: boolean;
    error: Error | undefined;
}) => {
    if (error) errorAlertShower(error);

    if (loading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <View>
            <View className="mt-[20px] flex-1 items-center p-[10px]">
                <StatusBar />
                <View className="w-[350px]">{children}</View>
                <Button
                    containerStyle={[globalStyles.button, { marginTop: 10 }]}
                    title="Upgrade"
                    onPress={changeFunction}
                />
            </View>
        </View>
    );
};

const ChangeNameScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
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
            updateProfile(user!, {
                displayName: name,
            })
                .then(() => {
                    pushPrivateNotification(user?.uid!, {
                        title: "Name Changed Successfully!!",
                        message: `Your Name has been Successfully Changed to ${name} from ${previousName}!!`,
                        timestamp: serverTimestamp(),
                    });
                })
                .then(() => {
                    setDoc(
                        doc(db, "users", user?.uid!),
                        {
                            displayName: name,
                        },
                        {
                            merge: true,
                        }
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

    return (
        <ChangeSettings
            changeFunction={changeName}
            error={userError}
            loading={userLoading}
        >
            <Input
                placeholder="Name"
                autoFocus
                inputStyle={globalStyles.inputBar}
                value={name}
                onChangeText={(text) => setName(text)}
                autoComplete={"name"}
            />
        </ChangeSettings>
    );
};

const ChangeEmailScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
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

    return (
        <ChangeSettings
            changeFunction={changeEmail}
            error={userError}
            loading={userLoading}
        >
            <Input
                placeholder="Email"
                autoFocus
                inputStyle={[globalStyles.inputBar]}
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoComplete={"email"}
            />
        </ChangeSettings>
    );
};

const ChangePhoneNumberScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
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
        });
    }, [navigation]);

    return (
        <ChangeSettings
            changeFunction={changePhoneNumber}
            loading={userLoading || userDataLoading}
            error={userError || userDataError}
        >
            <Input
                placeholder="Phone Number (Use Country Code)"
                autoFocus
                inputStyle={[globalStyles.inputBar]}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                autoComplete="tel"
            />
        </ChangeSettings>
    );
};

export { ChangeNameScreen, ChangeEmailScreen, ChangePhoneNumberScreen };
