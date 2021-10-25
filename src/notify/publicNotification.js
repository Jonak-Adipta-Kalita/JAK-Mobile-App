import { db } from "../firebase";
import propTypes from "prop-types";
import { schedulePushNotification } from "../pushNotification/schedule";

const pushPublicNotification = async (data) => {
	await schedulePushNotification({
		title: data?.title,
		body: data?.message,
		data: data,
	});
	
    return db.collection("publicNotifications").add(data);
};

pushPublicNotification.propTypes = {
    data: propTypes.object.isRequired,
};

export default pushPublicNotification;
