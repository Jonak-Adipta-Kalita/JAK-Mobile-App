import React from "react";
import { View, Text } from "react-native";
import { useRecoilValue } from "recoil";
import { alertDataState } from "../atoms/alertAtom";

const Alert = () => {
    const alertData = useRecoilValue(alertDataState);

    return (
        <View>
            <Text>{alertData.data?.title}</Text>
            <Text>{alertData.data?.message}</Text>
        </View>
    );
};

export default Alert;
