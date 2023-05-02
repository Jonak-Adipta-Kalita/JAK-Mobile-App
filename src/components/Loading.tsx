import React from "react";
import {
    View,
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
                {
                    backgroundColor:
                        colorScheme === "dark" ? "#413f44" : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
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
