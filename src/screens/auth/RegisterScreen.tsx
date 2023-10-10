import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useColorScheme,
    Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import globalStyles from "@utils/globalStyles";
import { auth } from "@utils/firebase";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import messageAlertShower from "@utils/alertShowers/messageAlertShower";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import StatusBar from "@components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import { verifyEmail } from "@utils/verifyEmail";
import { useShowBottomTab } from "@hooks/useBottomTab";
import { TextInput } from "react-native-gesture-handler";

const RegisterScreen = () => {
    const colorScheme = useColorScheme();
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"Register">>();
    useShowBottomTab();

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const registerEmail = async () => {
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            messageAlertShower(
                "Value not Filled!!",
                "Please Enter all the Values in the Form!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else if (password !== confirmPassword) {
            messageAlertShower(
                "Passwords doesn't Matches!!!!",
                "Please make sure your Password and Confirm Password is same!!",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else {
            try {
                const authUser = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await updateProfile(authUser?.user, {
                    displayName: name,
                });
                await verifyEmail(navigation, authUser?.user);
            } catch (error) {
                errorAlertShower(error);
            }
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="relative flex-1 p-[10px]">
                <TouchableOpacity
                    style={globalStyles.headerIcon}
                    onPress={navigation.goBack}
                    className="z-50 left-5 top-7 rounded-full p-2 absolute"
                >
                    <AntDesign
                        name="back"
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
                <Text
                    className={`${
                        colorScheme == "dark"
                            ? "text-gray-100"
                            : "text-gray-900"
                    } my-[20px] ml-10 text-center text-2xl font-bold`}
                    style={globalStyles.font}
                >
                    Create an Account
                </Text>
                <View className="mt-5 flex-1 items-center">
                    <View className="w-[350px] space-y-[35px]">
                        <View style={globalStyles.inputBarContainer}>
                            <View style={globalStyles.inputIconContainer}>
                                <FontAwesome5
                                    name="user-alt"
                                    size={24}
                                    style={globalStyles.inputBarIcon}
                                />
                            </View>
                            <TextInput
                                placeholder="Full Name"
                                autoFocus
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={globalStyles.inputBar}
                                placeholderTextColor="#86939e"
                                autoComplete={"name"}
                            />
                        </View>
                        <View style={globalStyles.inputBarContainer}>
                            <View style={globalStyles.inputIconContainer}>
                                <MaterialIcons
                                    name="email"
                                    size={24}
                                    style={globalStyles.inputBarIcon}
                                />
                            </View>
                            <TextInput
                                placeholder="Email"
                                autoFocus
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={globalStyles.inputBar}
                                placeholderTextColor="#86939e"
                                autoComplete={"email"}
                            />
                        </View>
                        <View style={globalStyles.inputBarContainer}>
                            <MaterialIcons
                                name="lock"
                                size={24}
                                style={globalStyles.inputBarIcon}
                            />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                value={password}
                                style={globalStyles.inputBar}
                                onChangeText={(text) => setPassword(text)}
                                placeholderTextColor="#86939e"
                                autoComplete={"password"}
                            />
                            <TouchableOpacity
                                style={globalStyles.inputIconContainer}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Feather
                                        name="eye"
                                        size={20}
                                        style={globalStyles.inputBarIcon}
                                    />
                                ) : (
                                    <Feather
                                        name="eye-off"
                                        size={20}
                                        style={globalStyles.inputBarIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyles.inputBarContainer}>
                            <MaterialIcons
                                name="lock"
                                size={24}
                                style={globalStyles.inputBarIcon}
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                secureTextEntry={!showPassword}
                                value={confirmPassword}
                                style={globalStyles.inputBar}
                                onChangeText={(text) =>
                                    setConfirmPassword(text)
                                }
                                placeholderTextColor="#86939e"
                                autoComplete={"password"}
                            />
                            <TouchableOpacity
                                style={globalStyles.inputIconContainer}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Feather
                                        name="eye"
                                        size={20}
                                        style={globalStyles.inputBarIcon}
                                    />
                                ) : (
                                    <Feather
                                        name="eye-off"
                                        size={20}
                                        style={globalStyles.inputBarIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="mt-[40px] w-[350px] bg-[#e3ad3e] p-[20px] py-7"
                        style={{
                            overflow: "visible",
                            ...Platform.select({
                                android: {
                                    elevation: 4,
                                },
                                default: {
                                    shadowColor: "rgba(0,0,0, .4)",
                                    shadowOffset: { height: 1, width: 1 },
                                    shadowOpacity: 1,
                                    shadowRadius: 1,
                                },
                            }),
                        }}
                        onPress={registerEmail}
                    >
                        <Text
                            className="text-center text-[15px] text-white"
                            style={globalStyles.font}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
