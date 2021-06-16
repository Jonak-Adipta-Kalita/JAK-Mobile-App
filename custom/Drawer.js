import React from "react";
import { StyleSheet, View } from "react-native";
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
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.body}>
                <DrawerContentScrollView {...props}>
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        <DrawerItemList {...props} />
                    </Animated.View>
                </DrawerContentScrollView>
            </View>
            <View style={styles.footer}></View>
        </View>
    );
}

CustomDrawer.propTypes = {
    progress: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
    header: {},
    body: {},
    footer: {},
});
