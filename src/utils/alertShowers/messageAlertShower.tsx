import { Alert, AlertButton, Platform } from "react-native";

const messageAlertShower = (
    title: string,
    message: string,
    buttons: AlertButton[]
) => {
    return Platform.OS === "android" || Platform.OS === "ios"
        ? Alert.alert(title, message, buttons)
        : undefined;
};

export default messageAlertShower;
