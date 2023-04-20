import React from "react";
import { View, useColorScheme, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../@types/navigation";
import StatusBar from "../components/StatusBar";
import PagerView from "react-native-pager-view";
import globalStyles from "../globalStyles";

const GetStartedScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
    const scheme = useColorScheme();

    return (
        <View className="flex-1">
            <StatusBar />
            <PagerView initialPage={0} style={{ flex: 1 }}>
                <View key="1" className="items-center justify-center space-y-5">
                    <Text
                        className={`px-10 text-center text-2xl ${
                            scheme === "dark" ? "text-white" : "text-black"
                        }`}
                        style={[globalStyles.font]}
                    >
                        Takes care of all your daily needs
                    </Text>
                    <Text
                        className={`px-10 text-center text-xs ${
                            scheme === "dark" ? "text-white" : "text-black"
                        }`}
                        style={[globalStyles.font]}
                    >
                        Get ready to explore a world of convenience with tons of
                        essential features at your fingertips.
                    </Text>
                </View>
            </PagerView>
        </View>
    );
};

export default GetStartedScreen;
