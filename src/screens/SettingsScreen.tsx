import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useColorScheme,
    Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, db, storage } from "../firebase";
import globalStyles from "../globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "../components/Loading";
import errorAlertShower from "../utils/alertShowers/errorAlertShower";
import messageAlertShower from "../utils/alertShowers/messageAlertShower";
import * as ImagePicker from "expo-image-picker";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import StatusBar from "../components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadImageAsync } from "../utils/uploadImageAsync";
import { verifyEmail } from "../utils/verifyEmail";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "../../@types/navigation";

const ProfileDetail = ({ title, value }: { title: string; value: string }) => {
    const colorScheme = useColorScheme();

    return (
        <View className="mb-5">
            <TouchableOpacity
                className={`${
                    colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
                } flex flex-row items-center rounded-lg p-4 shadow-md`}
            >
                <Text
                    className={`${
                        colorScheme === "dark"
                            ? "text-[#fff]"
                            : "text-[#000000]"
                    } ml-5 text-lg`}
                    style={globalStyles.font}
                >
                    {title}
                </Text>
                <Text
                    className="ml-5 text-sm text-gray-400"
                    style={globalStyles.font}
                >
                    {value}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const SettingsScreen = () => {
    const [user, userLoading, userError] = useAuthState(auth);
    const [image, setImage] = useState<null | string>(null);
    const colorScheme = useColorScheme();
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"Settings">>();

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
                    ref(storage, `users/${user?.uid}/profile_pic`)
                );
                updateProfile(user!, { photoURL: uploadURL });
                setDoc(
                    doc(db, "users", user?.uid!),
                    {
                        photoURL: uploadURL,
                    },
                    { merge: true }
                );
                setImage(uploadURL);
            }
        } catch (error) {
            errorAlertShower(error);
        }
    };

    const signOut = () => {
        messageAlertShower(
            "Are you sure you want to sign out?",
            "You can always sign back in",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                },
                {
                    text: "Sign Out",
                    onPress: () => {
                        auth.signOut().catch((error) => {
                            errorAlertShower(error);
                        });
                    },
                },
            ]
        );
    };

    const deleteAccount = () => {
        messageAlertShower(
            "Are you sure you want to delete your account?",
            "This action is irreversible!!",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const userUID = user?.uid;
                            await user?.delete();
                            deleteDoc(doc(db, "users", userUID!));
                            deleteObject(ref(storage, `users/${userUID}`));
                        } catch (error) {
                            errorAlertShower(error);
                        }
                    },
                },
            ]
        );
    };

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
                    {user?.emailVerified && (
                        <TouchableOpacity
                            style={globalStyles.headerIcon}
                            onPress={() => verifyEmail(navigation, user)}
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
                <View className="p-10 pt-16">
                    <ProfileDetail title="Name" value={user?.displayName!} />
                    <ProfileDetail title="Email" value={user?.email!} />
                </View>
                <View className="absolute bottom-36 w-full space-y-5">
                    <View className="flex flex-row items-center justify-evenly">
                        <TouchableOpacity
                            onPress={signOut}
                            className={`rounded-lg ${
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
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
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
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
                                Delete Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;
