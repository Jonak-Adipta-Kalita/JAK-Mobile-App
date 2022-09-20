import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import { Button } from "@rneui/themed";
import globalStyles from "../globalStyles";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProps } from "../../@types/navigation";
import images from "../images";

const GetStartedScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Get Started!!",
            headerStyle: {
                backgroundColor: "#3f7de0",
            },
            headerTitleStyle: {
                color: "white",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    return (
        <View>
            <StatusBar style="auto" />
            <View className="relative h-screen p-[10px] px-[20px]">
                <View className="mt-[20px] flex items-center justify-center">
                    <Image
                        source={images.welcomeText}
                        className="h-[350px] w-[350px]"
                    />
                </View>
                <Button
                    containerStyle={[
                        globalStyles.button,
                        {
                            marginTop: 650,
                            alignSelf: "center",
                            position: "absolute",
                        },
                    ]}
                    title="Lets Goooo!!"
                    onPress={() => navigation.replace("Home")}
                />
            </View>
        </View>
    );
};

export default GetStartedScreen;
