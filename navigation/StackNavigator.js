import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/home/notification/NotificationScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ChangeEmailScreen from "../screens/settings/ChangeEmailScreen";
import ChangeNameScreen from "../screens/settings/ChangeNameScreen";
import ChangePhoneNumberScreen from "../screens/settings/ChangePhoneNumberScreen";
import ContactScreen from "../screens/ContactScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

const AllStackScreenOption = {
    headerStyle: { backgroundColor: "#fff" },
    headerTitleStyle: { color: "black" },
    headerTintColor: "black",
    headerBackTitle: "Back",
};

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={AllStackScreenOption}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
    );
};

const AuthenticationStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#3f7de0" },
                headerTitleStyle: { color: "white" },
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const AboutStack = () => {
    return (
        <Stack.Navigator screenOptions={AllStackScreenOption}>
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
};

const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={AllStackScreenOption}>
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="ChangeName" component={ChangeNameScreen} />
            <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
            <Stack.Screen
                name="ChangePhoneNumber"
                component={ChangePhoneNumberScreen}
            />
        </Stack.Navigator>
    );
};

const ContactStack = () => {
    return (
        <Stack.Navigator screenOptions={AllStackScreenOption}>
            <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
    );
};

export {
    HomeStack,
    AboutStack,
    SettingsStack,
    ContactStack,
    AuthenticationStack,
};
