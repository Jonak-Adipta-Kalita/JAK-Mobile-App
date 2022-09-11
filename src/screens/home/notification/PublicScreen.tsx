import React, { useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { useNavigation } from "@react-navigation/native";
import { collection, orderBy, query } from "firebase/firestore";
import { NavigationPropsTopTab } from "../../../../@types/navigation";

const PublicScreen = () => {
    const navigation = useNavigation<NavigationPropsTopTab>();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Public!!",
        });
    }, [navigation]);

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
