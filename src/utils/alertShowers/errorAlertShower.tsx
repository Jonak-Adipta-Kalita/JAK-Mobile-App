import { Alert, Platform } from "react-native";

const errorAlertShower = (error: any) => {
    if (!error) return;

    if (Platform.OS === "android" || Platform.OS === "ios") {
        return Alert.alert(
            `${
                error.code && error.title
                    ? `${error.code} - ${error.title}`
                    : "Error"
            }`,
            error.message,
            [
                {
                    text: "OK",
                    onPress: () => null,
                },
            ]
        );
    } else {
        return;
    }
};

export default errorAlertShower;
