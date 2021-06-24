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
                    indicatorStyle={{
                        borderBottomWidth: 2,
                        borderBottomColor: "red",
                    }}
                />
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
