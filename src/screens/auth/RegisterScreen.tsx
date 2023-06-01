import React, { useState } from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { Button, Input } from "@rneui/themed";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import globalStyles from "@utils/globalStyles";
import { auth, db } from "@utils/firebase";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import messageAlertShower from "@utils/alertShowers/messageAlertShower";
import images from "@utils/images";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import StatusBar from "@components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import { verifyEmail } from "@utils/verifyEmail";

const RegisterScreen = () => {
    const colorScheme = useColorScheme();
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"Register">>();

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const avatar: string = images.avatar;

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
                    photoURL: avatar,
                });
                await verifyEmail(navigation, authUser?.user);
                setDoc(doc(db, "users", authUser.user.uid!), {});
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
                    className="absolute left-5 top-4"
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
                    <View
                        style={{
                            width: 350,
                        }}
                    >
                        <Input
                            placeholder="Full Name"
                            autoFocus
                            value={name}
                            inputStyle={globalStyles.inputBar}
                            onChangeText={(text) => setName(text)}
                            leftIcon={
                                <FontAwesome5
                                    name="user-alt"
                                    size={24}
                                    style={globalStyles.inputBarIcon}
                                />
                            }
                            autoComplete={"name"}
                        />

                        <Input
                            placeholder="Email"
                            value={email}
                            inputStyle={globalStyles.inputBar}
                            leftIcon={
                                <MaterialIcons
                                    name="email"
                                    size={24}
                                    style={globalStyles.inputBarIcon}
                                />
                            }
                            onChangeText={(text) => setEmail(text)}
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
                                        color="black"
                                        style={globalStyles.showPasswordIcon}
                                    />
                                ) : (
                                    <Feather
                                        name="eye-off"
                                        size={20}
                                        color="black"
                                        style={globalStyles.showPasswordIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Input
                                placeholder="Confirm Password"
                                secureTextEntry={!showPassword}
                                autoComplete={"password"}
                                value={confirmPassword}
                                inputStyle={globalStyles.inputBar}
                                onChangeText={(text) =>
                                    setConfirmPassword(text)
                                }
                                leftIcon={
                                    <MaterialIcons
                                        name="lock"
                                        size={24}
                                        style={globalStyles.inputBarIcon}
                                    />
                                }
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
                    <Button
                        containerStyle={{
                            marginTop: 40,
                            width: 350,
                        }}
                        buttonStyle={{
                            padding: 20,
                            backgroundColor: "#e3ad3e",
                        }}
                        title="Register"
                        onPress={registerEmail}
                        raised
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
