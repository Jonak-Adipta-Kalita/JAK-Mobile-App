import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { useColorScheme, LogBox } from "react-native";
import { useFonts } from "expo-font";
import { Provider as ReduxProvider } from "react-redux";
import LightTheme from "./src/themes/LightTheme";
import DarkTheme from "./src/themes/DarkTheme";
import reduxStore from "./src/redux/store";
import LoadingIndicator from "./src/components/Loading";
import { auth } from "./src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import registerForPushNotifications from "./src/utils/pushNotification/registerForPushNotification";
import * as Notifications from "expo-notifications";
import errorAlertShower from "./src/utils/alertShowers/errorAlertShower";
import { TailwindProvider } from "tailwindcss-react-native";

LogBox.ignoreLogs([
    'Debugger and device times have drifted by more than 60s. Please correct this by running adb shell "date `date +%m%d%H%M%Y.%S`" on your debugger machine.',
    "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)",
]);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const App = () => {
    const [, userLoading, userError] = useAuthState(auth);
    const scheme = useColorScheme();
    const [fontsLoaded, fontsError] = useFonts({
        OtomanopeeOne: require("./assets/fonts/OtomanopeeOne-Regular.ttf"),
    });
    const [, setExpoPushToken] = useState("");

    useEffect(() => {
        registerForPushNotifications().then((token) => {
            setExpoPushToken(token!);
        });
    }, []);

    if (fontsError || userError) errorAlertShower(fontsError || userError);

    if (!fontsLoaded || userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <ReduxProvider store={reduxStore}>
            <TailwindProvider>
                <NavigationContainer
                    theme={scheme === "dark" ? DarkTheme : LightTheme}
                >
                    <DrawerNavigator />
                </NavigationContainer>
            </TailwindProvider>
        </ReduxProvider>
    );
};

export default App;
