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
import { Platform, View } from "react-native";

const Tab = createBottomTabNavigator<BottomTabScreensParamList>();

const TabBarIcon = ({
    children,
    isActive,
}: {
    children: React.ReactNode;
    isActive: boolean;
}) => {
    return (
        <View
            style={{
                top: Platform.OS === "ios" ? 10 : 0,
            }}
            className={`${isActive ? "rounded-full bg-gray-700 p-5" : ""}`}
        >
            {children}
        </View>
    );
};

const BottomTabNavigator = () => {
    const [user, , userError] = useAuthState(auth);

    if (userError) errorAlertShower(userError);

    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    display: "flex",
                    position: "absolute",
                    bottom: 20,
                    left: 25,
                    right: 25,
                    elevation: 10,
                    backgroundColor: "#272934",
                    borderRadius: 30,
                    height: 90,
                },
                tabBarActiveTintColor: "skyblue",
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabBarIcon isActive={focused}>
                            <AntDesign
                                name="home"
                                size={24}
                                style={{ color: color, fontSize: size }}
                            />
                        </TabBarIcon>
                    ),
                }}
            />
            {!user ? (
                <Tab.Screen
                    name="AuthTab"
                    component={AuthenticationStack}
                    options={{
                        tabBarLabel: "Login",
                        tabBarIcon: ({ color, size, focused }) => (
                            <TabBarIcon isActive={focused}>
                                <AntDesign
                                    name="login"
                                    size={24}
                                    style={{
                                        color: color,
                                        fontSize: size,
                                    }}
                                />
                            </TabBarIcon>
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="ProfileTab"
                    component={SettingsStack}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size, focused }) => (
                            <TabBarIcon isActive={focused}>
                                <AntDesign
                                    name="setting"
                                    size={24}
                                    style={{ color: color, fontSize: size }}
                                />
                            </TabBarIcon>
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
