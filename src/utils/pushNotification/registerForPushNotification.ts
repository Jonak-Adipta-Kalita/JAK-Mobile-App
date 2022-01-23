import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

const registerForPushNotifications = async () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;
    }
};

export default registerForPushNotifications;
