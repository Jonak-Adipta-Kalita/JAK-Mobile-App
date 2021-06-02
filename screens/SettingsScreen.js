import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase";
import { Avatar } from "react-native-elements";
import PropTypes from "prop-types";

export default function SettingsScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Profile!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ marginTop: 100, alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50, marginLeft: 20 }}>
                <Text style={{ fontSize: 17 }}>
                    Name:{" "}
                    <Text style={{ fontSize: 12 }}>
                        {auth?.currentUser?.displayName}
                    </Text>
                </Text>
                <Text style={{ fontSize: 15 }}>
                    Email:{" "}
                    <Text style={{ fontSize: 12 }}>
                        {auth?.currentUser?.email}
                    </Text>
                </Text>
            </View>
        </View>
    );
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});
