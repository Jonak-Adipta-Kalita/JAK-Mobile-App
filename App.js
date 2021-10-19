import React from "react";
import "react-native-gesture-handler";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import {
    Platform,
    InteractionManager,
    Alert,
    useColorScheme,
    StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import LoadingIndicator from "./src/components/Loading";

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

const App = () => {
    const scheme = useColorScheme();

    const [loaded, error] = useFonts({
        OtomanopeeOne: require("./assets/fonts/OtomanopeeOne-Regular.ttf"),
    });
    if (error) {
        Alert.alert("Error Occured", error.message, [
            {
                text: "OK",
                onPress: () => {},
            },
        ]);
    }
    if (!loaded) {
        return <LoadingIndicator dimensions={styles.dimensions} />;
    }

    return (
        <NavigationContainer
            theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <DrawerNavigator />
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    dimensions: {
        width: 70,
        height: 70,
    },
});
