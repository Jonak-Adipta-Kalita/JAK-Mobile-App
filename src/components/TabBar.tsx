import React, { useEffect, useRef } from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, Easing } from "react-native";
import { useRecoilValue } from "recoil";
import { tabBarHideState } from "@atoms/tabBarAtom";

const TabBar = (props: BottomTabBarProps) => {
    const hide = useRecoilValue(tabBarHideState);
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: !hide ? 0 : 100,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [hide]);

    return (
        <Animated.View
            style={[
                { transform: [{ translateY }] },
                { position: "absolute", bottom: 0, left: 0, right: 0 },
            ]}
            pointerEvents={hide ? "none" : "auto"}
        >
            <BottomTabBar {...props} />
        </Animated.View>
    );
};

export default TabBar;
