import { db } from "../firebase";
import PropTypes from "prop-types";
import schedulePushNotification from "../utils/pushNotification/scheduleForPushNotification";

const pushPublicNotification = async (data) => {
    await schedulePushNotification(data?.title, data?.message, data);

    return db.collection("publicNotifications").add(data);
};

pushPublicNotification.propTypes = {
    data: PropTypes.object.isRequired,
};

export default pushPublicNotification;
