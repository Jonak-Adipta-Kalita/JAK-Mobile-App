import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Tab = createBottomTabNavigator<BottomTabScreensParamList>();

const BottomTabNavigator = () => {
    const [user, , userError] = useAuthState(auth);

    if (userError) errorAlertShower(userError);

    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name="home"
                            size={24}
                            style={{ color: color, fontSize: size }}
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
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign
                                name="login"
                                size={24}
                                style={{
                                    color: color,
                                    fontSize: size,
                                }}
                            />
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="ProfileTab"
                    component={SettingsStack}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign
                                name="setting"
                                size={24}
                                style={{ color: color, fontSize: size }}
                            />
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
