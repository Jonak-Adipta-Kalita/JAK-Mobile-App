import React, { useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../../../components/Loading";
import Notification from "../../../components/Notification";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { useAuthState } from "../../../hooks/auth/useAuthState";
import { useNavigation } from "@react-navigation/native";
import { collection, orderBy, query } from "firebase/firestore";
import { NavigationPropsTopTab } from "../../../../@types/navigation";

const PrivateScreen = () => {
    const navigation = useNavigation<NavigationPropsTopTab>();
    const { user, isLoading: userLoading, error: userError } = useAuthState();

    const [notifications, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "notifications"),
            orderBy("timestamp", "desc")
        )
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

export default PrivateScreen;
