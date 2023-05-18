import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useColorScheme,
    Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db, storage } from "../firebase";
import globalStyles from "../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "../components/Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../utils/alertShowers/messageAlertShower";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { BottomTabStackNavigationProps } from "../../@types/navigation";
import { useDocument } from "react-firebase-hooks/firestore";
import StatusBar from "../components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";

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
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"Settings">>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [image, setImage] = useState<null | string>(null);
    const [userData, userDataLoading, userDataError] = useDocument(
        doc(db, "users", user?.uid!)
    );
    const phoneNumberFromUserData =
        user?.phoneNumber || userData?.data()?.phoneNumber;
    const colorScheme = useColorScheme();

    const updatePic = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        try {
            if (!pickerResult.canceled) {
                const uploadURL = await uploadImageAsync(
                    pickerResult.assets[0].uri,
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
        auth.signOut().catch((error) => {
            errorAlertShower(error);
        });
    };

    const deleteAccount = () => {
        const userUID = user?.uid;
        user?.delete()
            .then(() => {
                deleteDoc(doc(db, "users", userUID!));
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
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1">
                <View className="flex flex-row items-center justify-between">
                    <Text
                        className={`m-5 mx-10 flex-1 rounded-2xl ${
                            colorScheme == "dark"
                                ? "bg-[#272934] text-gray-200"
                                : "bg-white text-gray-900"
                        } p-2 px-0 text-center text-lg`}
                        style={globalStyles.font}
                    >
                        User Settings
                    </Text>
                    {!user?.emailVerified && (
                        <TouchableOpacity
                            style={globalStyles.headerIcon}
                            onPress={verifyEmail}
                            className="-mt-[0.5px] mr-10"
                        >
                            <MaterialCommunityIcons
                                name="account-cancel-outline"
                                size={30}
                                color={
                                    colorScheme === "dark" ? "#fff" : "#000000"
                                }
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View className="mt-8 flex flex-col items-center justify-center">
                    <TouchableOpacity
                        onPress={updatePic}
                        className="flex flex-col items-center justify-center"
                    >
                        <View
                            className={`rounded-full ${
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
                            } p-2`}
                        >
                            <Image
                                source={{
                                    uri: image || user?.photoURL!,
                                }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Other Profile Details */}
                <View className="absolute bottom-36 mx-10 flex flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={signOut}
                        className={`rounded-lg ${
                            colorScheme == "dark" ? "bg-[#272934]" : "bg-white"
                        } p-5 shadow-md`}
                    >
                        <Text
                            className={`${
                                colorScheme === "dark"
                                    ? "text-[#fff]"
                                    : "text-[#000000]"
                            } text-sm`}
                            style={globalStyles.font}
                        >
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={deleteAccount}
                        className={`rounded-lg ${
                            colorScheme == "dark" ? "bg-[#272934]" : "bg-white"
                        } ml-5 p-5 shadow-md`}
                    >
                        <Text
                            className={`${
                                colorScheme === "dark"
                                    ? "text-[#fff]"
                                    : "text-[#000000]"
                            } text-sm`}
                            style={globalStyles.font}
                        >
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;
