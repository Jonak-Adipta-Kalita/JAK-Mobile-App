import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import firebase from "firebase";
import { Button, Input } from "react-native-elements";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import globalStyles from "../../globalStyles";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    setShowPassword,
    selectShowPassword,
} from "../../redux/slices/showPasswordSlice";
import LoginButton from "../../components/LoginButton";
import pushPrivateNotification from "../../notify/privateNotification";
import pushPublicNotification from "../../notify/publicNotification";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const showPassword = useSelector(selectShowPassword);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) navigation.replace("Home");
        });

        return unSubscribe;
    }, []);

    const loginEmail = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                pushPublicNotification({
                    title: "Member came back to the Ligtning Family!!",
                    message: `${email} came back to the Ligtning Family!! Yippie!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    pushPrivateNotification(authUser.user.uid, {
                        title: "Welcome Back!!",
                        message: `Welcome back ${email}. Nice to meet you again!!`,
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
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
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            color: "#594d4c",
                            alignSelf: "center",
                            fontSize: 20,
                        }}
                    >
                        Or
                    </Text>
                    <ScrollView
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
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
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    inputStyle={[globalStyles.inputBar, styles.inputBar]}
                    onChangeText={(text) => setEmail(text)}
                    leftIcon={() => (
                        <MaterialIcons
                            name="email"
                            size={24}
                            style={globalStyles.inputBarIcon}
                        />
                    )}
                />
                <View style={styles.passwordContainer}>
                    <Input
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        type="password"
                        value={password}
                        inputStyle={[globalStyles.inputBar, styles.inputBar]}
                        onChangeText={(text) => setPassword(text)}
                        leftIcon={() => (
                            <MaterialIcons
                                name="lock"
                                size={24}
                                style={globalStyles.inputBarIcon}
                            />
                        )}
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
                containerStyle={styles.button}
                title="Login"
            />
            <Button
                containerStyle={styles.button}
                title="Register"
                type="outline"
                onPress={() => navigation.navigate("Register")}
            />

            {signInMethods()}
        </View>
    );
};

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    inputContainer: {
        width: 300,
        marginTop: 10,
    },
    passwordContainer: {
        position: "relative",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    loginButton: {
        width: 300,
        marginTop: 40,
    },
});
