import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";
import { images } from "../utils/image";
import globalStyles from "../utils/globalStyles";

const GetStartedScreen = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="flex-1">
            <StatusBar />
            {/* Screen 1 */}
            <View className="flex-1">
                <View className="flex flex-1 items-center justify-center gap-y-7">
                    <View>
                        <Image
                            source={images.onboardingIllustration}
                            alt="illustration"
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
