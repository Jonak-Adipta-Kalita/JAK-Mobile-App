import "expo-dev-client";
import React, { useState, useEffect } from "react";
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
import errorAlertShower from "./src/utils/alertShowers/errorAlertShower";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { NetworkState, getNetworkStateAsync } from "expo-network";
import { NoNetworkStack } from "./src/navigation/StackNavigator";

LogBox.ignoreLogs([
    'Debugger and device times have drifted by more than 60s. Please correct this by running adb shell "date `date +%m%d%H%M%Y.%S`" on your debugger machine.',
    "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

const AppChildren = () => {
    const scheme = useColorScheme();
    const [networkState, setNetworkState] = useState<NetworkState | null>(null);

    useEffect(() => {
        getNetworkStateAsync().then((state) => setNetworkState(state));
    }, []);

    if (networkState === null)
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );

    return (
        <NavigationContainer theme={scheme === "dark" ? DarkTheme : LightTheme}>
            {networkState.isConnected && networkState.isInternetReachable ? (
                <BottomTabNavigator />
            ) : (
                <NoNetworkStack />
            )}
        </NavigationContainer>
    );
};

const App = () => {
    const [, userLoading, userError] = useAuthState(auth);
    const [fontsLoaded, fontsError] = useFonts({
        Lato: require("./assets/fonts/Lato-Regular.ttf"),
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
