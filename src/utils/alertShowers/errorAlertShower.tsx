import { Alert, Platform } from "react-native";

const errorAlertShower = (error: any) => {
    if (Platform.OS === "web") {
        return alert(error.message);
    } else if (Platform.OS === "android" || Platform.OS === "ios") {
        return Alert.alert(`${error.code} - ${error.title}`, error.message, [
            {
                text: "OK",
                onPress: () => null,
            },
        ]);
    }
};

export default errorAlertShower;
