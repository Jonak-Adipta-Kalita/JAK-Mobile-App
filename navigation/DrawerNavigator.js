import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
    HomeStack,
    AboutStack,
    SettingsStack,
    ContactStack,
    AuthenticationStack,
} from "./StackNavigator";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const [user] = useAuthState(auth);
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="About" component={AboutStack} />
            <Drawer.Screen name="Contact" component={ContactStack} />
            {!user ? (
                <Drawer.Screen name="Login" component={AuthenticationStack} />
            ) : (
                <Drawer.Screen name="Settings" component={SettingsStack} />
            )}
        </Drawer.Navigator>
    );
}
