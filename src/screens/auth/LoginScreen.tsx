import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import globalStyles from "../../globalStyles";
import {
    setShowPassword,
    selectShowPassword,
} from "../../redux/slices/showPasswordSlice";
import LoginButton from "../../components/LoginButton";
import pushPrivateNotification from "../../notify/privateNotification";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import { signInWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { BottomTabStackNavigationProps } from "../../../@types/navigation";
import StatusBar from "../../components/StatusBar";
import messageAlertShower from "../../utils/alertShowers/messageAlertShower";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"Login">>();
    const colorScheme = useColorScheme();
    const dispatch = useAppDispatch();
    const showPassword = useAppSelector(selectShowPassword);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) navigation.replace("Home");
        });

        return unSubscribe;
    }, []);

    const loginEmail = () => {
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
            signInWithEmailAndPassword(auth, email, password)
                .then((authUser) => {
                    pushPrivateNotification(authUser.user.uid!, {
                        title: "Welcome Back!!",
                        message: `Welcome back ${email}. Nice to meet you again!!`,
                        timestamp: serverTimestamp(),
                    });
                })
                .catch((error) => {
                    errorAlertShower(error);
                });
        }
    };

    const signInMethods = () => {
        if (Platform.OS === "android" || Platform.OS === "ios") {
            return (
                <View>
                    <Text
                        className={`mb-[30px] mt-[50px] self-center text-[20px] ${
                            colorScheme === "dark"
                                ? "text-gray-300"
                                : "text-gray-800"
                        }`}
                    >
                        OR
                    </Text>
                    <ScrollView className="flex flex-row">
                        <LoginButton brand="google" />
                        {Platform.OS === "ios" && <LoginButton brand="apple" />}
                    </ScrollView>
                </View>
            );
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
                            onPress={() => dispatch(setShowPassword())}
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

                {signInMethods()}
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
