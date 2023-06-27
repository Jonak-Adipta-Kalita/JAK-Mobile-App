import React, { useState } from "react";
import { View } from "react-native";
import StatusBar from "@components/StatusBar";
import PagerView from "react-native-pager-view";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "react-native";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";

const GetStartedScreen = () => {
    const colorScheme = useColorScheme();
    const [pageNumber, setPageNumber] = useState<number>(1);

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="relative flex-1">
            <StatusBar />
            <PagerView
                initialPage={0}
                style={{ flex: 1 }}
                onPageSelected={(e) => {
                    setPageNumber(e.nativeEvent.position + 1);
                }}
            >
                <View key="1"></View>
                <View key="2"></View>
                <View key="3"></View>
            </PagerView>
        </View>
    );
};

export default GetStartedScreen;
