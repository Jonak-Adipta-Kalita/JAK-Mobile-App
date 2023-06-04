import React, { useState } from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, Easing } from "react-native";

const TabBar = (props: BottomTabBarProps) => {
    const [isHidden, setIsHidden] = useState(false);
    const translateY = useState(new Animated.Value(0))[0];

    const toggleTabBar = () => {
        setIsHidden(!isHidden);
        Animated.timing(translateY, {
            toValue: isHidden ? 0 : 100,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[
                { transform: [{ translateY }] },
                { position: "absolute", bottom: 0, left: 0, right: 0 },
            ]}
        >
            {!isHidden && <BottomTabBar {...props} />}
        </Animated.View>
    );
};

export default TabBar;
