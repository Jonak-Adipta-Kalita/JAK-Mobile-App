import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const checkAncestoryDoc = async (user: User) => {
    const documentDoc = doc(db, "users", user?.uid!);
    if (!(await getDoc(documentDoc)).exists()) {
        await setDoc(documentDoc, {});
    }
};
