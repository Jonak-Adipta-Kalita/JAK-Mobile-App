import { AlertButton } from "react-native";

export type User = {
    photoURL?: string;
    todos: Todo[];
    qrcodes: QRCode[];
};

export type Todo = {
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

export type AlertData = {
    show: boolean;
    data: {
        title: string;
        message: string;
        buttons: [AlertButton, AlertButton] | [AlertButton];
    } | null;
};
