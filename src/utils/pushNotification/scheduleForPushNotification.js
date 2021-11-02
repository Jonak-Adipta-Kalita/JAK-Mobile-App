import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import PropTypes from "prop-types";

const schedulePushNotification = async (title, body, data) => {
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

schedulePushNotification.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    data: PropTypes.object,
};

export default schedulePushNotification;
