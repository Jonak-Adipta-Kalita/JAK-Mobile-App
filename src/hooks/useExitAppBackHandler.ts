import React from "react";
import { BackHandler, Platform } from "react-native";
import messageAlertShower from "@utils/alertShowers/messageAlertShower";
import { useFocusEffect } from "@react-navigation/native";

const useExitAppBackHandler = () => {
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                if (Platform.OS !== "android") {
                    return false;
                }

                messageAlertShower(
                    "Exit App!!",
                    "Hold on. Are you sure you want to Exit?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel",
                        },
                        { text: "Yes", onPress: () => BackHandler.exitApp() },
                    ]
                );
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    backAction
                );
        }, [])
    );
};

export { useExitAppBackHandler };
