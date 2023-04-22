import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";

import {
    HomeStack,
    SettingsStack,
    AuthenticationStack,
} from "./StackNavigator";
import { BottomTabScreensParamList } from "../../@types/navigation";

const Tab = createMaterialBottomTabNavigator<BottomTabScreensParamList>();

const BottomTabNavigator = () => {
    const [user, , userError] = useAuthState(auth);

    if (userError) errorAlertShower(userError);

    return (
        <Tab.Navigator initialRouteName="HomeTab">
            <Tab.Screen name="HomeTab" component={HomeStack} />
            {!user ? (
                <Tab.Screen name="AuthTab" component={AuthenticationStack} />
            ) : (
                <Tab.Screen name="ProfileTab" component={SettingsStack} />
            )}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
