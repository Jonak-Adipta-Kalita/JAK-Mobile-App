import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme, LogBox } from "react-native";
import LightTheme from "@themes/LightTheme";
import DarkTheme from "@themes/DarkTheme";
import LoadingIndicator from "@components/Loading";
import { auth } from "@utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import BottomTabNavigator from "@navigation/BottomTabNavigator";
import { NetworkState, getNetworkStateAsync } from "expo-network";
import { FirstLaunchStack, NoNetworkStack } from "@navigation/StackNavigator";
import { decode } from "base-64";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RecoilNexus from "recoil-nexus";
import Alert from "@components/Alert";
import { User } from "firebase/auth";

LogBox.ignoreLogs([
    'Debugger and device times have drifted by more than 60s. Please correct this by running adb shell "date `date +%m%d%H%M%Y.%S`" on your debugger machine.',
    "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    '[Expectation Violation: Duplicate atom key "tabBarHideState". This is a FATAL ERROR in production. But it is safe to ignore this warning if occurred because of hot module replacement.]',
]);

global.atob = global.atob || decode;

const AppChildren = ({ user }: { user: User | null | undefined }) => {
    const scheme = useColorScheme();
    const [networkState, setNetworkState] = useState<NetworkState | null>(null);

    useEffect(() => {
        getNetworkStateAsync().then((state) => setNetworkState(state));
    }, []);

    if (networkState === null) return <LoadingIndicator />;

    return (
        <>
            <Alert />
            <NavigationContainer
                theme={scheme === "dark" ? DarkTheme : LightTheme}
            >
                {!user ? (
                    <FirstLaunchStack />
                ) : networkState.isConnected &&
                  networkState.isInternetReachable ? (
                    <BottomTabNavigator />
                ) : (
                    <NoNetworkStack />
                )}
            </NavigationContainer>
        </>
    );
};

const App = () => {
    const [user, userLoading, userError] = useAuthState(auth);

    if (userError) errorAlertShower(userError);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {userLoading ? (
                <LoadingIndicator />
            ) : (
                <RecoilRoot>
                    <RecoilNexus />
                    <AppChildren user={user} />
                </RecoilRoot>
            )}
        </GestureHandlerRootView>
    );
};

export default App;
