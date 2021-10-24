import React, { useLayoutEffect, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
    BackHandler,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Card, Button } from "react-native-elements";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import globalStyles from "../../globalStyles";
import PropTypes from "prop-types";

const HomeScreen = ({ navigation }) => {
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (Platform.OS === "android") {
            const backAction = () => {
                Alert.alert(
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
                        onPress={navigation.toggleDrawer}
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
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <Card style={styles.card}>
                    <Card.Title>About Me!!</Card.Title>
                    <Card.Divider />
                    <Button
                        onPress={() => navigation.jumpTo("About")}
                        title="Go to About Screen"
                    />
                </Card>
                <Card style={styles.card}>
                    <Card.Title>Contact Me!!</Card.Title>
                    <Card.Divider />
                    <Button
                        onPress={() => navigation.jumpTo("Contact")}
                        title="Go to Contact Screen"
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    card: {},
});
