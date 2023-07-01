import React, { useState } from "react";
import { Text, View, useColorScheme, TouchableOpacity } from "react-native";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";
import { WithLocalSvg } from "react-native-svg";
import globalStyles from "../utils/globalStyles";

const GetStartedScreen = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const colorScheme = useColorScheme();

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="flex-1">
            <StatusBar />
            {/* Screen 1 */}
            <View className="flex flex-1 items-center justify-center">
                <View className="flex flex-[0.85] items-center justify-center space-y-20">
                    <WithLocalSvg
                        asset={require("../../assets/images/illustrations/1.svg")}
                    />
                    <View className="mx-8 space-y-8">
                        <Text
                            className={`text-center text-[22px] leading-[34px] tracking-[-0.8px] ${
                                colorScheme === "dark"
                                    ? "text-[#DADADA]"
                                    : "text-[#787878]"
                            }`}
                            style={{ fontFamily: "Medium" }}
                        >
                            Welcome to JAK Mobile App
                        </Text>
                        <Text
                            className={`mx-8 text-justify text-[14px] leading-[24px] tracking-[-0.3px] ${
                                colorScheme === "dark"
                                    ? "text-[#C1C1C1]"
                                    : "text-[#545454]"
                            }`}
                            style={globalStyles.font}
                        >
                            Simplifying your digital life with multiple features
                            in one app, reducing the need for switching and
                            saving storage space.
                        </Text>
                    </View>
                </View>
                <View className="flex flex-[0.15] items-end justify-start">
                    <View className="flex flex-row items-center justify-center space-x-24">
                        <TouchableOpacity>
                            <Text
                                className={`text-right text-[18px] font-bold opacity-60 ${
                                    colorScheme === "dark"
                                        ? "text-white"
                                        : "text-[#585858]"
                                }`}
                                style={globalStyles.font}
                            >
                                Skip
                            </Text>
                        </TouchableOpacity>
                        <View className="flex flex-row items-center justify-center space-x-2">
                            {[1, 2, 3].map((i) => (
                                <View
                                    key={i}
                                    className={`h-2 w-2 rounded-full bg-white ${
                                        pageNumber !== i ? "opacity-20" : ""
                                    }`}
                                />
                            ))}
                        </View>
                        <TouchableOpacity>
                            <Text
                                className={`text-right text-[18px] font-bold ${
                                    colorScheme === "dark"
                                        ? "text-white"
                                        : "text-[#585858]"
                                }`}
                                style={globalStyles.font}
                            >
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default GetStartedScreen;
