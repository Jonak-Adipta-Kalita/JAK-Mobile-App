import React from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated from "react-native-reanimated";

const TabBar = (props: BottomTabBarProps) => {
    return (
        <Animated.View>
            <BottomTabBar {...props} />
        </Animated.View>
    );
};

export default TabBar;
