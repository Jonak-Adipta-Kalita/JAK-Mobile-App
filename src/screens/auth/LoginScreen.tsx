import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth } from "@utils/firebase";
import globalStyles from "@utils/globalStyles";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import StatusBar from "@components/StatusBar";
import messageAlertShower from "@utils/alertShowers/messageAlertShower";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShowBottomTab } from "@hooks/useBottomTab";
import { TextInput } from "react-native-gesture-handler";

const LoginScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"Login">>();
    useShowBottomTab();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(
        () =>
            auth.onAuthStateChanged((authUser) => {
                if (authUser) navigation.replace("Home");
            }),
        []
    );

    const loginEmail = async () => {
        if (email === "" || password === "") {
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
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                errorAlertShower(error);
            }
        }
    };

    return (
        <SafeAreaView className="mt-[30px] flex-1">
            <StatusBar />
            <View className="items-center">
                <View className="mt-[10px] w-[350px] space-y-[35px]">
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
                </View>
                <View className="mt-[50px] w-[350px]">
                    <TouchableOpacity
                        className="rounded-md bg-[#609fe6] p-[20px] py-6"
                        onPress={loginEmail}
                    >
                        <Text
                            className="text-center text-[15px] text-white"
                            style={globalStyles.font}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mt-[40px] rounded-md bg-[#e3ad3e] p-[20px] py-6"
                        onPress={() => navigation.navigate("Register")}
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

export default LoginScreen;
