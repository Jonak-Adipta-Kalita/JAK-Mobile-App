import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { db } from "./firebase";

export const checkAncestoryDoc = async (user: User) => {
    const documentDoc = doc(db, "users", user?.uid!);
};
