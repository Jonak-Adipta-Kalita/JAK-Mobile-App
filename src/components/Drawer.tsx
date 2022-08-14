import React from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { auth, db } from "../firebase";
import { Avatar } from "react-native-elements";
import { useAuthState } from "react-firebase-hooks/auth";
import globalStyles from "../globalStyles";
import LoadingIndicator from "./Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
// import { useDocument } from "react-firebase-hooks/firestore";
// import { doc } from "firebase/firestore";

interface Props extends DrawerContentComponentProps {
    progress?: number;
}

const CustomDrawer = ({ progress, ...props }: Props) => {
    const [user, userLoading, userError] = useAuthState(auth);
    // const [userData, firestoreLoading, firestoreError] = useDocument(
    //     doc(db, "users", user?.uid!)
    // );

    const translateX = Animated.interpolateNode(progress!, {
        outputRange: [0, 1],
        inputRange: [-100, 0],
    });

    if (userError) errorAlertShower(userError);

    // if (firestoreError) errorAlertShower(firestoreError);

    // if (userLoading || firestoreLoading) {
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
                        <View className="ml-[30px] mt-[13px]">
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
                                {/* {userData?.data()?.phoneNumber} */}
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            )}
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
