import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Button } from "react-native-elements";
import globalStyles from "../globalStyles";
import { useNavigation } from "@react-navigation/native";

const GetStartedScreen = () => {
    const navigation: any = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Get Started!!",
            headerStyle: {
                backgroundColor: "#3f7de0",
                fontFamily: "OtomanopeeOne",
            },
            headerTitleStyle: { color: "white" },
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
