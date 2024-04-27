import React from "react";
import {
    View,
    ActivityIndicator,
    useColorScheme,
    ViewStyle,
    StyleProp,
} from "react-native";

interface Props {
    notInCenter?: boolean;
}

const LoadingIndicator = ({ notInCenter }: Props) => {
    const colorScheme = useColorScheme();

    return (
        <View
            style={[
                {
                    backgroundColor:
                        colorScheme === "dark" ? "#413f44" : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                },
                !notInCenter && { flex: 1 },
            ]}
        >
            <ActivityIndicator
                size="large"
                style={{ width: 70, height: 70 }}
                color="#0cccbf"
            />
        </View>
    );
};

export default LoadingIndicator;
