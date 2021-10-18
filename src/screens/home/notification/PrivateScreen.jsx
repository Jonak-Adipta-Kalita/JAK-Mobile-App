import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { db, auth } from "../../../firebase";
import PropTypes from "prop-types";
import Notification from "../../../components/Notification";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateScreen = ({ navigation }) => {
	const [user] = useAuthState(auth);
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        db.collection("users")
			.doc(user?.uid)
			.collection("notifications")
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
            title: "Private!!",
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <ScrollView>
                {notifications?.map(({ id, data }) => {
                    const { title, message, timestamp, user } = data;
                    if (user === user?.email) {
                        return (
                            <Notification
                                key={id}
                                id={id}
                                title={title}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                            />
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
};

PrivateScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default PrivateScreen;

const styles = StyleSheet.create({
    container: {},
});
