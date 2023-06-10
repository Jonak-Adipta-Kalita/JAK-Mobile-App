import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { View } from "react-native";
import Header from "@components/Header";

const CompassScreen = () => {
    useHideBottomTab();

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1">
                <Header title="Compass" />
                <View></View>
            </View>
        </SafeAreaView>
    );
};

export default CompassScreen;
