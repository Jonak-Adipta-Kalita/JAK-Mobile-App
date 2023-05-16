import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import StatusBar from "../components/StatusBar";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingIndicator from "../components/Loading";
import moment from "moment";
import globalStyles from "../globalStyles";
import { editMessage } from "@xxjonakadiptaxx/jak_javascript_package";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, orderBy, query } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Notification = ({
    id,
    title,
    message,
    timestamp,
}: {
    id: string;
    title: string;
    message: string;
    timestamp: any;
}) => {
    const [user] = useAuthState(auth);

    const removeNotification = async () => {
        await deleteDoc(doc(db, "users", user?.uid!, "notifications", id));
    };

    const time = timestamp
        ? new editMessage(moment(timestamp.toDate()).fromNow()).toTitleCase()
        : "...";

    return <View className=""></View>;
};

const NotificationScreen = () => {
    const [user, userLoading, userError] = useAuthState(auth);
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

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
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1">
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                        className="-mt-[0.5px] ml-10"
                    >
                        <AntDesign
                            name="back"
                            size={24}
                            color={colorScheme === "dark" ? "#fff" : "#000000"}
                        />
                    </TouchableOpacity>
                    <Text
                        className={`m-5 mx-10 ml-6 flex-1 rounded-2xl ${
                            colorScheme == "dark"
                                ? "bg-[#272934] text-gray-200"
                                : "bg-white text-gray-900"
                        } p-2 px-0 text-center text-lg`}
                        style={globalStyles.font}
                    >
                        Notifications
                    </Text>
                </View>
                {notifications?.docs.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text
                            className={`self-center rounded-2xl ${
                                colorScheme == "dark"
                                    ? "bg-[#272934] text-gray-200"
                                    : "bg-white text-gray-900"
                            } p-5 text-center text-2xl`}
                            style={globalStyles.font}
                        >
                            No Notification(s)!!
                        </Text>
                    </View>
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
        </SafeAreaView>
    );
};

export default NotificationScreen;
