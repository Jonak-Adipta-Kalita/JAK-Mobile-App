import React, { useLayoutEffect, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db, storage } from "../../firebase";
import { Avatar, Button, ListItem } from "react-native-elements";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

export default function SettingsScreen({ navigation }) {
    const [avatar, setAvatar] = useState(null);
    const avatarImageExtension = "jpg";
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                let finalStatus = status;
                if (finalStatus !== "granted") {
                    Alert.alert(
                        "Need Camera Roll Permission!!",
                        "Give us Camera Roll Permission to Change Avatar!!",
                        [
                            {
                                text: "OK",
                                onPress: () => {},
                            },
                        ]
                    );
                    const { status } =
                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== "granted") return;
            }
        })();
    }, []);
    const selectAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setAvatar(result.uri);
            uploadAvatar(avatar, "profile_image")
                .then(() => {
                    auth.onAuthStateChanged((user) => {
                        storage
                            .ref(
                                `users/${user.uid}/profile_image.${avatarImageExtension}`
                            )
                            .getDownloadURL()
                            .then((imgURL) => {
                                auth.currentUser.updateProfile({
                                    photoURL: imgURL,
                                });
                            });
                    });
                })
                .then(() => {
                    db.collection("privateNotifications").add({
                        title: "Avatar Changed Successfully!!",
                        message: "Your Avatar has been Successfully Changed!!",
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        user: auth?.currentUser?.email,
                    });
                })
                .then(() => {
                    Alert.alert(
                        "Avatar Changed Successfully!!",
                        "Your Avatar is Successfully Changed!!",
                        [
                            {
                                text: "OK",
                                onPress: () => {},
                            },
                        ]
                    );
                })
                .catch((error) =>
                    Alert.alert("Error Occurred!!", error.message, [
                        {
                            text: "OK",
                            onPress: () => {},
                        },
                    ])
                );
        }
    };
    const uploadAvatar = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = storage
            .ref()
            .child(
                `users/${auth.currentUser.uid}/${imageName}.${avatarImageExtension}`
            );
        return ref.put(blob);
    };
    const signOut = () => {
        auth.signOut()
            .then(() =>
                db.collection("publicNotifications").add({
                    title: "Member left the Ligtning Family!!",
                    message:
                        "Someone left the Ligtning Family!! But I am sure He/She will return for sure!!",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            )
            .catch((error) =>
                Alert.alert("Error Occured!!", error.message, [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ])
            );
    };
    const deleteAccount = () => {
        auth?.currentUser
            .delete()
            .then(() =>
                db.collection("publicNotifications").add({
                    title: "Someone left us Forever!!",
                    message: "Someone left the Family forever!! Noooooooo!!",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            )
            .catch((error) =>
                Alert.alert("Error Occured!!", error.message, [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ])
            );
    };
    const verifyEmail = () => {};
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Profile!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
            headerRight: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    {!auth?.currentUser?.emailVerified && (
                        <TouchableOpacity
                            style={{ alignItems: "flex-start", margin: 20 }}
                            onPress={verifyEmail}
                        >
                            <MaterialCommunityIcons
                                name="account-cancel-outline"
                                style={{ fontSize: 30 }}
                            />
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <View style={{ marginTop: 30, alignItems: "center" }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={selectAvatar}
                    >
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri: avatar || auth?.currentUser?.photoURL,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30, padding: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ChangeName")}
                    >
                        <ListItem bottomDivider>
                            <AntDesign name="edit" style={{ fontSize: 30 }} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    {auth.currentUser.displayName}
                                </ListItem.Title>
                                <ListItem.Subtitle>Name</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ChangeEmail")}
                    >
                        <ListItem bottomDivider>
                            <AntDesign name="edit" style={{ fontSize: 30 }} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    {auth.currentUser.email}
                                </ListItem.Title>
                                <ListItem.Subtitle>Email</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ChangePhoneNumber")}
                    >
                        <ListItem bottomDivider>
                            <AntDesign name="edit" style={{ fontSize: 30 }} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    {auth.currentUser.phoneNumber
                                        ? auth.currentUser.phoneNumber
                                        : "Provide your Phone Number!!"}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Phone Number
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View
                style={{
                    alignSelf: "flex-start",
                    paddingLeft: 20,
                    position: "absolute",
                    bottom: 20,
                    flexDirection: "row",
                }}
            >
                <Button onPress={signOut} title="Logout" />
            </View>
            <View
                style={{
                    alignSelf: "flex-end",
                    paddingRight: 20,
                    position: "absolute",
                    bottom: 20,
                    flexDirection: "row",
                }}
            >
                <Button onPress={deleteAccount} title="Delete Account" />
            </View>
        </View>
    );
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        marginBottom: 10,
    },
});
