import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import messageAlertShower from "../utils/alertShowers/messageAlertShower";

const useExitAppBackHandler = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (Platform.OS === "android" && navigation.getId() === "Home") {
            const backAction = () => {
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
        }
    }, []);
};

export { useExitAppBackHandler };
