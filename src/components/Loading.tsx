import React from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    useColorScheme,
    ViewStyle,
    StyleProp,
} from "react-native";

interface Props {
    containerStyle?: StyleProp<ViewStyle>;
    dimensions: StyleProp<ViewStyle>;
}

const LoadingIndicator = ({ containerStyle, dimensions }: Props) => {
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

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});
