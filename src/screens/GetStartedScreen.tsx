import React from "react";
import { View, Text, ImageBackground } from "react-native";
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
            <ImageBackground
                source={{
                    uri: "https://i.pinimg.com/564x/26/47/62/2647624ed5ad7274676372e560210249--orange-wallpaper-wallpaper-backgrounds.jpg",
                }}
                resizeMode="cover"
                className="flex-1"
            >
                <PagerView initialPage={0} style={{ flex: 1 }}>
                    <View
                        key="1"
                        className="items-center justify-center space-y-5"
                    >
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
                </PagerView>
            </ImageBackground>
        </View>
    );
};

export default GetStartedScreen;
