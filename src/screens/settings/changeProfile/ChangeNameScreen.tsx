import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { db, auth } from "../../../firebase";
import globalStyles from "../../../globalStyles";
import LoadingIndicator from "../../../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPrivateNotification from "../../../notify/privateNotification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useTailwind } from "tailwindcss-react-native";

const ChangeNameScreen = () => {
    const navigation: any = useNavigation();
    const [user, userLoading, userError] = useAuthState(auth);
    const [previousName, setPreviousName] = useState(user?.displayName);
    const [name, setName] = useState("");
    const tailwind = useTailwind<ViewStyle | TextStyle | ImageStyle>();

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
        <View
            style={[
                tailwind("flex-1 items-center"),
                { padding: 10, marginTop: 20 },
            ]}
        >
            <StatusBar style="auto" />
            <View
                style={{
                    width: 350,
                }}
            >
                <Input
                    placeholder="Name"
                    autoFocus
                    inputStyle={globalStyles.inputBar}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCompleteType={"name"}
                />
            </View>
            <Button
                containerStyle={[globalStyles.button, { marginTop: 10 }]}
                title="Upgrade"
                onPress={changeName}
            />
        </View>
    );
};

export default ChangeNameScreen;
