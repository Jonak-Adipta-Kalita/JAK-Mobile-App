import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { db, auth } from "../../../firebase";
import PropTypes from "prop-types";
import Notification from "../../../components/Notification";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";

const PrivateScreen = ({ navigation }) => {
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
    if (!loading) {
        return <LoadingIndicator dimensions={styles.dimensions} />;
    }
    const [user] = useAuthState(auth);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Private!!",
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <ScrollView>
                {notifications?.map(({ id, data }) => {
                    const { title, message, timestamp } = data;
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
    dimensions: {
        width: 70,
        height: 70,
    },
});
