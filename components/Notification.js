import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import moment from "moment";
import propTypes from "prop-types";

function titleCase(string) {
    let sentence = string.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    return sentence.join(" ");
}

export default function Notification({ title, message, timestamp }) {
    return (
        <View style={styles.container}>
            <Card style={{ position: "relative" }}>
                <Card.Title>{title}</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center", color: "#594d4c" }}>
                    {message}
                </Text>
                <br />
                <Card.Divider />
                <br />
                <Text
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "#43484D",
                        fonSize: "12.08px",
                        fontWeight: "bold",
                    }}
                >
                    {timestamp
                        ? titleCase(moment(timestamp.toDate()).fromNow())
                        : "..."}
                </Text>
            </Card>
        </View>
    );
}

Notification.propTypes = {
    title: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
    timestamp: propTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});
