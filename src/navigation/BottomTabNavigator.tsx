import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BottomTabScreensParamList } from "@/@types/navigation";
import { Platform, View, useColorScheme, ColorSchemeName } from "react-native";
import { bottomTabScreenOptions } from "@utils/bottomTabScreenOptions";

import {
    HomeStack,
    SettingsStack,
    AuthenticationStack,
} from "./StackNavigator";
import TabBar from "@components/TabBar";

const Tab = createBottomTabNavigator<BottomTabScreensParamList>();

const TabBarIcon = ({
    children,
    isActive,
    colorScheme,
}: {
    children: React.ReactNode;
    isActive: boolean;
    colorScheme: ColorSchemeName;
}) => {
    return (
        <View
            style={{
                top: Platform.OS === "ios" ? 10 : 0,
            }}
            className={`${
                isActive
                    ? `rounded-full ${
                          colorScheme === "dark" ? "bg-gray-700" : "bg-gray-100"
                      } p-5`
                    : ""
            }`}
        >
            {children}
        </View>
    );
};

const BottomTabNavigator = () => {
    const [user, , userError] = useAuthState(auth);
    const colorScheme = useColorScheme();

    if (userError) errorAlertShower(userError);

    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={bottomTabScreenOptions(colorScheme)}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabBarIcon
                            isActive={focused}
                            colorScheme={colorScheme}
                        >
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
                            <TabBarIcon
                                isActive={focused}
                                colorScheme={colorScheme}
                            >
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
                            <TabBarIcon
                                isActive={focused}
                                colorScheme={colorScheme}
                            >
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
