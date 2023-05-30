import {
    StyleSheet,
    Appearance,
    Platform,
    ViewStyle,
    TextStyle,
} from "react-native";

const colorScheme = Appearance.getColorScheme();

export default StyleSheet.create<{
    button: ViewStyle;
    font: TextStyle;
    inputBar: TextStyle;
    inputBarIcon: TextStyle;
    showPasswordContainer: ViewStyle;
    showPasswordIcon: TextStyle;
    headerIcon: ViewStyle;
}>({
    button: {
        width: 150,
        borderRadius: 20,
    },
    font: {
        fontFamily: "Lato",
    },
    inputBar: {
        padding: 10,
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    inputBarIcon: {
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
    headerIcon: {
        alignItems: "flex-end",
        margin: 20,
        marginBottom: 5,
    },
});
