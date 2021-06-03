import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function ContactScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Contact Me!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View>
            <StatusBar style="auto" />
        </View>
    );
}

ContactScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};