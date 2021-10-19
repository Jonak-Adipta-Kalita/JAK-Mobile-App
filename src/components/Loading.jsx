import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

const LoadingIndicator = ({ dimensions }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" style={dimensions} color="blue" />
        </View>
    );
};

LoadingIndicator.propTypes = {
    dimensions: PropTypes.object.isRequired,
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {},
});
