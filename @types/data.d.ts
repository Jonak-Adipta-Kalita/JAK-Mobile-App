import type { FieldValue } from "firebase/firestore";

export type User = {
    displayName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoURL: number;
    uid: string;
    notifications: Notification[];
};

export type Notification = {
    message: string;
    timestamp: FieldValue;
    title: string;
};
