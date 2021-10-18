import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { Avatar, Button, ListItem } from "react-native-elements";
import firebase from "firebase";
import globalStyles from "../../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";

const SettingsScreen = ({ navigation }) => {
    const [user] = useAuthState(auth);
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
        user?.delete()
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
                    {!user?.emailVerified && (
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
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri: user?.photoURL,
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
                                    {user?.displayName}
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
                                <ListItem.Title>{user?.email}</ListItem.Title>
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
                                    {user?.phoneNumber
                                        ? user?.phoneNumber
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
                style={[
                    styles.bottomButton,
                    {
                        alignSelf: "flex-start",
                        paddingLeft: 20,
                    },
                ]}
            >
                <Button
                    containerStyle={globalStyles.button}
                    onPress={signOut}
                    title="Logout"
                />
            </View>
            <View
                style={[
                    styles.bottomButton,
                    {
                        paddingRight: 20,
                        alignSelf: "flex-end",
                    },
                ]}
            >
                <Button
                    containerStyle={globalStyles.button}
                    onPress={deleteAccount}
                    title="Delete Account"
                />
            </View>
        </View>
    );
};

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        marginBottom: 10,
    },
    bottomButton: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
    },
});
