import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
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
        </View>
    );
};

GetStartedScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default GetStartedScreen;

const styles = StyleSheet.create({
    container: {},
});
