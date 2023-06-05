import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Input } from "@rneui/themed";
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
import { useShowBottomTab } from "@/src/hooks/useBottomTab";

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
                <View
                    style={{
                        width: 350,
                        marginTop: 10,
                    }}
                >
                    <Input
                        placeholder="Email"
                        autoFocus
                        value={email}
                        inputStyle={globalStyles.inputBar}
                        onChangeText={(text) => setEmail(text)}
                        leftIcon={
                            <MaterialIcons
                                name="email"
                                size={24}
                                style={globalStyles.inputBarIcon}
                            />
                        }
                        autoComplete={"email"}
                    />
                    <View className="relative">
                        <Input
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            inputStyle={globalStyles.inputBar}
                            onChangeText={(text) => setPassword(text)}
                            leftIcon={
                                <MaterialIcons
                                    name="lock"
                                    size={24}
                                    style={globalStyles.inputBarIcon}
                                />
                            }
                            autoComplete={"password"}
                        />
                        <TouchableOpacity
                            style={globalStyles.showPasswordContainer}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <Feather
                                    name="eye"
                                    size={20}
                                    style={globalStyles.showPasswordIcon}
                                />
                            ) : (
                                <Feather
                                    name="eye-off"
                                    size={20}
                                    style={globalStyles.showPasswordIcon}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-[50px] w-[350px]">
                    <Button
                        onPress={loginEmail}
                        containerStyle={{
                            borderRadius: 50,
                        }}
                        buttonStyle={{
                            padding: 20,
                            backgroundColor: "#609fe6",
                        }}
                        title="LOGIN"
                    />
                    <Button
                        containerStyle={{
                            borderRadius: 50,
                            marginTop: 40,
                        }}
                        buttonStyle={{
                            padding: 20,
                            backgroundColor: "#e3ad3e",
                        }}
                        title="REGISTER"
                        onPress={() => navigation.navigate("Register")}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
