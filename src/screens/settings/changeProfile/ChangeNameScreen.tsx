import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
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
import { DrawerStackNavigationProps } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";
import StatusBar from "../../../components/StatusBar";

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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change your Name!!",
            headerLeft: () => <ArrowGoBack />,
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
            <StatusBar />
            <View className="w-[350px]">
                <Input
                    placeholder="Name"
                    autoFocus
                    inputStyle={globalStyles.inputBar}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoComplete={"name"}
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
