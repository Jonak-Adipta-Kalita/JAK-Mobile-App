import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { db } from "../firebase";
import { Avatar } from "@rneui/themed";
import globalStyles from "../globalStyles";
import LoadingIndicator from "./Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useAuthState } from "../hooks/auth/useAuthState";

interface Props extends DrawerContentComponentProps {
    progress?: number;
}

const DisplayUserData = ({
    user,
    translateX,
}: {
    user: User;
    translateX: Animated.Node<number>;
}) => {
    const [userData, userDataError, userDataLoading] = useDocument(
        doc(db, "users", user?.uid!)
    );

    if (userDataLoading) errorAlertShower(userDataLoading);

    if (userDataError) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <Animated.View style={{ transform: [{ translateX }] }}>
            <View className="mt-[20px] mb-[-15px] flex-row border-b-[2px] border-b-[#818181] p-[20px] pb-[20px]">
                <TouchableOpacity activeOpacity={0.5}>
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri: user.photoURL!,
                        }}
                    />
                </TouchableOpacity>
                <View className="ml-[30px] mt-[13px] space-y-4">
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
                        {user?.phoneNumber || userData?.data()?.phoneNumber}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

const CustomDrawer = ({ progress, ...props }: Props) => {
    const { user, isLoading: userLoading, error: userError } = useAuthState();

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
            {user && <DisplayUserData user={user} translateX={translateX} />}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ flex: 1 }}
            >
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <DrawerItemList {...props} />
                </Animated.View>
            </DrawerContentScrollView>
            <Animated.View style={{ transform: [{ translateX }] }}>
                <View style={{}}></View>
            </Animated.View>
        </>
    );
};

export default CustomDrawer;
