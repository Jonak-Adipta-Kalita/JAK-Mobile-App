import React, { useLayoutEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/themed";
import {
    Feather,
    MaterialIcons,
    FontAwesome5,
    Entypo,
} from "@expo/vector-icons";
import globalStyles from "../../globalStyles";
import { auth, db } from "../../firebase";
import {
    setShowPassword,
    selectShowPassword,
} from "../../redux/slices/showPasswordSlice";
import pushPrivateNotification from "../../notify/privateNotification";
import pushPublicNotification from "../../notify/publicNotification";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../utils/alertShowers/messageAlertShower";
import images from "../../images";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks/redux/useDispatch";
import { useAppSelector } from "../../hooks/redux/useSelector";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NavigationPropsStack } from "../../../@types/navigation";
import ArrowGoBack from "../../components/ArrowGoBack";

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationPropsStack>();
    const dispatch = useAppDispatch();
    const showPassword = useAppSelector(selectShowPassword);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const avatar: string = images.avatar;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Register!!",
            headerLeft: () => <ArrowGoBack color="white" />,
        });
    }, [navigation]);

    const registerEmail = () => {
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            phoneNumber === ""
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
            createUserWithEmailAndPassword(auth, email, password)
                .then((authUser) => {
                    updateProfile(authUser?.user, {
                        displayName: name,
                        photoURL: avatar,
                    })
                        .then(() => {
                            pushPrivateNotification(authUser.user.uid!, {
                                title: "Welcome!!",
                                message: `Welcome ${email}. Nice to meet you!!`,
                                timestamp: serverTimestamp(),
                            });
                        })
                        .then(() => {
                            setDoc(doc(db, "users", authUser.user.uid!), {
                                uid: authUser.user.uid!,
                                email: email,
                                displayName: name,
                                photoURL: avatar,
                                phoneNumber: phoneNumber,
                                emailVerified: authUser?.user?.emailVerified,
                            });
                        })
                        .then(() => {
                            pushPublicNotification({
                                title: "New member in the Ligtning Family!!",
                                message: `${email} Joined the Ligtning Family!! Yippie!!`,
                                timestamp: serverTimestamp(),
                            });
                        });
                })
                .catch((error) => {
                    errorAlertShower(error);
                });
        }
    };

    return (
        <View className="flex-1 items-center justify-center p-[10px]">
            <StatusBar style="auto" />
            <Text h3 style={[globalStyles.text, { marginBottom: 50 }]}>
                Create an Account
            </Text>
            <View
                style={{
                    width: 300,
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
                        onPress={() => dispatch(setShowPassword())}
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
                        onChangeText={(text) => setConfirmPassword(text)}
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

                <Input
                    placeholder="Phone Number"
                    autoComplete={"tel"}
                    value={phoneNumber}
                    inputStyle={globalStyles.inputBar}
                    leftIcon={
                        <Entypo
                            name="phone"
                            size={24}
                            style={globalStyles.inputBarIcon}
                        />
                    }
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <Button
                containerStyle={{
                    width: 200,
                    marginTop: 10,
                }}
                title="Register"
                onPress={registerEmail}
                raised
            />
        </View>
    );
};

export default RegisterScreen;
