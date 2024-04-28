import { AlertData } from "@/@types/data";
import { atom } from "jotai";

export const alertDataState = atom<AlertData>({
    show: false,
    data: null,
});
