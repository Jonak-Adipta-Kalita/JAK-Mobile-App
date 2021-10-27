import React from "react";
import { useWindowDimensions, Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CustomDrawer from "../components/Drawer";
import PropTypes from "prop-types";

import {
    HomeStack,
    AboutStack,
    SettingsStack,
    ContactStack,
    AuthenticationStack,
} from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const [user, , userError] = useAuthState(auth);
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    if (userError) {
        Alert.alert("Error Occured", userError.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ]);
    }

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            defaultStatus="closed"
            detachInactiveScreens={true}
            screenOptions={{
                // drawerType: isLargeScreen ? "permanent" : "front",
                drawerStyle: isLargeScreen ? null : { width: "65%" },
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={HomeStack}
                options={{
                    drawerLabel: "Home",
                    drawerIcon: ({ color, size }) => (
                        <AntDesign
                            name="home"
                            size={24}
                            style={{ fontSize: size, color: color }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="AboutDrawer"
                component={AboutStack}
                options={{
                    drawerLabel: "About",
                    drawerIcon: ({ color, size }) => (
                        <AntDesign
                            name="exclamationcircleo"
                            size={24}
                            style={{ fontSize: size, color: color }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="ContactDrawer"
                component={ContactStack}
                options={{
                    drawerLabel: "Contact",
                    drawerIcon: ({ color, size }) => (
                        <AntDesign
                            name="phone"
                            size={24}
                            style={{ fontSize: size, color: color }}
                        />
                    ),
                }}
            />
            {!user ? (
                <Drawer.Screen
                    name="AuthDrawer"
                    component={AuthenticationStack}
                    options={{
                        drawerLabel: "Login",
                        drawerIcon: ({ color, size }) => (
                            <Entypo
                                name="login"
                                size={24}
                                style={{ fontSize: size, color: color }}
                            />
                        ),
                    }}
                />
            ) : (
                <Drawer.Screen
                    name="ProfileDrawer"
                    component={SettingsStack}
                    options={{
                        drawerLabel: "Profile",
                        drawerIcon: ({ color, size }) => (
                            <AntDesign
                                name="setting"
                                size={24}
                                style={{ fontSize: size, color: color }}
                            />
                        ),
                    }}
                />
            )}
        </Drawer.Navigator>
    );
};

DrawerNavigator.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

export default DrawerNavigator;
