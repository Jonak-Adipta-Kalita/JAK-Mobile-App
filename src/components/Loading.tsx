import React from "react";
import {
    View,
    ActivityIndicator,
    useColorScheme,
    ViewStyle,
    StyleProp,
    TextStyle,
    ImageStyle,
} from "react-native";
import { useTailwind } from "tailwindcss-react-native";

interface Props {
    containerStyle?: StyleProp<ViewStyle>;
    dimensions: StyleProp<ViewStyle>;
}

const LoadingIndicator = ({ containerStyle, dimensions }: Props) => {
    const colorScheme = useColorScheme();
    const tailwind = useTailwind<ViewStyle | TextStyle | ImageStyle>();

    return (
        <View
            style={[
                containerStyle,
                tailwind("justify-center items-center"),
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
