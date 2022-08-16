import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import moment from "moment";
import globalStyles from "../globalStyles";
import { editMessage } from "@xxjonakadiptaxx/jak_javascript_package";

interface Props {
    id: string;
    title: string;
    message: string;
    timestamp: any;
}

const Notification = ({ title, message, timestamp }: Props) => {
    return (
        <View className="pb-[5px]">
            <Card containerStyle={{ position: "relative" }}>
                <Card.Title>{title}</Card.Title>
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
