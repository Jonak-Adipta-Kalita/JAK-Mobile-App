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
import { Ionicons } from "@expo/vector-icons";
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
    buttonOnPress,
}: {
    title: string;
    description?: string;
    buttonOnPress: () => void;
}) => {
    const colorScheme = useColorScheme();

    return (
        <View className="px-7">
            <TouchableOpacity onPress={buttonOnPress}></TouchableOpacity>
        </View>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"Home">>();
    const [user, userLoading, userError] = useAuthState(auth);
    const scheme = useColorScheme();

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
                        <Text className="m-5 mx-10 flex-1 rounded-2xl bg-gray-300 p-2 text-center text-lg">
                            Tools
                        </Text>
                        <TouchableOpacity
                            style={globalStyles.headerIcon}
                            onPress={() => navigation.navigate("Notification")}
                            className="-mt-[0.5px]"
                        >
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color={scheme === "dark" ? "#fff" : "#000000"}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="mt-10">
                        <Feature
                            title="Todo"
                            buttonOnPress={() => navigation.navigate("Todo")}
                        />
                    </ScrollView>
                </View>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text
                        className={`self-center rounded-2xl bg-gray-300 p-5 text-center text-2xl text-black`}
                    >
                        Become a Member to use the Features.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;
