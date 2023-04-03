import React from "react";
import { View, ScrollView, Text, useColorScheme } from "react-native";
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { collection, orderBy, query } from "firebase/firestore";

const PublicScreen = () => {
    const scheme = useColorScheme();

    const [notifications, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "publicNotifications"),
            orderBy("timestamp", "desc")
        )
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
        <View>
            {notifications?.docs.length === 0 ? (
                <Text
                    className={`text-bold mt-5 self-center text-lg ${
                        scheme === "dark" ? "text-white" : "text-black"
                    }`}
                >
                    No Notification(s)!!
                </Text>
            ) : (
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
            )}
        </View>
    );
};

export default PublicScreen;
