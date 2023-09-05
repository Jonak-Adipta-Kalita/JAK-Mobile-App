import React from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, db, storage } from "@utils/firebase";
import globalStyles from "@utils/globalStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingIndicator from "@components/Loading";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import messageAlertShower from "@utils/alertShowers/messageAlertShower";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, getMetadata, ref } from "firebase/storage";
import StatusBar from "@components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { verifyEmail } from "@utils/verifyEmail";
import { useNavigation } from "@react-navigation/native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import { useShowBottomTab } from "../hooks/useBottomTab";
import Header from "../components/Header";

const ProfileDetail = ({ title, value }: { title: string; value: string }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity
                className={`${
                    colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
                } flex flex-row items-center rounded-lg py-4 shadow-md mb-5`}
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
                    numberOfLines={1}
                >
                    {value}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const SettingsScreen = () => {
    const [user, userLoading, userError] = useAuthState(auth);
    const colorScheme = useColorScheme();
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"Settings">>();
    useShowBottomTab();

    const avatar = createAvatar(adventurer, {
        seed: user?.uid!,
        glasses: ["variant01"],
        skinColor: ["ecad80"],
        glassesProbability: 100,
        hair: ["long04", "short06"],
        hairColor: ["85c2c6"],
        hairProbability: 100,
    });

    const avatarStyle =
        avatar.toJson().extra.hair === "long04"
            ? { marginTop: -10, marginLeft: 2 }
            : { marginTop: 7 };

    const signOut = () => {
        messageAlertShower("Are you sure?", "You can always sign back in", [
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
        ]);
    };

    const deleteAccount = () => {
        messageAlertShower("Are you sure?", "This action is irreversible!!", [
            {
                text: "Cancel",
                onPress: () => {},
            },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        const userUID = user?.uid!;
                        const dbDoc = doc(db, "users", userUID);
                        const storageRef = ref(storage, `users/${userUID}`);

                        await user?.delete();

                        if ((await getDoc(dbDoc)).exists()) {
                            await deleteDoc(dbDoc);
                        }

                        getMetadata(storageRef)
                            .then(() => {
                                deleteObject(storageRef);
                            })
                            .catch(() => {});
                    } catch (error) {
                        errorAlertShower(error);
                    }
                },
            },
        ]);
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
                <Header
                    title="User Settings"
                    goBackButton={false}
                    rightButton={
                        <TouchableOpacity
                            style={globalStyles.headerIcon}
                            onPress={() => verifyEmail(navigation, user!)}
                        >
                            <MaterialCommunityIcons
                                name="account-cancel-outline"
                                size={30}
                                color={
                                    colorScheme === "dark" ? "#fff" : "#000000"
                                }
                            />
                        </TouchableOpacity>
                    }
                    showRightButton={!user?.emailVerified}
                />
                <View className="mt-8 flex flex-col items-center justify-center">
                    <TouchableOpacity className="flex flex-col items-center justify-center">
                        <View
                            className={`rounded-full ${
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
                            } h-[120px] w-[120px]`}
                        >
                            <SvgXml
                                xml={avatar.toString()}
                                style={avatarStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="p-5 pt-16 flex flex-col items-center justify-center">
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
