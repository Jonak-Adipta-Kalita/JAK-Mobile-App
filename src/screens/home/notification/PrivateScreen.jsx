import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { db, auth } from "../../../firebase";
import PropTypes from "prop-types";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateScreen = ({ navigation }) => {
    const [user] = useAuthState(auth);
    const [notifications, loading, error] = useCollection(
        db
            .collection("users")
            .doc(user?.uid)
            .collection("notifications")
            .orderBy("timestamp", "desc")
    );

    if (error) {
        Alert.alert("Error Occured", error.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ]);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Private!!",
        });
    }, [navigation]);

    if (loading) {
        return <LoadingIndicator dimensions={styles.dimensions} />;
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {notifications?.docs?.map((notification) => (
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        title={notification.data().title}
                        message={notification.data().message}
                        timestamp={notification.data().timestamp}
                    />
                ))}
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
    dimensions: {
        width: 70,
        height: 70,
    },
});
