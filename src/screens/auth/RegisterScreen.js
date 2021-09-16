import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import PropTypes from "prop-types";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Register!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 20,
                        }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL:
                        imageUrl ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                });
            })
            .then(() => {
                db.collection("publicNotifications").add({
                    title: "New member in the Ligtning Family!!",
                    message: `${email} Joined the Ligtning Family!! Yippie!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            })
            .then(() => {
                db.collection("privateNotifications").add({
                    title: "Welcome!!",
                    message: `Welcome ${email}. Nice to meet!!`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: email,
                });
            })
            .catch((error) => {
                Alert.alert("Error Occured!!", error.message, [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]);
            });
    };
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create an Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Input
                    placeholder="Profile Picture Url (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title="Register"
                onPress={register}
                raised
            />
        </View>
    );
};

RegisterScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
