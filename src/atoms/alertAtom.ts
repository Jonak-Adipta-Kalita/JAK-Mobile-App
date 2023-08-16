import { AlertData } from "@/@types/data";
import { atom } from "recoil";

export const alertAtomState = atom<AlertData>({
    key: "alertAtomState",
    default: {
        show: false,
        data: null,
    },
});
