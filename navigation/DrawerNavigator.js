import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack, AboutStack, SettingsStack, AuthenticationStack } from './StackNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={HomeStack} />
			<Drawer.Screen name="About" component={AboutStack} />
			<Drawer.Screen name="Settings" component={SettingsStack} />
			<Drawer.Screen name="Login" component={AuthenticationStack} />
		</Drawer.Navigator>
	);
}
