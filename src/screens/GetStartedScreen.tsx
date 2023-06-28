import React, { useState } from "react";
import { View } from "react-native";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";

const GetStartedScreen = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="flex-1">
            <StatusBar />
            {/* Screen 1 */}
            <View className="flex-1">
                {/* Content */}
                <View></View>
                {/* Directional */}
                <View className="absoulute bottom-[70px] right-[40px]">
                    {/* Dots */}
                    {/* NextButton */}
                </View>
            </View>
        </View>
    );
};

export default GetStartedScreen;
