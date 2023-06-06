import React from "react";
import StatusBar from "@/src/components/StatusBar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TranslatorScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1"></View>
        </SafeAreaView>
    );
};

export default TranslatorScreen;
