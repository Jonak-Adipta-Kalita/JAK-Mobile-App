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
                <View style={styles.imageContainer}></View>
                <Button style={styles.button} title="Lets Goooo!!" />
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
    mainView: {},
    imageContainer: {},
    buttonContainer: {},
});
