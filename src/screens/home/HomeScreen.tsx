import React, { useLayoutEffect, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
    BackHandler,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Card, Button } from "react-native-elements";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "../../components/Loading";
import globalStyles from "../../globalStyles";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation: any = useNavigation();
    const [user, userLoading, userError] = useAuthState(auth);

    useEffect(() => {
        if (Platform.OS === "android") {
            const backAction = () => {
                messageAlertShower(
                    "Exit App!!",
                    "Hold on. Are you sure you want to Exit?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel",
                        },
                        { text: "Yes", onPress: () => BackHandler.exitApp() },
                    ]
                );
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Welcome!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={() => navigation.openDrawer()}
                    >
                        <FontAwesome5 name="bars" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
            headerRight: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    {user && (
                        <TouchableOpacity
                            style={globalStyles.headerIcon}
                            onPress={() => navigation.navigate("Notification")}
                        >
                            <Ionicons name="notifications-outline" size={24} />
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            ),
        });
    }, [navigation, user]);

    if (userError) errorAlertShower(userError);

    if (userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <View style={{ marginBottom: 10 }}>
            <StatusBar style="auto" />
            <ScrollView>
                <Card>
                    <Card.Title>Note</Card.Title>
                    <Card.Divider />
                    <Button
                        onPress={() => navigation.jumpTo("NoteScreen")}
                        title="Go to Note Screen"
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
