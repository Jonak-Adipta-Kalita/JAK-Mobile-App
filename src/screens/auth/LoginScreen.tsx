import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import globalStyles from "../../globalStyles";
import {
    setShowPassword,
    selectShowPassword,
} from "../../redux/slices/showPasswordSlice";
import LoginButton from "../../components/LoginButton";
import pushPrivateNotification from "../../notify/privateNotification";
import pushPublicNotification from "../../notify/publicNotification";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import { signInWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useTailwind } from "tailwindcss-react-native";

const LoginScreen = () => {
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    const showPassword = useAppSelector(selectShowPassword);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const tailwind = useTailwind<ViewStyle | TextStyle | ImageStyle>();

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) navigation.replace("Home");
        });

        return unSubscribe;
    }, []);

    const loginEmail = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                pushPublicNotification({
                    title: "Member came back to the Ligtning Family!!",
                    message: `${email} came back to the Ligtning Family!! Yippie!!`,
                    timestamp: serverTimestamp(),
                }).then(() => {
                    pushPrivateNotification(authUser.user.uid!, {
                        title: "Welcome Back!!",
                        message: `Welcome back ${email}. Nice to meet you again!!`,
                        timestamp: serverTimestamp(),
                    });
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
                    <Text
                        style={[
                            tailwind("my-10 self-center"),
                            {
                                color: "#594d4c",
                                fontSize: 20,
                            },
                        ]}
                    >
                        Or
                    </Text>
                    <ScrollView style={tailwind("flex flex-row")}>
                        <LoginButton brand="google" />
                        {Platform.OS === "ios" && <LoginButton brand="apple" />}
                    </ScrollView>
                </View>
            );
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Login!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);

    return (
        <View style={tailwind("flex-1 items-center p-10")}>
            <StatusBar style="auto" />
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
                    autoCompleteType={"email"}
                />
                <View style={tailwind("relative")}>
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
                        autoCompleteType={"password"}
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
