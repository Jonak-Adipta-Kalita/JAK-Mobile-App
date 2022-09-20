import React from "react";
import { Appearance } from "react-native";
import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import PublicScreen from "../screens/home/notification/PublicScreen";
import PrivateScreen from "../screens/home/notification/PrivateScreen";
import { TopTabScreensParamList } from "../../@types/navigation"

const Tab = createMaterialTopTabNavigator<TopTabScreensParamList>();
const colorScheme = Appearance.getColorScheme();

const tabBarOptions: MaterialTopTabNavigationOptions = {
    tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000000",
};

const NotificationTopTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="PublicNotifications"
            screenOptions={tabBarOptions}
        >
            <Tab.Screen name="PublicNotifications" component={PublicScreen} />
            <Tab.Screen name="PrivateNotifications" component={PrivateScreen} />
        </Tab.Navigator>
    );
};

export { NotificationTopTab };
