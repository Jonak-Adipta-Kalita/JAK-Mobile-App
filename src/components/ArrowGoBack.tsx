import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../@types/navigation";

interface Props {
    color?: string;
}

const ArrowGoBack = ({ color }: Props) => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
    const scheme = useColorScheme();

    return (
        <TouchableOpacity
            onPress={navigation.goBack}
            className={`rounded-full border-[2px] p-2 ${
                scheme === "dark" ? "border-[#fff]" : "border-[#000000]"
            }`}
        >
            <AntDesign
                name="arrowleft"
                size={24}
                color={color || (scheme === "dark" ? "#fff" : "#000000")}
            />
        </TouchableOpacity>
    );
};

export default ArrowGoBack;
