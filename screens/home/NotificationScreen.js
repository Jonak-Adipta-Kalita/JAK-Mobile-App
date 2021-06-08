import React, { useLayoutEffect, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Notification from "../../components/Notification";
import { db } from "../../firebase";
import PropTypes from "prop-types";

export default function NotificationScreen({ navigation }) {
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        db.collection("notifications")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setNotifications(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
    }, []);
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
            {notifications?.map(({ id, data }) => {
                const { title, message, timestamp } = data;
                return (
                    <Notification
                        key={id}
                        id={id}
                        title={title}
                        message={message}
                        timestamp={timestamp}
                    />
                );
            })}
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
