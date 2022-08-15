import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NotificationTopTab } from "../../../navigation/TopTabNavigator";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropsStack } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";

const NotificationScreen = () => {
    const navigation = useNavigation<NavigationPropsStack>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Notifications!!",
            headerLeft: () => <ArrowGoBack />,
        });
    }, [navigation]);

    return (
        <View className="mb-[10px]">
            <StatusBar style="auto" />
            <View style={{ height: "100%" }}>
                <NotificationTopTab />
            </View>
        </View>
    );
};

export default NotificationScreen;
