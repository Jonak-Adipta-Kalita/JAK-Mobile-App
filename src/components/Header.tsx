import React from "react";
import { Text, View, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../utils/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

interface Props {
    title: string;
    goBackButton?: boolean;
    showRightButton?: boolean;
    rightButton?: JSX.Element;
}

const Header = ({
    title,
    goBackButton = true,
    showRightButton,
    rightButton,
}: Props) => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    return (
        <View className="flex flex-row items-center justify-between">
            {goBackButton && (
                <TouchableOpacity
                    style={{ ...globalStyles.headerIcon, margin: 20 }}
                    onPress={navigation.goBack}
                    className="-mt-[0.5px] ml-10"
                >
                    <AntDesign
                        name="back"
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
            )}
            <Text
                className={`m-5 mx-10 ml-6 flex-1 rounded-2xl ${
                    !goBackButton ? "ml-10" : ""
                } ${
                    colorScheme == "dark"
                        ? "bg-[#272934] text-gray-200"
                        : "bg-white text-gray-900"
                } p-2 px-0 text-center text-lg`}
                style={globalStyles.font}
            >
                {title}
            </Text>
            {showRightButton && (
                <View className="-mt-[0.5px] mr-10">{rightButton}</View>
            )}
        </View>
    );
};

export default Header;
