import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ViewStyle, ImageStyle, TextStyle } from "react-native";
import { Button } from "react-native-elements";
import globalStyles from "../globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwindcss-react-native";

const GetStartedScreen = () => {
    const navigation: any = useNavigation();
    const tailwind = useTailwind<ViewStyle | TextStyle | ImageStyle>();

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
            <View style={{ padding: 10, paddingRight: 20, paddingLeft: 20 }}>
                <Button
                    containerStyle={[
                        globalStyles.button,
                        {
                            marginTop: 650,
                        },
                        tailwind("absolute self-center"),
                    ]}
                    title="Lets Goooo!!"
                    onPress={() => navigation.replace("Login")}
                />
            </View>
        </View>
    );
};

export default GetStartedScreen;
