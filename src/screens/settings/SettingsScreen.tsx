import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db, storage } from "../../firebase";
import { Avatar, Button, ListItem } from "@rneui/themed";
import globalStyles from "../../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import pushPublicNotification from "../../notify/publicNotification";
import LoadingIndicator from "../../components/Loading";
import errorAlertShower from "../../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../../utils/alertShowers/messageAlertShower";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { deleteDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { DrawerStackNavigationProps } from "../../../@types/navigation";
import ArrowGoBack from "../../components/ArrowGoBack";
import { useDocument } from "react-firebase-hooks/firestore";

const uploadImageAsync = async (uri: string, userUID: string) => {
    const blob: any = await new Promise((resolve, reject) => {
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

    const fileRef = ref(storage, `users/${userUID}/profile_pic`);
    await uploadBytes(fileRef, blob);

    blob.close();

    return await getDownloadURL(fileRef);
};

const SettingsScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [image, setImage] = useState<null | string>(null);
    const [userData, userDataLoading, userDataError] = useDocument(
        doc(db, "users", user?.uid!)
    );
    const phoneNumberFromUserData =
        user?.phoneNumber || userData?.data()?.phoneNumber;

    const updatePic = async () => {
        const pickerResult: any = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        try {
            if (!pickerResult.cancelled) {
                const uploadURL = await uploadImageAsync(
                    pickerResult.uri,
                    user?.uid!
                );
                updateProfile(user!, { photoURL: uploadURL });
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
                    timestamp: serverTimestamp(),
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
                deleteDoc(doc(db, "users", userUID!));
            })
            .then(() => {
                pushPublicNotification({
                    title: "Someone left us Forever!!",
                    message: "Someone left the Family forever!! Noooooooo!!",
                    timestamp: serverTimestamp(),
                });
            })
            .catch((error) => {
                errorAlertShower(error);
            });
    };

    const verifyEmail = () => {
        if (!user?.emailVerified) {
            sendEmailVerification(user!)
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
                    setDoc(
                        doc(db, "users", user?.uid!),
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
            headerLeft: () => <ArrowGoBack />,
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

    if (userDataError) errorAlertShower(userDataError);

    if (userLoading || userDataLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <View className="mb-[10px] flex-1 flex-col">
            <StatusBar style="auto" />
            <ScrollView>
                <View className="mt-[30px] items-center">
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
                        <ListItem
                            bottomDivider
                            hasTVPreferredFocus={undefined}
                            tvParallaxProperties={undefined}
                        >
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
                        <ListItem
                            bottomDivider
                            hasTVPreferredFocus={undefined}
                            tvParallaxProperties={undefined}
                        >
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
                        <ListItem
                            bottomDivider
                            hasTVPreferredFocus={undefined}
                            tvParallaxProperties={undefined}
                        >
                            <AntDesign name="edit" style={{ fontSize: 30 }} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    {phoneNumberFromUserData ||
                                        "Provide your Phone Number!!"}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Phone Number
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View className="absolute bottom-[20px] flex-row self-start pl-[20px]">
                <Button
                    containerStyle={globalStyles.button}
                    onPress={signOut}
                    title="Logout"
                />
            </View>
            <View className="absolute bottom-[20px] flex-row self-end pr-[20px]">
                <Button
                    containerStyle={globalStyles.button}
                    onPress={deleteAccount}
                    title="Delete Account"
                />
            </View>
        </View>
    );
};

export default SettingsScreen;
