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
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Text,
    Modal,
    useColorScheme,
    ScrollView,
} from "react-native";
import { DrawerStackNavigationProps } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";
import LoadingIndicator from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { AntDesign } from "@expo/vector-icons";
import { Card, Input } from "@rneui/themed";
import globalStyles from "../../../globalStyles";
import pushPrivateNotification from "../../../notify/privateNotification";
import { Entypo } from "@expo/vector-icons";
import StatusBar from "../../../components/StatusBar";

const TodoScreen = () => {
    const navigation = useNavigation<DrawerStackNavigationProps>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [todosFetched, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "todos"),
            orderBy("timestamp", "desc")
        )
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState<{ id: string; data: DocumentData }[]>(
        []
    );
    const scheme = useColorScheme();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Todo(s)!!",
            headerLeft: () => <ArrowGoBack />,
        });
    }, [navigation]);

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

    const createTodo = async () => {
        await setDoc(
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
        await pushPrivateNotification(user?.uid!, {
            title: "Added Todo!!",
            message: `Added your Todo: ${todoText}`,
            timestamp: serverTimestamp(),
        });
        setModalVisible(false);
        setTodoText("");
    };

    const deleteTodo = async (id: string, value: string) => {
        await deleteDoc(doc(db, "users", user?.uid!, "todos", id));
        await pushPrivateNotification(user?.uid!, {
            title: "Deleted Todo!!",
            message: `Deleted your Todo: ${value}`,
            timestamp: serverTimestamp(),
        });
    };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            {todosFetched?.docs.length === 0 ? (
                <Text
                    className="text-bold mt-5 self-center text-lg"
                    style={globalStyles.text}
                >
                    No Todo(s)!! Press the Plus to create!!
                </Text>
            ) : (
                <ScrollView>
                    {todos?.map(({ id, data }) => (
                        <Card
                            key={id}
                            containerStyle={{
                                backgroundColor:
                                    scheme === "dark" ? "#000000" : "#fff",
                            }}
                        >
                            <View className="flex flex-row items-center justify-between">
                                <Text
                                    style={{
                                        color:
                                            scheme === "dark"
                                                ? "#fff"
                                                : "#000000",
                                    }}
                                >
                                    {data.value}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        deleteTodo(data.id, data.value)
                                    }
                                >
                                    <Entypo
                                        name="cross"
                                        size={24}
                                        color={
                                            scheme === "dark"
                                                ? "#fff"
                                                : "#000000"
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="mt-[22px] flex-1 items-center justify-center">
                    <View
                        className={`m-[20px] items-center rounded-[20px] ${
                            scheme === "dark" ? "bg-black" : "bg-white"
                        } p-[35px] pt-[-20px]`}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <Input
                            placeholder="Text"
                            autoFocus
                            inputStyle={globalStyles.inputBar}
                            value={todoText}
                            onChangeText={(text) => setTodoText(text)}
                            inputContainerStyle={{ width: 300 }}
                        />
                        <View className="flex flex-row space-x-10">
                            <TouchableOpacity
                                className="rounded-[20px] bg-[#2196F3] p-[10px]"
                                style={{
                                    elevation: 2,
                                }}
                                onPress={createTodo}
                            >
                                <Text className="items-center font-bold text-white">
                                    Create
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="rounded-[20px] bg-red-500 p-[10px]"
                                style={{
                                    elevation: 2,
                                }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text className="items-center font-bold text-white">
                                    Hide
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View className="absolute bottom-10 right-10">
                <TouchableOpacity
                    className={`rounded-full border-8 ${
                        scheme === "dark" ? "border-white" : "border-black"
                    }`}
                    onPress={() => setModalVisible(true)}
                >
                    <AntDesign
                        name="plus"
                        size={60}
                        color={scheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;
