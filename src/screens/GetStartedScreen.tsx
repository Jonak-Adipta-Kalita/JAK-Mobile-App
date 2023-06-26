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
            <View className="absolute bottom-32 left-[38.5%] flex flex-row space-x-4">
                <View
                    className={`rounded-xl ${
                        pageNumber === 1 ? "bg-white" : ""
                    }`}
                >
                    <Feather
                        name="circle"
                        size={20}
                        color={colorScheme === "dark" ? "white" : "black"}
                    />
                </View>
                <View
                    className={`rounded-xl ${
                        pageNumber === 2 ? "bg-white" : ""
                    }`}
                >
                    <Feather
                        name="circle"
                        size={20}
                        color={colorScheme === "dark" ? "white" : "black"}
                    />
                </View>
                <View
                    className={`rounded-xl ${
                        pageNumber === 3 ? "bg-white" : ""
                    }`}
                >
                    <Feather
                        name="circle"
                        size={20}
                        color={colorScheme === "dark" ? "white" : "black"}
                    />
                </View>
            </View>
        </View>
    );
};

export default GetStartedScreen;
