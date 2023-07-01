import React, { useState } from "react";
import { Text, View } from "react-native";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";
import { WithLocalSvg } from "react-native-svg";
import globalStyles from "../utils/globalStyles";

const GetStartedScreen = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="flex-1">
            <StatusBar />
            <View className="flex-1">
                {/* Screen 1 */}
                <View className="flex flex-1 items-center justify-center space-y-20">
                    <View>
                        <WithLocalSvg
                            asset={require("../../assets/images/illustration.svg")}
                        />
                    </View>
                    <View className="mx-8 space-y-8">
                        <Text
                            className="text-center text-[22px] leading-[34px] tracking-[-0.8px] text-[#DADADA]"
                            style={{ fontFamily: "Medium" }}
                        >
                            Welcome to JAK Mobile App
                        </Text>
                        <Text
                            className="mx-8 text-justify text-[14px] leading-[24px] tracking-[-0.3px] text-[#C8C6C6]"
                            style={globalStyles.font}
                        >
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
