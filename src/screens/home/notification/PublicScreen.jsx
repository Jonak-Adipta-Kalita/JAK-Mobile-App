import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { db } from "../../../firebase";
import PropTypes from "prop-types";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";

const PublicScreen = ({ navigation }) => {
	useLayoutEffect(() => {
        navigation.setOptions({
            title: "Public!!",
        });
    }, [navigation]);

    const [notifications, loading, error] = useCollectionOnce(
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
