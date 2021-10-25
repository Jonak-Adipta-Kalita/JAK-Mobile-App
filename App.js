import React, { useState, useRef, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import {
    Platform,
    InteractionManager,
    Alert,
    useColorScheme,
} from "react-native";
import { useFonts } from "expo-font";
import { Provider as ReduxProvider } from "react-redux";
import LightTheme from "./src/themes/LightTheme";
import DarkTheme from "./src/themes/DarkTheme";
import { store } from "./src/redux/store";
import LoadingIndicator from "./src/components/Loading";
import { registerForPushNotificationsAsync } from "./src/pushNotification/register";
import * as Notifications from "expo-notifications";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;

if (Platform.OS === "android") {
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = "_lt_" + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id) => {
        if (typeof id === "string" && id.startsWith("_lt_")) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const App = () => {
    const scheme = useColorScheme();
    const [loaded, error] = useFonts({
        OtomanopeeOne: require("./assets/fonts/OtomanopeeOne-Regular.ttf"),
    });
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((_notification) => {
                setNotification(_notification);
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
        };
    }, []);

    console.log(expoPushToken);
    console.log(notification);

    if (error) {
        Alert.alert("Error Occured", error.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ]);
    }

    if (!loaded) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <ReduxProvider store={store}>
            <NavigationContainer
                theme={scheme === "dark" ? DarkTheme : LightTheme}
            >
                <DrawerNavigator />
            </NavigationContainer>
        </ReduxProvider>
    );
};

export default App;
