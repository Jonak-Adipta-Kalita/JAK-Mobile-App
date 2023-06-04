import React, { useRef, useEffect, useState } from "react";
import {
    BottomTabBar,
    BottomTabBarHeightCallbackContext,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
    Animated,
    LayoutChangeEvent,
    Platform,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

const TabBar = (props: BottomTabBarProps) => {
    const focusedRoute = props.state.routes[props.state.index];
    const focusedDescriptor = props.descriptors[focusedRoute.key];
    const { tabBarVisibilityAnimationConfig } = focusedDescriptor.options;

    const onHeightChange = React.useContext(BottomTabBarHeightCallbackContext);

    const shouldShowTabBar = true;

    const visibilityAnimationConfigRef = useRef(
        tabBarVisibilityAnimationConfig
    );

    const dimensions = useWindowDimensions();

    const getPaddingBottom = (insets: EdgeInsets) =>
        Math.max(insets.bottom - Platform.select({ ios: 4, default: 0 }), 0);

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

    const [layout, setLayout] = React.useState({
        height: 0,
        width: dimensions.width,
    });

    const handleLayout = (e: LayoutChangeEvent) => {
        const { height, width } = e.nativeEvent.layout;

        onHeightChange?.(height);

        setLayout((layout) => {
            if (height === layout.height && width === layout.width) {
                return layout;
            } else {
                return {
                    height,
                    width,
                };
            }
        });
    };

    return (
        <Animated.View
            style={{
                transform: [
                    {
                        translateY: visible.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                layout.height +
                                    getPaddingBottom(props.insets) +
                                    StyleSheet.hairlineWidth,
                                0,
                            ],
                        }),
                    },
                ],
                position: isTabBarHidden ? "absolute" : (null as any),
            }}
            pointerEvents={isTabBarHidden ? "none" : "auto"}
            onLayout={handleLayout}
        >
            <BottomTabBar {...props} />
        </Animated.View>
    );
};

export default TabBar;
