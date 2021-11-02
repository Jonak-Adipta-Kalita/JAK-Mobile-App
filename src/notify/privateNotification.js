import { db } from "../firebase";
import PropTypes from "prop-types";
import schedulePushNotification from "../utils/pushNotification/scheduleForPushNotification";

const pushPrivateNotification = async (userUID, data) => {
	await schedulePushNotification(data?.title, data?.message, data);

    return db
        .collection("users")
        .doc(userUID)
        .collection("notifications")
        .add(data);
};

pushPrivateNotification.propTypes = {
    userUID: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default pushPrivateNotification;
