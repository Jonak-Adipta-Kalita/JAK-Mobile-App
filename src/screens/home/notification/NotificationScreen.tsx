import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { NotificationTopTab } from "../../../navigation/TopTabNavigator";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";
import StatusBar from "../../../components/StatusBar";

const NotificationScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Notifications!!",
            headerLeft: () => <ArrowGoBack />,
        });
    }, [navigation]);

    return (
        <View className="mb-[10px]">
            <StatusBar />
            <View style={{ height: "100%" }}>
                <NotificationTopTab />
            </View>
        </View>
    );
};

export default NotificationScreen;
