import React from "react";
import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CustomDrawer from "../components/Drawer";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";

import {
    HomeStack,
    SettingsStack,
    AuthenticationStack,
} from "./StackNavigator";
import { useAuthState } from "../hooks/auth/useAuthState";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const { user, error: userError } = useAuthState();
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    if (userError) errorAlertShower(userError);

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
                drawerActiveTintColor: "#000000",
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

export default DrawerNavigator;
