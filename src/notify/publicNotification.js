import { db } from "../firebase";
import PropTypes from "prop-types";
import schedulePushNotification from "../utils/pushNotification/scheduleForPushNotification";

const pushPublicNotification = async (data) => {
    await schedulePushNotification({
        title: data?.title,
        body: data?.message,
        data: data,
    });

    return db.collection("publicNotifications").add(data);
};

pushPublicNotification.propTypes = {
    data: PropTypes.object.isRequired,
};

export default pushPublicNotification;
