import { SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../globalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropsStack } from "../../@types/navigation";

interface Props {
    color?: string;
}

const ArrowGoBack = ({ color }: Props) => {
    const navigation = useNavigation<NavigationPropsStack>();

    return (
        <SafeAreaView className="flex-1">
            <TouchableOpacity
                style={globalStyles.headerIcon}
                onPress={navigation.goBack}
            >
                <AntDesign name="arrowleft" size={24} color={color} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ArrowGoBack;
