export type User = {
    displayName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoURL?: string;
    uid: string;
    todos: Todo[];
    qrcodes: QRCode[];
};

export type Todo = {
    id: string;
    value: string;
    timestamp: FieldValue;
};

export type QRCode = {
    image: string;
    value: string;
    timestamp: FieldValue;
};
