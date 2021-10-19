import { StyleSheet, Appearance } from "react-native";

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
        color: colorScheme === "dark" && "#fff",
    },
    text: {
        color: colorScheme === "dark" && "#fff",
    },
});
