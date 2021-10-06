import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";

const GetStartedScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Get Started!!",
            headerStyle: { backgroundColor: "#3f7de0" },
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
                    containerStyle={styles.button}
                    title="Lets Goooo!!"
                    onPress={() => navigation.replace("Login")}
                />
            </View>
        </View>
    );
};

GetStartedScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
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
        width: 170,
        position: "absolute",
        marginTop: 650,
        alignSelf: "center",
        borderRadius: 20,
    },
});
