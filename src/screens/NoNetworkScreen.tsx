import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "@components/StatusBar";
import { Text, View, useColorScheme } from "react-native";
import globalStyles from "@utils/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";

const NoNetworkScreen = () => {
    const colorScheme = useColorScheme();

    useExitAppBackHandler();

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1 items-center justify-center">
                <View className="mt-[-40px]">
                    <Feather
                        name="wifi-off"
                        size={60}
                        color={colorScheme === "dark" ? "#E5E7EB" : "#111827"}
                    />
                </View>
                <Text
                    className={`self-center rounded-2xl ${
                        colorScheme == "dark"
                            ? "bg-[#272934] text-gray-200"
                            : "bg-white text-gray-900"
                    } mx-5 mt-10 p-5 text-center text-lg`}
                    style={globalStyles.font}
                >
                    No Network Connection. Try turning on your Mobile Data or
                    Wi-Fi. And re-open the app.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default NoNetworkScreen;
