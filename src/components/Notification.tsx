import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <Card containerStyle={{ position: "relative" }}>
                <Card.Title>{title}</Card.Title>
                <Card.Divider />
                <Text style={[globalStyles.font, styles.message]}>
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

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
    },
    message: {
        textAlign: "center",
        color: "#594d4c",
        marginBottom: 15,
    },
});
