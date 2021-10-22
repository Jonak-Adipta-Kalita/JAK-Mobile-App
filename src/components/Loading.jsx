import React from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    useColorScheme,
} from "react-native";
import PropTypes from "prop-types";

const LoadingIndicator = ({ containerStyle, dimensions }) => {
    const colorScheme = useColorScheme();

    return (
        <View
            style={[
                containerStyle,
                styles.container,
                {
                    backgroundColor:
                        colorScheme === "dark" ? "#202124" : "#fff",
                },
            ]}
        >
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
