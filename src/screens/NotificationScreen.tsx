import React from "react";
import { View, useColorScheme, Text, ScrollView } from "react-native";
import StatusBar from "../components/StatusBar";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../components/Loading";
import Notification from "../components/Notification";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, orderBy, query } from "firebase/firestore";

const NotificationScreen = () => {
    const [user, userLoading, userError] = useAuthState(auth);
    const scheme = useColorScheme();

    const [notifications, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "notifications"),
            orderBy("timestamp", "desc")
        )
    );

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
        <View className="mb-[10px]">
            <StatusBar />
            <View style={{ height: "100%" }}>
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
                                    canDelete={true}
                                />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    );
};

export default NotificationScreen;
