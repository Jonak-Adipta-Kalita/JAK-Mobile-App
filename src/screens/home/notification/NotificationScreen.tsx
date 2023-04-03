import React from "react";
import { View } from "react-native";
import { NotificationTopTab } from "../../../navigation/TopTabNavigator";
import StatusBar from "../../../components/StatusBar";

const NotificationScreen = () => {
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
