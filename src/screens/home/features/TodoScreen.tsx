import { useNavigation } from "@react-navigation/native";
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    orderBy,
    query,
    QuerySnapshot,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    View,
    TouchableOpacity,
    Text,
    useColorScheme,
    ScrollView,
} from "react-native";
import { BottomTabStackNavigationProps } from "../../../../@types/navigation";
import LoadingIndicator from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import globalStyles from "../../../globalStyles";
import StatusBar from "../../../components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { useHideBottomTab } from "../../../hooks/useHideBottomTab";

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
                    } text-sm`}
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
    todosFetched,
    setCreatingNewTodo,
}: {
    todosFetched: QuerySnapshot<DocumentData> | undefined;
    setCreatingNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [todoText, setTodoText] = useState("");
    const [user] = useAuthState(auth);
    const colorScheme = useColorScheme();

    const createTodo = () => {
        setDoc(
            doc(
                db,
                "users",
                user?.uid!,
                "todos",
                `todo_${todosFetched?.docs?.length! + 1}`
            ),
            {
                value: todoText,
                id: `todo_${todosFetched?.docs?.length! + 1}`,
                timestamp: serverTimestamp(),
            }
        );
        setCreatingNewTodo(false);
        setTodoText("");
    };

    return (
        <View
            className={`mb-5 px-7 ${
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
                <TouchableOpacity onPress={() => createTodo()} className="mr-5">
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
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                        className="-mt-[0.5px] ml-10"
                    >
                        <AntDesign
                            name="back"
                            size={24}
                            color={colorScheme === "dark" ? "#fff" : "#000000"}
                        />
                    </TouchableOpacity>
                    <Text
                        className={`m-5 mx-10 ml-6 flex-1 rounded-2xl ${
                            colorScheme == "dark"
                                ? "bg-[#272934] text-gray-200"
                                : "bg-white text-gray-900"
                        } p-2 px-0 text-center text-lg`}
                        style={globalStyles.font}
                    >
                        Todo
                    </Text>
                </View>
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
                    <ScrollView className="mb-32 mt-10">
                        {todos?.map(({ id, data }) => (
                            <Todo id={id} key={id} data={data} />
                        ))}
                        {creatingNewTodo && (
                            <CreateNewTodo
                                todosFetched={todosFetched}
                                setCreatingNewTodo={setCreatingNewTodo}
                            />
                        )}
                    </ScrollView>
                )}
                <View className="absolute bottom-10 right-10">
                    <TouchableOpacity
                        className={`rounded-full border-8 ${
                            colorScheme === "dark"
                                ? "border-white"
                                : "border-black"
                        }`}
                        onPress={() => setCreatingNewTodo(true)}
                    >
                        <AntDesign
                            name="plus"
                            size={50}
                            color={colorScheme === "dark" ? "#fff" : "#000000"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;
