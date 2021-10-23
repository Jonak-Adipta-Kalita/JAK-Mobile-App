import { db } from "../firebase";
import propTypes from "prop-types";

const pushPublicNotification = (data) => {
    return db.collection("publicNotifications").add(data);
};

pushPublicNotification.propTypes = {
    data: propTypes.object.isRequired,
};

export default pushPublicNotification;
