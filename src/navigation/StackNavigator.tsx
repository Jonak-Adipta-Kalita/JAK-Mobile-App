import React, { useState, useEffect } from "react";
import {
    createStackNavigator,
    StackNavigationOptions,
} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GetStartedScreen from "../screens/GetStartedScreen";
import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/home/notification/NotificationScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ChangeEmailScreen from "../screens/settings/changeProfile/ChangeEmailScreen";
import ChangeNameScreen from "../screens/settings/changeProfile/ChangeNameScreen";
import ChangePhoneNumberScreen from "../screens/settings/changeProfile/ChangePhoneNumberScreen";
import ContactScreen from "../screens/ContactScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

const globalStackScreenOptions: StackNavigationOptions = {
    headerBackTitle: "Back",
    headerTitleAlign: "center",
};

const stackScreenOption1: StackNavigationOptions = {
    ...globalStackScreenOptions,
    headerStyle: { backgroundColor: "#fff" },
    headerTitleStyle: { color: "black", fontFamily: "OtomanopeeOne" },
    headerTintColor: "black",
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
    } else if (isFirstLaunch === true) {
        return (
            <Stack.Navigator
                screenOptions={stackScreenOption1}
                initialRouteName="GetStarted"
            >
                <Stack.Screen name="GetStarted" component={GetStartedScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Notification"
                    component={NotificationScreen}
                />
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator
                screenOptions={stackScreenOption1}
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Notification"
                    component={NotificationScreen}
                />
            </Stack.Navigator>
        );
    }
};

const AuthenticationStack = () => {
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption2}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const AboutStack = () => {
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption1}
            initialRouteName="About"
        >
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
};

const SettingsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption1}
            initialRouteName="Settings"
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

const ContactStack = () => {
    return (
        <Stack.Navigator
            screenOptions={stackScreenOption1}
            initialRouteName="Contact"
        >
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
