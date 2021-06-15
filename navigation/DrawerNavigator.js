import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AntDesign, Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";

import {
    HomeStack,
    AboutStack,
    SettingsStack,
    ContactStack,
    AuthenticationStack,
} from "./StackNavigator";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const [user] = useAuthState(auth);
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={HomeStack}
                options={{
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
                name="About"
                component={AboutStack}
                options={{
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
                name="Contact"
                component={ContactStack}
                options={{
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
                    name="Login"
                    component={AuthenticationStack}
                    options={{
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
                    name="Profile"
                    component={SettingsStack}
                    options={{
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
}

DrawerNavigator.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};
