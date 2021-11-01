import React from "react";
import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CustomDrawer from "../components/Drawer";
import PropTypes from "prop-types";
import errorAlertShower from "../utils/errorAlertShower";

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
        errorAlertShower(userError);
    }

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            defaultStatus="closed"
            screenOptions={{
                drawerType: isLargeScreen ? "permanent" : "front",
                drawerStyle: isLargeScreen ? null : { width: "65%" },
                headerShown: false,
                drawerLabelStyle: { fontSize: 14 },
                drawerActiveBackgroundColor: "#F1F1F1",
                draweraActiveTintColor: "#000000",
                drawerInactiveTintColor: "#818181",
                drawerItemStyle: {
                    marginLeft: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                },
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
