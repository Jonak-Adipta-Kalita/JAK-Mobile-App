import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Notification from "../../components/Notification";
import PropTypes from "prop-types";

const notifications = [
    {
        id: 1,
        title: "First_Title",
        message: "First_Message",
    },
    {
        id: 2,
        title: "Second_Title",
        message: "Second_Message",
    },
];

export default function NotificationScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Notifications!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back to Home",
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
            {notifications?.map((notification) => (
                <Notification
                    key={notification.id}
                    title={notification.title}
                    message={notification.message}
                />
            ))}
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
