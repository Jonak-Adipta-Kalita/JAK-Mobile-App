import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
    BackHandler,
    Text,
    useColorScheme,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "../../components/Loading";
import globalStyles from "../../globalStyles";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../utils/alertShowers/messageAlertShower";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "../../../@types/navigation";
import StatusBar from "../../components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";

const Feature = ({
    title,
    description,
    icon,
    buttonOnPress,
}: {
    title: string;
    description: string;
    icon: keyof typeof Entypo.glyphMap;
    buttonOnPress: () => void;
}) => {
    const colorScheme = useColorScheme();

    return (
        <View className="mb-5 px-7">
            <TouchableOpacity
                onPress={buttonOnPress}
                className={`${
                    colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
                } rounded-lg p-5 shadow-md`}
            >
                <View className="flex flex-row items-center">
                    <Entypo
                        name={icon}
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                        style={{
                            paddingRight: 10,
                            borderRightWidth: 2,
                            borderRightColor: "#ccc",
                        }}
                    />
                    <View className="">
                        <Text
                            className={`${
                                colorScheme === "dark"
                                    ? "text-[#fff]"
                                    : "text-[#000000]"
                            } ml-5 text-lg`}
                            style={globalStyles.font}
                        >
                            {title}
                        </Text>
                        <Text
                            className="ml-5 text-sm text-gray-400"
                            style={globalStyles.font}
                        >
                            {description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"Home">>();
    const [user, userLoading, userError] = useAuthState(auth);
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (Platform.OS === "android" && navigation.getId() === "Home") {
            const backAction = () => {
                messageAlertShower(
                    "Exit App!!",
                    "Hold on. Are you sure you want to Exit?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel",
                        },
                        { text: "Yes", onPress: () => BackHandler.exitApp() },
                    ]
                );
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }
    }, []);

    if (userError) errorAlertShower(userError);

    if (userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            {user ? (
                <View>
                    <View className="flex flex-row items-center justify-between">
                        <Text
                            className={`m-5 mx-10 flex-1 rounded-2xl ${
                                colorScheme == "dark"
                                    ? "bg-[#272934] text-gray-200"
                                    : "bg-white text-gray-900"
                            } p-2 text-center text-lg`}
                            style={globalStyles.font}
                        >
                            Tools
                        </Text>
                    </View>
                    <ScrollView className="mb-64 mt-10">
                        <Feature
                            title="Todo"
                            description="Create a Todo List"
                            icon="list"
                            buttonOnPress={() => navigation.navigate("Todo")}
                        />
                    </ScrollView>
                </View>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text
                        className={`self-center rounded-2xl ${
                            colorScheme == "dark"
                                ? "bg-[#272934] text-gray-200"
                                : "bg-white text-gray-900"
                        } mx-5 p-5 text-center text-lg`}
                        style={globalStyles.font}
                    >
                        Become a Member to use the Features.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;
