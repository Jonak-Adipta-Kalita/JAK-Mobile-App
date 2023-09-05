import { StyleSheet, Appearance, ViewStyle, TextStyle } from "react-native";

const colorScheme = Appearance.getColorScheme();

export default StyleSheet.create<{
    button: ViewStyle;
    font: TextStyle;
    inputIconContainer: ViewStyle;
    inputBarContainer: ViewStyle;
    inputBar: TextStyle;
    inputBarIcon: TextStyle;
    headerIcon: ViewStyle;
}>({
    button: {
        width: 150,
        borderRadius: 20,
    },
    font: {
        fontFamily: "Regular",
    },
    inputIconContainer: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 4,
        marginVertical: 4,
    },
    inputBarContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        alignItems: "center",
        borderColor: "#86939e",
        marginLeft: 10,
        marginRight: 10,
    },
    inputBar: {
        fontSize: 18,
        flex: 1,
        minHeight: 40,
        padding: 10,
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    inputBarIcon: {
        color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    headerIcon: {
        alignItems: "flex-end",
        marginBottom: 5,
    },
});
