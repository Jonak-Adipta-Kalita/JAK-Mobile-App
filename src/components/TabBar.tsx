import React, { useRef, useEffect, useState } from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated } from "react-native";

const TabBar = (props: BottomTabBarProps) => {
    const focusedRoute = props.state.routes[props.state.index];
    const focusedDescriptor = props.descriptors[focusedRoute.key];
    const { tabBarVisibilityAnimationConfig } = focusedDescriptor.options;

    const shouldShowTabBar = true;

    const visibilityAnimationConfigRef = useRef(
        tabBarVisibilityAnimationConfig
    );

    useEffect(() => {
        visibilityAnimationConfigRef.current = tabBarVisibilityAnimationConfig;
    });

    const [visible] = useState(
        () => new Animated.Value(shouldShowTabBar ? 1 : 0)
    );

    const [isTabBarHidden, setIsTabBarHidden] = useState(!shouldShowTabBar);

    useEffect(() => {
        const visibilityAnimationConfig = visibilityAnimationConfigRef.current;

        if (shouldShowTabBar) {
            const animation =
                visibilityAnimationConfig?.show?.animation === "spring"
                    ? Animated.spring
                    : Animated.timing;

            animation(visible, {
                toValue: 1,
                useNativeDriver: false,
                duration: 250,
                ...visibilityAnimationConfig?.show?.config,
            }).start(({ finished }) => {
                if (finished) {
                    setIsTabBarHidden(false);
                }
            });
        } else {
            setIsTabBarHidden(true);

            const animation =
                visibilityAnimationConfig?.hide?.animation === "spring"
                    ? Animated.spring
                    : Animated.timing;

            animation(visible, {
                toValue: 0,
                useNativeDriver: false,
                duration: 200,
                ...visibilityAnimationConfig?.hide?.config,
            }).start();
        }

        return () => visible.stopAnimation();
    }, [visible, shouldShowTabBar]);

    return (
        <Animated.View>
            <BottomTabBar {...props} />
        </Animated.View>
    );
};

export default TabBar;
