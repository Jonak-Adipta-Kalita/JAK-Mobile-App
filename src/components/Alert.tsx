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
            contentStyle={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
            }}
            actionContainerStyle={{
                marginTop: 15,
                justifyContent: "space-evenly",
            }}
            title={title}
            message={message}
            titleStyle={{
                fontFamily: "Medium",
                fontSize: 16,
                color: scheme === "dark" ? "#ffffff" : "#000000",
                paddingHorizontal: 0,
            }}
            messageStyle={{
                ...globalStyles.font,
                fontSize: 14.5,
                color: scheme === "dark" ? "#ffffff" : "#000000",
            }}
            showConfirmButton
            showCancelButton={alertData.data?.buttons[1] ? true : false}
            confirmText={alertData.data?.buttons[0].text}
            cancelText={
                alertData.data?.buttons[1] && alertData.data?.buttons[1].text
            }
            onConfirmPressed={() => {
                alertData.data?.buttons[0].onPress?.();
                setAlertData({ data: null, show: false });
            }}
            onCancelPressed={() => {
                alertData.data?.buttons[1] &&
                    alertData.data?.buttons[1].onPress?.();
                alertData.data?.buttons[1] &&
                    setAlertData({ data: null, show: false });
            }}
            confirmButtonColor={scheme === "dark" ? "#2a2a2a" : "#ffffff"}
            cancelButtonColor={scheme === "dark" ? "#2a2a2a" : "#ffffff"}
            confirmButtonTextStyle={{
                fontFamily: "Bold",
                fontSize: 14,
                color: scheme === "dark" ? "#ffffff" : "#2a2a2a",
            }}
            cancelButtonTextStyle={{
                fontFamily: "Bold",
                fontSize: 14,
                color: scheme === "dark" ? "#ffffff" : "#2a2a2a",
            }}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
        />
    );
};

export default Alert;
