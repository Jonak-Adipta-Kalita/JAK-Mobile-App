import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { Avatar, Button } from "react-native-elements";
import firebase from "firebase";
import PropTypes from "prop-types";

export default function SettingsScreen({ navigation }) {
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
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{
                                uri: auth?.currentUser?.photoURL,
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
