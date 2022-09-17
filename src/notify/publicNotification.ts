import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import schedulePushNotification from "../utils/pushNotification/scheduleForPushNotification";

interface Data {
    title: string;
    message: string;
    timestamp: any;
}

const pushPublicNotification = async (data: Data) => {
    await schedulePushNotification(data?.title, data?.message, data, null);

    return addDoc(collection(db, "publicNotifications"), data);
};

export default pushPublicNotification;
