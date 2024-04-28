import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackScreenParamList } from "@/@types/navigation";

import GetStartedScreen from "@screens/GetStartedScreen";
import HomeScreen from "@screens/home/HomeScreen";
import SettingsScreen from "@screens/SettingsScreen";
import LoginScreen from "@screens/auth/LoginScreen";
import RegisterScreen from "@screens/auth/RegisterScreen";
import NoNetworkScreen from "@screens/NoNetworkScreen";
import TodoScreen from "@screens/home/features/TodoScreen";
import QRCodeScreen from "@screens/home/features/QRCodeScreen";

const Stack = createStackNavigator<StackScreenParamList>();

const FirstLaunchStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Group>
                <Stack.Screen name="Todo" component={TodoScreen} />
                <Stack.Screen name="QRCode" component={QRCodeScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const NoNetworkStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="NoNetwork"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="NoNetwork" component={NoNetworkScreen} />
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
        </Stack.Navigator>
    );
};

export { FirstLaunchStack, HomeStack, SettingsStack, NoNetworkStack };
