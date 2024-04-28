import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { alertDataState } from "@atoms/alertAtom";
import { useAtom } from "jotai";
import { useColorScheme, View, ActivityIndicator } from "react-native";

const Alert = () => {
    const [alertData, setAlertData] = useAtom(alertDataState);
    const scheme = useColorScheme();

    return (
        <AwesomeAlert
            show={alertData.show}
            customView={
                !alertData.data && (
                    <View className="flex items-center justify-center flex-1 w-full h-full py-10">
                        <ActivityIndicator size="large" />
                    </View>
                )
            }
            onDismiss={() => setAlertData({ data: null, show: false })}
            contentContainerStyle={{
                backgroundColor: scheme === "dark" ? "#2a2a2a" : "#ffffff",
                borderRadius: 2,
                width: "95%",
            }}
            contentStyle={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
            }}
            actionContainerStyle={{
                marginTop: 15,
                justifyContent: "space-evenly",
            }}
            title={alertData.data?.title}
            message={alertData.data?.message}
            titleStyle={{
                fontWeight: "500",
                fontSize: 16,
                color: scheme === "dark" ? "#ffffff" : "#000000",
                paddingHorizontal: 0,
            }}
            messageStyle={{
                fontSize: 14.5,
                color: scheme === "dark" ? "#ffffff" : "#000000",
            }}
            showConfirmButton={alertData.data?.buttons[0] ? true : false}
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
                fontWeight: "bold",
                fontSize: 14,
                color: scheme === "dark" ? "#ffffff" : "#2a2a2a",
            }}
            cancelButtonTextStyle={{
                fontWeight: "bold",
                fontSize: 14,
                color: scheme === "dark" ? "#ffffff" : "#2a2a2a",
            }}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
        />
    );
};

export default Alert;
