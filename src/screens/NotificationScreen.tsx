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
import { Card } from "@rneui/themed";
import moment from "moment";
import globalStyles from "../globalStyles";
import { editMessage } from "@xxjonakadiptaxx/jak_javascript_package";
import { Entypo, AntDesign } from "@expo/vector-icons";
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
    canDelete,
}: {
    id: string;
    title: string;
    message: string;
    timestamp: any;
    canDelete?: boolean;
}) => {
    const [user] = useAuthState(auth);

    const removeNotification = async () => {
        await deleteDoc(doc(db, "users", user?.uid!, "notifications", id));
    };

    return (
        <View className="pb-[5px]">
            <Card containerStyle={{ position: "relative" }}>
                <View className="relative flex flex-row justify-center">
                    <Card.Title>{title} </Card.Title>
                    {canDelete && (
                        <TouchableOpacity
                            className="absolute right-0"
                            onPress={removeNotification}
                        >
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                </View>
                <Card.Divider />
                <Text
                    style={[
                        globalStyles.font,
                        {
                            color: "#594d4c",
                            marginBottom: 15,
                            textAlign: "center",
                        },
                    ]}
                >
                    {message}
                </Text>
                <Card.Divider />
                <Text style={{ color: "#43484D", fontWeight: "bold" }}>
                    {timestamp
                        ? new editMessage(
                              moment(timestamp.toDate()).fromNow()
                          ).toTitleCase()
                        : "..."}
                </Text>
            </Card>
        </View>
    );
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
                            className={`self-center rounded-2xl bg-gray-300 p-5 text-center text-2xl text-black`}
                        >
                            No Notification(s)!!
                        </Text>
                    </View>
                ) : (
                    <ScrollView>
                        {/* {notifications?.docs?.map((notification) => (
                            <Notification
                                key={notification.id}
                                id={notification.id}
                                title={notification.data().title}
                                message={notification.data().message}
                                timestamp={notification.data().timestamp}
                                canDelete={true}
                            />
                        ))} */}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

export default NotificationScreen;
