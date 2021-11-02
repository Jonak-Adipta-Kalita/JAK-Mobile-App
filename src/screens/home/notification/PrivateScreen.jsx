import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { db, auth } from "../../../firebase";
import PropTypes from "prop-types";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateScreen = ({ navigation }) => {
    const [user, userLoading, userError] = useAuthState(auth);

    const [notifications, firestoreLoading, firestoreError] = useCollection(
        db
            .collection("users")
            .doc(user?.uid)
            .collection("notifications")
            .orderBy("timestamp", "desc")
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Private!!",
        });
    }, [navigation]);

    if (firestoreError || userError) {
        errorAlertShower(firestoreError || userError);
    }

    if (firestoreLoading || userLoading) {
        return (
            <LoadingIndicator
                containerStyle={{ flex: 1 }}
                dimensions={{ width: 70, height: 70 }}
            />
        );
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
});
