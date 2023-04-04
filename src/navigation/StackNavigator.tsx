import React, { useState, useEffect } from "react";
import { Appearance } from "react-native";
import {
    createStackNavigator,
    StackNavigationOptions,
} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GetStartedScreen from "../screens/GetStartedScreen";
import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/home/notification/NotificationScreen";
import TodoScreen from "../screens/home/features/TodoScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import {
    ChangeEmailScreen,
    ChangeNameScreen,
    ChangePhoneNumberScreen,
} from "../components/ChangeSettings";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { StackScreenParamList } from "../../@types/navigation";
import ArrowGoBack from "../components/ArrowGoBack";

const Stack = createStackNavigator<StackScreenParamList>();
const colorScheme = Appearance.getColorScheme();

const globalStackScreenOptions: StackNavigationOptions = {
    headerBackTitle: "Back",
    headerTitleAlign: "center",
};

const stackScreenOption1: StackNavigationOptions = {
    ...globalStackScreenOptions,
    headerStyle: {
        backgroundColor: colorScheme === "dark" ? "#000000" : "#fff",
    },
    headerTitleStyle: {
        color: colorScheme === "dark" ? "#fff" : "#000000",
        fontFamily: "OtomanopeeOne",
    },
    headerTintColor: colorScheme === "dark" ? "#fff" : "#000000",
};

const stackScreenOption2: StackNavigationOptions = {
    ...globalStackScreenOptions,
    headerStyle: { backgroundColor: "#3f7de0" },
    headerTitleStyle: { color: "white", fontFamily: "OtomanopeeOne" },
    headerTintColor: "white",
};

const HomeStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    useEffect(() => {
        AsyncStorage.getItem("alreadyLaunched").then((value) => {
            if (value === null) {
                AsyncStorage.setItem("alreadyLaunched", "true");
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    }, []);
    if (isFirstLaunch === null) {
        return null;
    }
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption1}
            initialRouteName={isFirstLaunch ? "GetStarted" : "Home"}
        >
            {isFirstLaunch && (
                <Stack.Screen
                    name="GetStarted"
                    component={GetStartedScreen}
                    options={{
                        title: "Get Started",
                        headerStyle: {
                            backgroundColor: "#3f7de0",
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                    }}
                />
            )}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Welcome",
                }}
            />
            <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    title: "Your Notifications",
                    headerLeft: () => <ArrowGoBack />,
                }}
            />
            <Stack.Group>
                <Stack.Screen
                    name="Todo"
                    component={TodoScreen}
                    options={{
                        title: "Todo(s)",
                        headerLeft: () => <ArrowGoBack />,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const AuthenticationStack = () => {
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption2}
            initialRouteName="Login"
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerLeft: () => <ArrowGoBack color="white" />,
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: "Register",
                    headerLeft: () => <ArrowGoBack color="white" />,
                }}
            />
        </Stack.Navigator>
    );
};

const SettingsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption1}
            initialRouteName="Settings"
        >
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: "Your Profile",
                    headerLeft: () => <ArrowGoBack />,
                }}
            />
            <Stack.Group>
                <Stack.Screen
                    name="ChangeName"
                    component={ChangeNameScreen}
                    options={{
                        title: "Change your Name",
                        headerLeft: () => <ArrowGoBack />,
                    }}
                />
                <Stack.Screen
                    name="ChangeEmail"
                    component={ChangeEmailScreen}
                    options={{
                        title: "Change your Email",
                        headerLeft: () => <ArrowGoBack />,
                    }}
                />
                <Stack.Screen
                    name="ChangePhoneNumber"
                    component={ChangePhoneNumberScreen}
                    options={{ headerLeft: () => <ArrowGoBack /> }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export { HomeStack, SettingsStack, AuthenticationStack };
