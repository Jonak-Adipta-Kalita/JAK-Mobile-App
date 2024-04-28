import { User } from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";
import { userRef } from "./refs";

export const checkAncestoryDoc = async (user: User) => {
    const documentDoc = userRef(user.uid!);

    if (!(await getDoc(documentDoc)).exists()) {
        await setDoc(documentDoc, {});
    }
};
