import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { db } from "../../../firebase";
import PropTypes from "prop-types";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";

const PublicScreen = ({ navigation }) => {
    const [notifications, loading, error] = useCollection(
        db.collection("publicNotifications").orderBy("timestamp", "desc")
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
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Public!!",
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
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

PublicScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default PublicScreen;

const styles = StyleSheet.create({
    container: {},
    dimensions: {
        width: 70,
        height: 70,
    },
});
