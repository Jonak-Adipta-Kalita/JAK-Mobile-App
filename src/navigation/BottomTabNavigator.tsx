import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import { AntDesign } from "@expo/vector-icons";

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
        <Tab.Navigator initialRouteName="HomeTab" labeled={false}>
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <AntDesign
                            name="home"
                            size={24}
                            style={{ color: color }}
                        />
                    ),
                }}
            />
            {!user ? (
                <Tab.Screen
                    name="AuthTab"
                    component={AuthenticationStack}
                    options={{
                        tabBarLabel: "Login",
                        tabBarIcon: ({ color }) => (
                            <AntDesign
                                name="login"
                                size={24}
                                style={{ color: color, marginRight: 4 }}
                            />
                        ),
                        tabBarBadge: true,
                    }}
                />
            ) : (
                <Tab.Screen
                    name="ProfileTab"
                    component={SettingsStack}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color }) => (
                            <AntDesign
                                name="setting"
                                size={24}
                                style={{ color: color }}
                            />
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
