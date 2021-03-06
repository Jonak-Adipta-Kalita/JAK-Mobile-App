import { Alert, AlertButton, Platform } from "react-native";

const messageAlertShower = (
    title: string,
    message: string,
    buttons: AlertButton[]
) => {
    if (Platform.OS === "web") {
        return alert(message);
    } else if (Platform.OS === "android" || Platform.OS === "ios") {
        return Alert.alert(title, message, buttons);
    }
};

export default messageAlertShower;
