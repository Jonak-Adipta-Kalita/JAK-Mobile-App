import { db } from "../firebase";
import propTypes from "prop-types";
import { schedulePushNotification } from "../pushNotification/schedule";

const pushPrivateNotification = async (userUID, data) => {
    await schedulePushNotification({
        title: data?.title,
        body: data?.message,
        data: data,
    });

    return db
        .collection("users")
        .doc(userUID)
        .collection("notifications")
        .add(data);
};

pushPrivateNotification.propTypes = {
    userUID: propTypes.string.isRequired,
    data: propTypes.object.isRequired,
};

export default pushPrivateNotification;
