import React, { useState } from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";
import { images } from "../utils/image";

const GetStartedScreen = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="flex-1">
            <StatusBar />
            <View className="flex-1">
                {/* Screen 1 */}
                <View className="flex flex-1 items-center justify-center gap-y-7">
                    <View>
                        <Image
                            source={images.onboardingIllustration}
                            className="h-[300px] w-[300px]"
                        />
                    </View>
                    <View className="mx-8 space-y-5">
                        <Text className="text-center text-[22px] leading-[34px] tracking-[-0.8px] text-[#DADADA]">
                            Welcome to JAK Mobile App
                        </Text>
                        <Text className="text-justify text-[14px] font-medium leading-[24px] tracking-[-0.3px] text-white">
                            Simplifying your digital life with multiple features
                            in one app, reducing the need for switching and
                            saving storage space.
                        </Text>
                    </View>
                </View>
                <View></View>
            </View>
        </View>
    );
};

export default GetStartedScreen;
