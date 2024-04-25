import { collection, doc } from "firebase/firestore";
import { db } from ".";

export const usersRef = () => collection(db, "users");
export const userRef = (userId: string) => doc(usersRef(), userId);

export const qrCodesRef = (userId: string) =>
    collection(userRef(userId), "qrcodes");
export const qrCodeRef = (userId: string, qrcodeId: string) =>
    doc(qrCodesRef(userId), qrcodeId);

export const todosRef = (userId: string) =>
    collection(userRef(userId), "todos");
export const todoRef = (userId: string, todoId: string) =>
    doc(todosRef(userId), todoId);
