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
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    View,
    TouchableOpacity,
    Text,
    useColorScheme,
    Keyboard,
    LayoutRectangle,
} from "react-native";
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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useHideBottomTab } from "@hooks/useBottomTab";
import Header from "@components/Header";
import { checkAncestoryDoc } from "@utils/checkAncestoryDoc";
import messageAlertShower from "@/src/utils/alertShowers/messageAlertShower";
import { Platform } from "react-native";

const WriteTodo = ({
    type,
    editingTodo,
    setWritingNewTodo,
}: {
    setWritingNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
    type: "create" | "edit";
    editingTodo?: {
        id: string;
        data: DocumentData;
    };
}) => {
    const [todoText, setTodoText] = useState(
        type === "create" ? "" : editingTodo?.data.value
    );
    const [user] = useAuthState(auth);
    const colorScheme = useColorScheme();
    const [writingTodo, setWritingTodo] = useState<boolean>(false);

    const writeTodo = async () => {
        setWritingTodo(true);
        if (type === "create") {
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
        } else if (type === "edit") {
            await deleteDoc(
                doc(db, "users", user?.uid!, "todos", editingTodo?.id!)
            );
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
                    timestamp: editingTodo?.data.timestamp,
                }
            );
        }
        setWritingNewTodo(false);
        setWritingTodo(false);
        setTodoText("");
    };

    return (
        <View
            className={`${writingTodo ? "hidden" : ""} mb-5 px-7 ${
                colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
            } mx-4 rounded-lg p-5 shadow-md`}
        >
            <View className="flex flex-row items-center justify-between">
                <TextInput
                    placeholder={type === "create" ? "Enter Todo" : "Edit Todo"}
                    className={`${
                        colorScheme === "dark"
                            ? "text-[#fff]"
                            : "text-[#000000]"
                    } mr-5 flex-1 text-sm`}
                    placeholderTextColor={"#9CA3AF"}
                    style={globalStyles.font}
                    onChangeText={(e) => setTodoText(e)}
                    autoFocus
                    value={todoText}
                />
                <View className="flex flex-row items-center justify-center space-x-2">
                    <TouchableOpacity
                        onPress={writeTodo}
                        disabled={todoText === ""}
                    >
                        <Entypo
                            name="check"
                            size={24}
                            color={
                                todoText === ""
                                    ? colorScheme === "dark"
                                        ? "#808080"
                                        : "#A3A3A3"
                                    : colorScheme === "dark"
                                    ? "#fff"
                                    : "#000000"
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setWritingNewTodo(false)}>
                        <Entypo
                            name="cross"
                            size={24}
                            color={colorScheme === "dark" ? "#fff" : "#000000"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Todo = ({
    id,
    data,
    alreadyEditingTodo,
    setEditingTodo,
    index,
    itemsCoords,
    setItemsCoords,
    setScrollToIndex,
}: {
    id: string;
    data: DocumentData;
    alreadyEditingTodo: boolean;
    setEditingTodo: React.Dispatch<React.SetStateAction<boolean>>;
    index: number;
    itemsCoords: LayoutRectangle[];
    setItemsCoords: React.Dispatch<React.SetStateAction<LayoutRectangle[]>>;
    setScrollToIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const colorScheme = useColorScheme();
    const [user] = useAuthState(auth);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditingTodo(editable);
    }, [editable]);

    return (
        <View
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                itemsCoords[index] = layout;
                setItemsCoords(itemsCoords);
            }}
        >
            {editable ? (
                <WriteTodo
                    setWritingNewTodo={setEditable}
                    type="edit"
                    editingTodo={{ id, data }}
                />
            ) : (
                <View
                    className={`mb-5 px-7 ${
                        colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
                    } mx-4 rounded-lg p-5 shadow-md`}
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
                        <View className="flex flex-row items-center justify-center space-x-2">
                            <TouchableOpacity
                                onPress={() => {
                                    setEditable(true);
                                    setScrollToIndex(index);
                                }}
                                disabled={alreadyEditingTodo}
                            >
                                <MaterialCommunityIcons
                                    name="pencil"
                                    size={24}
                                    color={
                                        alreadyEditingTodo
                                            ? colorScheme === "dark"
                                                ? "#808080"
                                                : "#A3A3A3"
                                            : colorScheme === "dark"
                                            ? "#fff"
                                            : "#000000"
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    messageAlertShower(
                                        "Are you sure?",
                                        data.value,
                                        [
                                            {
                                                text: "Cancel",
                                                style: "cancel",
                                            },
                                            {
                                                text: "Delete",
                                                onPress: async () => {
                                                    await deleteDoc(
                                                        doc(
                                                            db,
                                                            "users",
                                                            user?.uid!,
                                                            "todos",
                                                            id
                                                        )
                                                    );
                                                },
                                            },
                                        ]
                                    );
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="delete"
                                    size={24}
                                    color={
                                        colorScheme === "dark"
                                            ? "#fff"
                                            : "#000000"
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
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
    const [editingTodo, setEditingTodo] = useState<boolean>(false);
    const colorScheme = useColorScheme();
    const scrollRef = useRef<ScrollView | null>(null);

    const [itemsCoords, setItemCoords] = useState<LayoutRectangle[]>([]);
    const [scrollToIndex, setScrollToIndex] = useState(1);

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

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            () => {
                if (creatingNewTodo) {
                    scrollRef.current?.scrollToEnd();
                } else {
                    scrollRef.current?.scrollTo({
                        x: 0,
                        y: itemsCoords[scrollToIndex].y,
                        animated: true,
                    });
                }
            }
        );

        return () => {
            showSubscription.remove();
        };
    }, [scrollToIndex, creatingNewTodo]);

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
                <Header
                    title="Todo"
                    showRightButton={
                        todosFetched?.docs.length! < 10 &&
                        !creatingNewTodo &&
                        !editingTodo
                    }
                    rightButton={
                        <TouchableOpacity
                            onPress={() => setCreatingNewTodo(true)}
                        >
                            <AntDesign
                                name="pluscircleo"
                                size={24}
                                color={colorScheme === "dark" ? "#fff" : "#000"}
                            />
                        </TouchableOpacity>
                    }
                />
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
                    <ScrollView className="mt-5" ref={scrollRef}>
                        {todos?.map(({ id, data }, i) => (
                            <Todo
                                id={id}
                                key={id}
                                data={data}
                                setEditingTodo={setEditingTodo}
                                alreadyEditingTodo={
                                    editingTodo || creatingNewTodo
                                }
                                index={i}
                                itemsCoords={itemsCoords}
                                setItemsCoords={setItemCoords}
                                setScrollToIndex={setScrollToIndex}
                            />
                        ))}
                        {creatingNewTodo && (
                            <>
                                <WriteTodo
                                    setWritingNewTodo={setCreatingNewTodo}
                                    type="create"
                                />
                                <View className="mb-2" />
                            </>
                        )}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;
