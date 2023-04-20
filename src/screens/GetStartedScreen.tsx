import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../@types/navigation";
import StatusBar from "../components/StatusBar";

const GetStartedScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();

    return (
        <View>
            <StatusBar />
        </View>
    );
};

export default GetStartedScreen;
