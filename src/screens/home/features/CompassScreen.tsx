import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "@/src/components/StatusBar";

const CompassScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1"></View>
        </SafeAreaView>
    );
};

export default CompassScreen;
