import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import moment from "moment";
import globalStyles from "../globalStyles";
import { editMessage } from "@xxjonakadiptaxx/jak_javascript_package";
import { Entypo } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    id: string;
    title: string;
    message: string;
    timestamp: any;
    canDelete?: boolean;
}

const Notification = ({ id, title, message, timestamp, canDelete }: Props) => {
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

export default Notification;
