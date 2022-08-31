import { useNavigation } from "@react-navigation/native";
import { collection, orderBy, query } from "firebase/firestore";
import React, { useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { View, TouchableOpacity, SafeAreaView, Text } from "react-native";
import { NavigationPropsStack } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";
import LoadingIndicator from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { AntDesign } from "@expo/vector-icons";

const NoteScreen = () => {
    const navigation = useNavigation<NavigationPropsStack>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [notes, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "notes"),
            orderBy("timestamp", "desc")
        )
    );

    const createNote = () => {};

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Notes!!",
            headerLeft: () => <ArrowGoBack />,
        });
    }, [navigation]);

    if (firestoreError || userError) {
        errorAlertShower(firestoreError || userError);
    }

    if (firestoreLoading || userLoading) {
        return (
            <LoadingIndicator
                containerStyle={{ flex: 1 }}
                dimensions={{ width: 70, height: 70 }}
            />
        );
    }

    return (
        <SafeAreaView className="flex-1">
            {notes?.docs.length === 0 && (
                <Text className="text-bold mt-5 self-center text-lg">
                    No Notes!! Press the Plus to create!!
                </Text>
            )}
            <View className="absolute bottom-10 right-10">
                <TouchableOpacity
                    className="rounded-full border border-8 border-black"
                    onPress={createNote}
                >
                    <AntDesign name="plus" size={60} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NoteScreen;
