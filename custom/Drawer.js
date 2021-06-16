import React from "react";
import { StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";

export default function CustomDrawer({ progress, ...props }) {
    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <Animated.View style={{ transform: [{ translateX }] }}>
                <DrawerItemList {...props} />
            </Animated.View>
        </DrawerContentScrollView>
    );
}

CustomDrawer.propTypes = {
    progress: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});
