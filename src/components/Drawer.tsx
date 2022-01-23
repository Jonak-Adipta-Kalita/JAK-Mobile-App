import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
} from "react-native";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { auth } from "../firebase";
import { Avatar } from "react-native-elements";
import { useAuthState } from "react-firebase-hooks/auth";
import globalStyles from "../globalStyles";
import LoadingIndicator from "./Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";

interface Props extends DrawerContentComponentProps {
    progress?: number;
}

const CustomDrawer = ({ progress, ...props }: Props) => {
    const [user, userLoading, userError] = useAuthState(auth);

    const translateX = Animated.interpolateNode(progress!, {
        outputRange: [0, 1],
        inputRange: [-100, 0],
    });

    if (userError) errorAlertShower(userError);

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
                                    uri: user.photoURL!,
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
                contentContainerStyle={styles.body}
            >
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <DrawerItemList {...props} />
                </Animated.View>
            </DrawerContentScrollView>
            <Animated.View style={{ transform: [{ translateX }] }}>
                <View style={styles.footer}></View>
            </Animated.View>
        </>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    header: {
        marginTop: Platform.OS === "web" ? 0 : 20,
        marginBottom: Platform.OS === "web" ? 10 : -15,
        padding: 20,
        paddingBottom: 20,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "#818181",
    },
    body: {
        flex: 1,
    },
    footer: {},
});
