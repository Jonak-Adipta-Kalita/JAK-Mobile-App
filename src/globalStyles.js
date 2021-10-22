import { StyleSheet, Appearance, Platform } from "react-native";

const colorScheme = Appearance.getColorScheme();

export default StyleSheet.create({
    button: {
        width: 150,
        borderRadius: 20,
    },
    font: {
        fontFamily: "OtomanopeeOne",
    },
    inputBar: {
        padding: 10,
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    inputBarIcon: {
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    text: {
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    showPasswordContainer: {
        position: "absolute",
        right: 15,
        bottom:
            Platform.OS === "android" ? 35 : Platform.OS === "ios" ? 35 : 17,
        height: 24,
        width: 24,
    },
    showPasswordIcon: {
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
});
