import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { auth } from "@utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "@components/Loading";
import globalStyles from "@utils/globalStyles";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import StatusBar from "@components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExitAppBackHandler } from "@hooks/useExitAppBackHandler";
import { useShowBottomTab } from "@hooks/useBottomTab";
import Header from "@components/Header";

const Feature = ({
    title,
    description,
    icon,
    buttonOnPress,
}: {
    title: string;
    description: string;
    icon: keyof typeof FontAwesome.glyphMap;
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
                    <FontAwesome
                        name={icon}
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                        style={{
                            paddingRight: 10,
                            borderRightWidth: 2,
                            borderRightColor: "#ccc",
                        }}
                    />
                    <View>
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
    useExitAppBackHandler();
    useShowBottomTab();

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
                <View className="flex-1">
                    {user.emailVerified ? (
                        <View>
                            <Header title="Tools" goBackButton={false} />
                            <ScrollView className="mb-64 mt-10">
                                <Feature
                                    title="Todo"
                                    description="Create a Todo List"
                                    icon="th-list"
                                    buttonOnPress={() =>
                                        navigation.navigate("Todo")
                                    }
                                />
                                <Feature
                                    title="QRCode"
                                    description="Create/Scan QRCode"
                                    icon="qrcode"
                                    buttonOnPress={() =>
                                        navigation.navigate("QRCode")
                                    }
                                />
                                <Feature
                                    title="Unit Convertor"
                                    description="Convert Units"
                                    icon="thermometer"
                                    buttonOnPress={() =>
                                        navigation.navigate("UnitConvertor")
                                    }
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
                                Check your Email to Verify to use the Features
                            </Text>
                        </View>
                    )}
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
