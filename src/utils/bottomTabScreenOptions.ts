import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { ColorSchemeName } from "react-native";

export const bottomTabScreenOptions = (
    colorScheme: ColorSchemeName
): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        display: "flex",
        position: "absolute",
        bottom: 20,
        left: 25,
        right: 25,
        elevation: 10,
        backgroundColor: colorScheme === "dark" ? "#272934" : "#fff",
        borderRadius: 30,
        height: 90,
    },
    tabBarActiveTintColor: colorScheme === "dark" ? "skyblue" : "#02c8fa",
});
