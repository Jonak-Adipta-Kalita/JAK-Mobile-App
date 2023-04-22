import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenParamList } from "../../@types/navigation";

import GetStartedScreen from "../screens/GetStartedScreen";
import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/home/notification/NotificationScreen";
import TodoScreen from "../screens/home/features/TodoScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
    ChangeEmailScreen,
    ChangeNameScreen,
    ChangePhoneNumberScreen,
} from "../components/ChangeSettings";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator<StackScreenParamList>();

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
            initialRouteName={isFirstLaunch ? "GetStarted" : "Home"}
            screenOptions={{ headerShown: false }}
        >
            {isFirstLaunch && (
                <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            )}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Group>
                <Stack.Screen name="Todo" component={TodoScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const AuthenticationStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const SettingsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Settings"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Group>
                <Stack.Screen name="ChangeName" component={ChangeNameScreen} />
                <Stack.Screen
                    name="ChangeEmail"
                    component={ChangeEmailScreen}
                />
                <Stack.Screen
                    name="ChangePhoneNumber"
                    component={ChangePhoneNumberScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export { HomeStack, SettingsStack, AuthenticationStack };
