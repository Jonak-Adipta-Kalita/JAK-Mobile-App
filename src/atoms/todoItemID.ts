import { atom } from "recoil";

export const todoItemID = atom<null | string>({
    key: "todoItemID",
    default: null,
});
