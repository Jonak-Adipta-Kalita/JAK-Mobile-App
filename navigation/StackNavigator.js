import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactScreen from "../screens/ContactScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import LoginScreenEmail from "../screens/auth/email/LoginScreen";
import RegisterScreenEmail from "../screens/auth/email/RegisterScreen";

const Stack = createStackNavigator();

const screenOptions = {
    headerStyle: { backgroundColor: "#3f7de0" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

const AuthenticationStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginWithEmail" component={LoginScreenEmail} />
            <Stack.Screen name="RegisterWithEmail" component={RegisterScreenEmail} />
        </Stack.Navigator>
    );
};

const AboutStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
};

const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

const ContactStack = () => {
    return (
        <Stack.Navigator>
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
