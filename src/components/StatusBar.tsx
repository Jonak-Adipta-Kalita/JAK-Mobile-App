import { StatusBar as StatusBarExpo } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";

const StatusBar = () => {
    const colorScheme = useColorScheme();

    return (
        <StatusBarExpo
            style={colorScheme === "dark" ? "light" : "dark"}
            animated={true}
            translucent={true}
        />
    );
};

export default StatusBar;
