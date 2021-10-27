import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    Alert,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { auth } from "../firebase";
import { Avatar } from "react-native-elements";
import { useAuthState } from "react-firebase-hooks/auth";
import globalStyles from "../globalStyles";
import LoadingIndicator from "./Loading";
import PropTypes from "prop-types";

const CustomDrawer = ({ progress, ...props }) => {
    const [user, userLoading, userError] = useAuthState(auth);
    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    if (userError) {
        Alert.alert("Error Occured", userError.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ]);
    }

    if (userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <>
            {user && (
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Avatar
                                rounded
                                size="large"
                                source={{
                                    uri: user.photoURL,
                                }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                marginLeft: 30,
                                marginTop: Platform.OS === "web" ? 17 : 13,
                            }}
                        >
                            <Text
                                style={[
                                    globalStyles.text,
                                    { fontWeight: "bold", fontSize: 13 },
                                ]}
                            >
                                {user.displayName}
                            </Text>
                            <Text
                                style={[
                                    globalStyles.text,
                                    { fontWeight: "bold", fontSize: 13 },
                                ]}
                            >
                                {user.phoneNumber}
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            )}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ flex: 1 }}
                style={styles.body}
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
                <View style={styles.footer}></View>
            </Animated.View>
        </>
    );
};

CustomDrawer.propTypes = {
    progress: PropTypes.object,
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container: {},
    header: {
        marginTop: Platform.OS === "web" ? 0 : 20,
        marginBottom: Platform.OS === "web" ? 10 : -15,
        padding: 20,
        paddingBottom: 20,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "#818181",
    },
    body: {},
    footer: {},
});
