import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "@/src/components/StatusBar";
import { useHideBottomTab } from "@/src/hooks/useBottomTab";
import { TouchableOpacity, Text, useColorScheme, View } from "react-native";
import globalStyles from "@/src/utils/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import AntDesign from "@expo/vector-icons/AntDesign";

const CompassScreen = () => {
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"Compass">>();
    const colorScheme = useColorScheme();
    useHideBottomTab();

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1">
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                        className="-mt-[0.5px] ml-10"
                    >
                        <AntDesign
                            name="back"
                            size={24}
                            color={colorScheme === "dark" ? "#fff" : "#000000"}
                        />
                    </TouchableOpacity>
                    <Text
                        className={`m-5 mx-10 ml-6 flex-1 rounded-2xl ${
                            colorScheme == "dark"
                                ? "bg-[#272934] text-gray-200"
                                : "bg-white text-gray-900"
                        } p-2 px-0 text-center text-lg`}
                        style={globalStyles.font}
                    >
                        Compass
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CompassScreen;
