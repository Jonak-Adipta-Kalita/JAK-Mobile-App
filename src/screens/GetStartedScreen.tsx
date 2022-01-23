import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import globalStyles from "../globalStyles";
import { useNavigation } from "@react-navigation/native";

const GetStartedScreen = () => {
    const navigation: any = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Get Started!!",
            headerStyle: {
                backgroundColor: "#3f7de0",
                fontFamily: "OtomanopeeOne",
            },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.mainView}>
                <Button
                    containerStyle={[globalStyles.button, styles.button]}
                    title="Lets Goooo!!"
                    onPress={() => navigation.replace("Login")}
                />
            </View>
        </View>
    );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
    container: {},
    mainView: {
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
    },
    button: {
        position: "absolute",
        marginTop: 650,
        alignSelf: "center",
    },
});
