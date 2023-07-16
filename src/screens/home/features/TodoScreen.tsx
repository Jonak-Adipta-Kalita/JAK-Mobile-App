import { useNavigation } from "@react-navigation/native";
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import LoadingIndicator from "@components/Loading";
import { auth, db } from "@utils/firebase";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "@utils/globalStyles";
import StatusBar from "@components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { useHideBottomTab } from "@hooks/useBottomTab";
import Header from "@components/Header";
import { checkAncestoryDoc } from "@/src/utils/checkAncestoryDoc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Todo = ({ id, data }: { id: string; data: DocumentData }) => {
    const colorScheme = useColorScheme();
    const [user] = useAuthState(auth);

    return (
        <View
            className={`mb-5 px-7 ${
                colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
            } mx-5 rounded-lg p-5 shadow-md`}
        >
            <View className="flex flex-row items-center justify-between">
                <Text
                    className={`${
                        colorScheme === "dark"
                            ? "text-[#fff]"
                            : "text-[#000000]"
                    } mr-5 flex-1 text-sm`}
                    style={globalStyles.font}
                >
                    {data.value}
                </Text>
                <TouchableOpacity
                    onPress={async () => {
                        await deleteDoc(
                            doc(db, "users", user?.uid!, "todos", id)
                        );
                    }}
                >
                    <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CreateNewTodo = ({
    setCreatingNewTodo,
}: {
    setCreatingNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [todoText, setTodoText] = useState("");
    const [user] = useAuthState(auth);
    const colorScheme = useColorScheme();
    const [creatingTodo, setCreatingTodo] = useState<boolean>(false);

    const createTodo = async () => {
        setCreatingTodo(true);
        await checkAncestoryDoc(user!);
        await setDoc(
            doc(
                db,
                "users",
                user?.uid!,
                "todos",
                todoText.replaceAll("\n", ";").replaceAll(" ", "_")
            ),
            {
                value: todoText,
                timestamp: serverTimestamp(),
            }
        );
        setCreatingNewTodo(false);
        setCreatingTodo(false);
        setTodoText("");
    };

    return (
        <View
            className={`${creatingTodo ? "hidden" : ""} mb-5 px-7 ${
                colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
            } mx-5 rounded-lg p-5 shadow-md`}
        >
            <View className="flex flex-row items-center justify-between">
                <TextInput
                    placeholder="Enter Todo"
                    className={`${
                        colorScheme === "dark"
                            ? "text-[#fff]"
                            : "text-[#000000]"
                    } flex-1 text-sm`}
                    placeholderTextColor={"#9CA3AF"}
                    style={globalStyles.font}
                    onChangeText={(e) => setTodoText(e)}
                    autoFocus
                />
                <TouchableOpacity
                    onPress={createTodo}
                    disabled={todoText === ""}
                    className="mr-5"
                >
                    <Entypo
                        name="check"
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreatingNewTodo(false)}>
                    <Entypo
                        name="cross"
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const TodoScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"Todo">>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [todosFetched, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "todos"),
            orderBy("timestamp", "asc")
        )
    );
    const [todos, setTodos] = useState<{ id: string; data: DocumentData }[]>(
        []
    );
    const [creatingNewTodo, setCreatingNewTodo] = useState<boolean>(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        setTodos(
            todosFetched
                ? todosFetched.docs.map((doc) => ({
                      id: doc.id,
                      data: doc.data(),
                  }))
                : []
        );
    }, [user, navigation, todosFetched]);

    useHideBottomTab();

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
            <StatusBar />
            <View className="flex-1">
                <Header title="Todo" />
                {todosFetched?.docs.length === 0 && !creatingNewTodo ? (
                    <View className="mt-[50%] flex-1 items-center">
                        <Text
                            className={`self-center rounded-2xl ${
                                colorScheme == "dark"
                                    ? "bg-[#272934] text-gray-200"
                                    : "bg-white text-gray-900"
                            } mx-10 p-5 text-center text-lg`}
                            style={globalStyles.font}
                        >
                            No Todo!! Press the Plus to create.
                        </Text>
                    </View>
                ) : (
                    <>
                        <View className="w-full">
                            <Text
                                style={globalStyles.font}
                                className={`mr-10 text-right text-lg ${
                                    colorScheme == "dark"
                                        ? "text-gray-200"
                                        : "text-gray-900"
                                }`}
                            >
                                {todosFetched?.docs?.length}/10
                            </Text>
                        </View>
                        <KeyboardAwareScrollView
                            style={{ backgroundColor: "#413f44" }}
                            contentContainerStyle={{
                                marginTop: 20,
                            }}
                            resetScrollToCoords={{ x: 0, y: 0 }}
                        >
                            {todos?.map(({ id, data }) => (
                                <Todo id={id} key={id} data={data} />
                            ))}
                            {creatingNewTodo && (
                                <>
                                    <CreateNewTodo
                                        setCreatingNewTodo={setCreatingNewTodo}
                                    />
                                    <View className="mb-2" />
                                </>
                            )}
                        </KeyboardAwareScrollView>
                    </>
                )}
                {todosFetched?.docs.length! < 10 && !creatingNewTodo && (
                    <View className="absolute bottom-10 right-10">
                        <TouchableOpacity
                            className={`${
                                colorScheme === "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
                            } rounded-full p-2`}
                            onPress={() => setCreatingNewTodo(true)}
                        >
                            <AntDesign
                                name="plus"
                                size={50}
                                color={colorScheme === "dark" ? "#fff" : "#000"}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;
