import { db } from "../firebase";
import schedulePushNotification from "../utils/pushNotification/scheduleForPushNotification";

const pushPrivateNotification = async (userUID: string, data: any) => {
    await schedulePushNotification(data?.title, data?.message, data);

    return db
        .collection("users")
        .doc(userUID)
        .collection("notifications")
        .add(data);
};

export default pushPrivateNotification;
