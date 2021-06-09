import React, { useLayoutEffect, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { Avatar, Button } from "react-native-elements";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

export default function SettingsScreen({ navigation }) {
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Give us Camera Roll Permission to Select Avatar!!");
                }
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
            setAvatar(result.uri)
				.then(() => {
					auth.currentUser.updateProfile({
						photoURL: avatar,
					});
				})
                .then(() => alert("Your Avatar is Successfully Changed!!"))
                .catch((error) => alert(error.message));
        }
    };
    const signOut = () => {
        auth.signOut()
            .then(() =>
                db.collection("notifications").add({
                    title: "Member left the Ligtning Family!!",
                    message:
                        "Someone left the Ligtning Family!! But I am sure He/She will return for sure!!",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            )
            .catch((error) => alert(error.message));
    };
    const deleteAccount = () => {
        auth?.currentUser
            .delete()
            .then(() =>
                db.collection("notifications").add({
                    title: "Someone left us Forever!!",
                    message: "Someone left the Family forever!! Noooooooo!!",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            )
            .catch((error) => alert(error.message));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Profile!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
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
                            size="xlarge"
                            source={{
                                uri: avatar || auth?.currentUser?.photoURL,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>{/* details */}</View>
            </ScrollView>
            <View
                style={{
                    alignSelf: "flex-start",
                    paddingLeft: 20,
                    position: "absolute",
                    bottom: 25,
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
                    bottom: 25,
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
