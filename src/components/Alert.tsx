import React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { alertDataState } from "../atoms/alertAtom";

const Alert = () => {
    const alertData = useRecoilValue(alertDataState);

    return <View></View>;
};

export default Alert;
