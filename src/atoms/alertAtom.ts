import { AlertData } from "@/@types/data";
import { atom } from "recoil";

export const alertDataState = atom<AlertData>({
    key: "alertDataState",
    default: {
        show: false,
        data: null,
    },
});
