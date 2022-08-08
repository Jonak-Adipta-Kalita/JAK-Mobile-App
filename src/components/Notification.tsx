import React from "react";
import { View, Text, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Card } from "react-native-elements";
import moment from "moment";
import globalStyles from "../globalStyles";
import { editMessage } from "@xxjonakadiptaxx/jak_javascript_package";
import { useTailwind } from "tailwindcss-react-native";

interface Props {
    id: string;
    title: string;
    message: string;
    timestamp: any;
}

const Notification = ({ title, message, timestamp }: Props) => {
    const tailwind = useTailwind<ViewStyle | TextStyle | ImageStyle>();

    return (
        <View style={{ paddingBottom: 5 }}>
            <Card containerStyle={{ position: "relative" }}>
                <Card.Title>{title}</Card.Title>
                <Card.Divider />
                <Text
                    style={[
                        globalStyles.font,
                        tailwind("text-center"),
                        { color: "#594d4c", marginBottom: 15 },
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
