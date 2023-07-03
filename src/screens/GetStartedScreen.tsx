import React, { useEffect, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import StatusBar from "@components/StatusBar";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";
import { WithLocalSvg } from "react-native-svg";
import globalStyles from "../utils/globalStyles";
import { OnboardingData } from "@/@types/data";
import PagerView from "react-native-pager-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";

const data: OnboardingData[] = [
    {
        id: 1,
        title: "Welcome to JAK Mobile App",
        description:
            "Simplifying your digital life with multiple features in one app, reducing the need for switching and saving storage space.",
    },
    {
        id: 2,
        title: "Meets all your daily needs",
        description:
            "Embark on a thrilling journey of unparalleled convenience with a myriad of essential features right at your fingertips!",
    },
    {
        id: 3,
        title: "Access across Devices",
        description:
            "You can conveniently access your data from multiple devices using the same account credentials.",
    },
];

const GetStartedScreen = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [showButton, setShowButton] = useState<boolean>(false);
    const colorScheme = useColorScheme();
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"GetStarted">>();

    useEffect(() => {
        if (pageNumber === 3 && !showButton) {
            setShowButton(true);
        }
    }, [pageNumber]);

    useHideBottomTab();
    useExitAppBackHandler();

    return (
        <View className="flex-1">
            <StatusBar />
            <View className="flex flex-1 justify-center">
                <PagerView
                    initialPage={0}
                    onPageSelected={(e) => {
                        setPageNumber(e.nativeEvent.position + 1);
                    }}
                    style={{ flex: showButton ? 0.9 : 0.87 }}
                >
                    {data.map((screen) => (
                        <View
                            key={screen.id.toString()}
                            className="flex items-center justify-center space-y-20"
                        >
                            <WithLocalSvg
                                asset={require(`../../assets/images/illustrations/1.svg`)}
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
                                    {screen.title}
                                </Text>
                                <Text
                                    className={`${
                                        screen.id === 2 ? "mx-7" : "mx-8"
                                    }  text-justify text-[14px] leading-[24px] tracking-[-0.3px] ${
                                        colorScheme === "dark"
                                            ? "text-[#C1C1C1]"
                                            : "text-[#545454]"
                                    }`}
                                    style={globalStyles.font}
                                >
                                    {screen.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </PagerView>
                {showButton && (
                    <TouchableOpacity
                        className={`rounded-xl ${
                            colorScheme === "dark"
                                ? "bg-zinc-600"
                                : "bg-zinc-300"
                        } mx-[100px] mb-10 py-2 shadow-sm`}
                        style={{
                            elevation: 2,
                        }}
                        onPress={() => navigation.replace("Home")}
                    >
                        <Text
                            className={`py-[8px] text-center text-[18px] ${
                                colorScheme === "dark"
                                    ? "text-white"
                                    : "text-zinc-600"
                            } opacity-90`}
                            style={{ fontFamily: "Medium" }}
                        >
                            Get Started
                        </Text>
                    </TouchableOpacity>
                )}
                <View
                    className={`flex ${
                        showButton ? "flex-[0.1]" : "flex-[0.13]"
                    } flex-row items-start justify-center space-x-2`}
                >
                    {[1, 2, 3].map((i) => (
                        <View
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                                colorScheme === "dark"
                                    ? "bg-white"
                                    : "bg-zinc-600"
                            } ${pageNumber !== i ? "opacity-20" : ""}`}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default GetStartedScreen;
