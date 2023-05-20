import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import messageAlertShower from "../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";

const useExitAppBackHandler = (navigationID: string) => {
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
            if (
                Platform.OS === "android" &&
                navigation.getId() !== navigationID
            ) {
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

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
};

export { useExitAppBackHandler };
