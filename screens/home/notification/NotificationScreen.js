import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NotificationTopTab } from "../../../navigation/TopTabNavigator";
import PropTypes from "prop-types";

export default function NotificationScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Notifications!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ height: "100%" }}>
                <NotificationTopTab />
            </View>
        </View>
    );
}

NotificationScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});
