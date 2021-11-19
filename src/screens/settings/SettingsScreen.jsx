import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db, storage } from "../../firebase";
import { Avatar, Button, ListItem } from "react-native-elements";
import firebase from "firebase";
import globalStyles from "../../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPublicNotification from "../../notify/publicNotification";
import LoadingIndicator from "../../components/Loading";
import PropTypes from "prop-types";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../utils/alertShowers/messageAlertShower";
import * as ImagePicker from "expo-image-picker";

const uploadImageAsync = async (uri, userUID) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = (error) => {
            alert(error);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    await storage.ref(`users/${userUID}/profile_pic`).put(blob);

    blob.close();

    return await storage
        .ref(`users/${userUID}`)
        .child("profile_pic")
        .getDownloadURL();
};

const SettingsScreen = ({ navigation }) => {
    const [user, userLoading, userError] = useAuthState(auth);
    const [image, setImage] = useState(null);

    const updatePic = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        try {
            if (!pickerResult.cancelled) {
                const uploadURL = await uploadImageAsync(
                    pickerResult.uri,
                    user?.uid
                );
                user?.updateProfile({ photoURL: uploadURL });
                setImage(uploadURL);
            }
        } catch (error) {
            errorAlertShower(error);
        }
    };

    const signOut = () => {
        auth.signOut()
            .then(() =>
                pushPublicNotification({
                    title: "Member left the Ligtning Family!!",
                    message:
                        "Someone left the Ligtning Family!! But I am sure He/She will return for sure!!",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            )
            .catch((error) => {
                errorAlertShower(error);
            });
    };

    const deleteAccount = () => {
        const userUID = user?.uid;
        user?.delete()
            .then(() => {
                db.collection("users").doc(userUID).delete();
            })
            .then(() => {
                pushPublicNotification({
                    title: "Someone left us Forever!!",
                    message: "Someone left the Family forever!! Noooooooo!!",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            })
            .catch((error) => {
                errorAlertShower(error);
            });
    };

    const verifyEmail = () => {
        if (!user?.emailVerified) {
            user.sendEmailVerification()
                .then(() => {
                    messageAlertShower(
                        "Verification Email Successfully Sent!!",
                        "Please check your Email for the Verification Link!!",
                        [
                            {
                                text: "OK",
                                onPress: () => {},
                            },
                        ]
                    );
                })
                .then(() => {
                    db.collection("users").doc(user?.uid).set(
                        {
                            emailVerified: true,
                        },
                        { merge: true }
                    );
                })
                .then(() => {
                    navigation.navigate("Home");
                })
                .catch((error) => {
                    errorAlertShower(error);
                });
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your Profile!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
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
                            style={globalStyles.headerIcon}
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

    if (userError) errorAlertShower(userError);

    if (userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <View style={{ marginTop: 30, alignItems: "center" }}>
                    {user?.photoURL ? (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={updatePic}
                        >
                            <Avatar
                                rounded
                                size="large"
                                source={{
                                    uri: image || user?.photoURL,
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <LoadingIndicator
                            dimensions={{ width: 70, height: 70 }}
                        />
                    )}
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
