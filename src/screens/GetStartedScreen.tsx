import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import globalStyles from "../globalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropsStack } from "../../@types/navigation";

const GetStartedScreen = () => {
    const navigation = useNavigation<NavigationPropsStack>();

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
            <View className="p-[10px] px-[20px]">
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
                    onPress={() => navigation.replace("Login")}
                />
            </View>
        </View>
    );
};

export default GetStartedScreen;
