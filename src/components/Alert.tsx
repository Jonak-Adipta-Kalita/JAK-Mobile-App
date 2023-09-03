import React, { useEffect, useState } from "react";
import globalStyles from "@utils/globalStyles";
import AwesomeAlert from "react-native-awesome-alerts";
import { alertDataState } from "@atoms/alertAtom";
import { useRecoilState } from "recoil";
import { useColorScheme } from "react-native";

const Alert = () => {
    const [alertData, setAlertData] = useRecoilState(alertDataState);
    const scheme = useColorScheme();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        alertData.data && setTitle(alertData.data.title);
        alertData.data && setMessage(alertData.data.message);
    }, [alertData]);

    return (
        <AwesomeAlert
            show={alertData.show}
            onDismiss={() => setAlertData({ data: null, show: false })}
            contentContainerStyle={{
                backgroundColor: scheme === "dark" ? "#2a2a2a" : "#ffffff",
                borderRadius: 2,
                width: "90%",
            }}
            title={title}
            message={message}
            titleStyle={{
                fontFamily: "Medium",
                fontSize: 16,
                color: scheme === "dark" ? "#ffffff" : "#000000",
            }}
            messageStyle={{
                ...globalStyles.font,
                fontSize: 14,
                color: scheme === "dark" ? "#ffffff" : "#000000",
            }}
            showConfirmButton
            showCancelButton
            confirmText={alertData.data?.buttons[0].text}
            cancelText={alertData.data?.buttons[1].text}
            onConfirmPressed={() => {
                alertData.data?.buttons[0].onPress?.();
                setAlertData({ data: null, show: false });
            }}
            onCancelPressed={() => {
                alertData.data?.buttons[1].onPress?.();
                setAlertData({ data: null, show: false });
            }}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
        />
    );
};

export default Alert;
