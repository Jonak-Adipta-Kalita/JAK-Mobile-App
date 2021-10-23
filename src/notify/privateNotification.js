import { db } from "../firebase";
import propTypes from "prop-types";

const pushPrivateNotification = (userUID, data) => {
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
