import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../@types/navigation";
import StatusBar from "../components/StatusBar";
import PagerView from "react-native-pager-view";
import globalStyles from "../globalStyles";

const GetStartedScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();

    return (
        <View className="relative flex-1">
            <StatusBar />
            <PagerView initialPage={0} style={{ flex: 1 }}>
                <View key="1" className="items-center justify-center">
                    <View className="space-y-5 rounded-lg bg-orange-500 p-3 py-20">
                        <Text
                            className={`px-10 text-center text-2xl text-gray-50`}
                            style={[globalStyles.font]}
                        >
                            Welcome
                        </Text>
                        <Text
                            className={`px-10 text-center text-xs text-gray-50`}
                            style={[globalStyles.font]}
                        >
                            Welcome to JAK Mobile App.
                        </Text>
                    </View>
                </View>
                <View key="2" className="items-center justify-center">
                    <View className="space-y-5 rounded-lg bg-purple-500 p-3 py-10">
                        <Text
                            className={`px-10 text-center text-2xl text-gray-50`}
                            style={[globalStyles.font]}
                        >
                            Takes care of all your daily needs
                        </Text>
                        <Text
                            className={`px-10 text-center text-xs text-gray-50`}
                            style={[globalStyles.font]}
                        >
                            Get ready to explore a world of convenience with
                            tons of essential features at your fingertips.
                        </Text>
                    </View>
                </View>
                <View key="3" className="items-center justify-center">
                    <View className="m-5 space-y-5 rounded-lg bg-cyan-500 p-3 py-10">
                        <Text
                            className={`px-10 text-center text-2xl text-gray-50`}
                            style={[globalStyles.font]}
                        >
                            Made by your Trusted Developer
                        </Text>
                        <Text
                            className={`px-10 text-center text-xs text-gray-50`}
                            style={[globalStyles.font]}
                        >
                            The App has been made and published by JAK (Jonak
                            Adipta Kalita)
                        </Text>
                    </View>
                </View>
            </PagerView>
        </View>
    );
};

export default GetStartedScreen;
