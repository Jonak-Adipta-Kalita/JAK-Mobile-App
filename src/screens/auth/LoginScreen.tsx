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
import { DrawerStackNavigationProps } from "../../../@types/navigation";
import StatusBar from "../../components/StatusBar";

const LoginScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
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
    };

    const signInMethods = () => {
        if (Platform.OS === "android" || Platform.OS === "ios") {
            return (
                <View>
                    <Text className="my-[10px] self-center text-[20px] text-[#594d4c]">
                        Or
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
        <View className="flex-1 items-center p-[10px]">
            <StatusBar />
            <View
                style={{
                    width: 300,
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
            <Button
                onPress={loginEmail}
                containerStyle={{
                    width: 200,
                    marginTop: 10,
                }}
                title="Login"
            />
            <Button
                containerStyle={{
                    width: 200,
                    marginTop: 10,
                }}
                title="Register"
                type="outline"
                onPress={() => navigation.navigate("Register")}
            />

            {signInMethods()}
        </View>
    );
};

export default LoginScreen;
