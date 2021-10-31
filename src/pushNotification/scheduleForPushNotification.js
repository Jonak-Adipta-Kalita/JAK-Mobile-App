import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const schedulePushNotification = async ({ title, body, data }) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: data,
            },
            trigger: { seconds: 2 },
        });
    }
};
