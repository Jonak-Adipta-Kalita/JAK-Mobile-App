import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NotificationTopTab } from "../../../navigation/TopTabNavigator";
import globalStyles from "../../../globalStyles";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Notifications!!",
            headerLeft: () => (
                <SafeAreaView className="flex-1">
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);

    return (
        <View className="mb-[10px]">
            <StatusBar style="auto" />
            <View style={{ height: "100%" }}>
                <NotificationTopTab />
            </View>
        </View>
    );
};

export default NotificationScreen;
