import React from "react";
import { StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";

const CustomDrawer = ({ progress, ...props }) => {
    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });
    return (
        <>
            <Animated.View style={{ transform: [{ translateX }] }}>
                {/* Header */}
            </Animated.View>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ flex: 1 }}
                style={styles.container}
            >
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <DrawerItemList
                        {...props}
                        labelStyle={{ fontSize: 14 }}
                        activeBackgroundColor="#F1F1F1"
                        activeTintColor="#000000"
                        inactiveTintColor="#818181"
                        itemStyle={{
                            marginLeft: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                        }}
                    />
                </Animated.View>
            </DrawerContentScrollView>
			<Animated.View style={{ transform: [{ translateX }] }}>
                {/* Footer */}
            </Animated.View>
        </>
    );
};

CustomDrawer.propTypes = {
    progress: PropTypes.object.isRequired,
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container: {},
});
