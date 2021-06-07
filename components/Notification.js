import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import propTypes from "prop-types";

export default function Notification({ title, message }) {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>{title}</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center" }}>{message}</Text>
            </Card>
        </View>
    );
}

Notification.propTypes = {
    title: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});
