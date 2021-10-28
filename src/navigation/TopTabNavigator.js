import React from "react";
import { Appearance } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicScreen from "../screens/home/notification/PublicScreen";
import PrivateScreen from "../screens/home/notification/PrivateScreen";

const Tab = createMaterialTopTabNavigator();
const colorScheme = Appearance.getColorScheme();

const tabScreenOptions = {
    tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000000",
};

const NotificationTopTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="PublicNotifications"
            screenOptions={tabScreenOptions}
        >
            <Tab.Screen name="PublicNotifications" component={PublicScreen} />
            <Tab.Screen name="PrivateNotifications" component={PrivateScreen} />
        </Tab.Navigator>
    );
};

export { NotificationTopTab };
