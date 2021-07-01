import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicScreen from "../screens/home/notification/PublicScreen";
import PrivateScreen from "../screens/home/notification/PrivateScreen";

const Tab = createMaterialTopTabNavigator();

function NotificationTopTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="PublicNotifications" component={PublicScreen} />
            <Tab.Screen name="PrivateNotifications" component={PrivateScreen} />
        </Tab.Navigator>
    );
}

export { NotificationTopTab };
