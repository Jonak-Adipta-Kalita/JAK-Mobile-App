export type User = {
    photoURL?: string;
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

export type OnboardingData = {
    id: number;
    title: string;
    description: string;
};
