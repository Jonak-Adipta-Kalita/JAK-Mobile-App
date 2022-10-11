import { SafeAreaView, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import globalStyles from "../globalStyles";
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
        <SafeAreaView className="flex-1">
            <TouchableOpacity
                style={globalStyles.headerIcon}
                onPress={navigation.goBack}
            >
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color={color || (scheme === "dark" ? "#fff" : "#000000")}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ArrowGoBack;
