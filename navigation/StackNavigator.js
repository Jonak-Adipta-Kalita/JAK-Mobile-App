import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/home/NotificationScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactScreen from "../screens/ContactScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
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
			}}
		>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
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
