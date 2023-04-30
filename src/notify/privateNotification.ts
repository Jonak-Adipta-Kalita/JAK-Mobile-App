import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import schedulePushNotification from "../utils/pushNotification/scheduleForPushNotification";
import { Notification } from "../../@types/data";

const pushPrivateNotification = async (userUID: string, data: Notification) => {
    await schedulePushNotification(data?.title, data?.message, data, userUID);

    return addDoc(collection(db, "users", userUID, "notifications"), data);
};

export default pushPrivateNotification;
