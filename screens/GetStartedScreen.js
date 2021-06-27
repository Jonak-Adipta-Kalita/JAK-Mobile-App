import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function GetStartedScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Get Started!!",
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
        </View>
    );
}

GetStartedScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});
