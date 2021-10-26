import React from "react";
import { useWindowDimensions } from "react-native";
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
    const [user] = useAuthState(auth);
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawer {...props} />}
            defaultStatus="closed"
            screenOptions={{
                drawerType: isLargeScreen ? "permanent" : "back",
                drawerStyle: isLargeScreen ? null : { width: "65%" },
                overlayColor: "transparent",
				headerShown: false,
            }}
        >
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
};

DrawerNavigator.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

export default DrawerNavigator;
