import { Alert, Platform } from "react-native";
import PropTypes from "prop-types";

const messageAlertShower = (title, message, buttons) => {
    if (Platform.OS === "web") {
        return alert(message);
    } else if (Platform.OS === "android" || Platform.OS === "ios") {
        return Alert.alert(title, message, buttons);
    }
};

messageAlertShower.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    buttons: PropTypes.array,
};

export default messageAlertShower;
