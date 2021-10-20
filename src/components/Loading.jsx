import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

const LoadingIndicator = ({ containerStyle, dimensions }) => {
    return (
        <View style={[containerStyle, styles.container]}>
            <ActivityIndicator
                size="large"
                style={dimensions}
                color="#0cccbf"
            />
        </View>
    );
};

LoadingIndicator.propTypes = {
    dimensions: PropTypes.object.isRequired,
    containerStyle: PropTypes.object,
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});
