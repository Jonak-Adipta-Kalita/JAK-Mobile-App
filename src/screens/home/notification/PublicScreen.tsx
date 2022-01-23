import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { useNavigation } from "@react-navigation/native";

const PublicScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Public!!",
        });
    }, [navigation]);

    const [notifications, firestoreLoading, firestoreError] = useCollection(
        db.collection("publicNotifications").orderBy("timestamp", "desc")
    );

    if (firestoreError) errorAlertShower(firestoreError);

    if (firestoreLoading) {
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

export default PublicScreen;

const styles = StyleSheet.create({
    container: {},
});
