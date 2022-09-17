import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const schedulePushNotification = async (
    title: string,
    body: string,
    data: any,
    userUID: string | null
) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: data,
            },
            trigger: { seconds: 2, channelId: userUID || "default" },
        });
    }
};

export default schedulePushNotification;
