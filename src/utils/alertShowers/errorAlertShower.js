import { Alert, Platform } from "react-native";
import PropTypes from "prop-types";

const errorAlertShower = (error) => {
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

errorAlertShower.propTypes = {
    error: PropTypes.object.isRequired,
};

export default errorAlertShower;
