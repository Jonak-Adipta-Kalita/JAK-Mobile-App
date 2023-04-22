import "expo-dev-client";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import { useAppDispatch } from "./src/hooks/useDispatch";
import { setToken } from "./src/redux/slices/pushNotificationSlice";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as PaperProvider } from "react-native-paper";

LogBox.ignoreLogs([
    'Debugger and device times have drifted by more than 60s. Please correct this by running adb shell "date `date +%m%d%H%M%Y.%S`" on your debugger machine.',
    "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const AppChildren = () => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const scheme = useColorScheme();

    useEffect(() => {
        registerForPushNotifications(user ? user?.uid! : null).then((token) => {
            dispatch(setToken(token!));
        });
    }, []);

    return (
        <NavigationContainer theme={scheme === "dark" ? DarkTheme : LightTheme}>
            <PaperProvider>
                <BottomTabNavigator />
            </PaperProvider>
        </NavigationContainer>
    );
};

const App = () => {
    const [, userLoading, userError] = useAuthState(auth);
    const [fontsLoaded, fontsError] = useFonts({
        OtomanopeeOne: require("./assets/fonts/OtomanopeeOne-Regular.ttf"),
    });

    if (fontsError || userError) errorAlertShower(fontsError || userError);

    return (
        <>
            {!fontsLoaded || userLoading ? (
                <LoadingIndicator
                    dimensions={{ width: 70, height: 70 }}
                    containerStyle={{ flex: 1 }}
                />
            ) : (
                <ReduxProvider store={reduxStore}>
                    <AppChildren />
                </ReduxProvider>
            )}
        </>
    );
};

export default App;
