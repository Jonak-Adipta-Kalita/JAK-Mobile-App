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
import {
    View,
    TouchableOpacity,
    Text,
    Modal,
    useColorScheme,
    ScrollView,
} from "react-native";
import { BottomTabStackNavigationProps } from "../../../../@types/navigation";
import LoadingIndicator from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { AntDesign } from "@expo/vector-icons";
import { Card, Input } from "@rneui/themed";
import globalStyles from "../../../globalStyles";
import { Entypo } from "@expo/vector-icons";
import StatusBar from "../../../components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { bottomTabScreenOptions } from "../../../navigation/BottomTabNavigator";

const TodoScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"Todo">>();
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

    useEffect(() => {
        navigation.getParent()!.setOptions({
            tabBarStyle: { display: "none" },
            tabBarVisible: false,
        });

        return () =>
            navigation
                .getParent()
                ?.setOptions(bottomTabScreenOptions(colorScheme));
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
        setModalVisible(false);
        setTodoText("");
    };

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
                {todosFetched?.docs.length === 0 ? (
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
                    <ScrollView>
                        {todos?.map(({ id, data }) => (
                            <Card
                                key={id}
                                containerStyle={{
                                    backgroundColor:
                                        colorScheme === "dark"
                                            ? "#000000"
                                            : "#fff",
                                }}
                            >
                                <View className="flex flex-row items-center justify-between">
                                    <Text
                                        style={{
                                            color:
                                                colorScheme === "dark"
                                                    ? "#fff"
                                                    : "#000000",
                                        }}
                                    >
                                        {data.value}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            deleteDoc(
                                                doc(
                                                    db,
                                                    "users",
                                                    user?.uid!,
                                                    "todos",
                                                    id
                                                )
                                            )
                                        }
                                    >
                                        <Entypo
                                            name="cross"
                                            size={24}
                                            color={
                                                colorScheme === "dark"
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
                                colorScheme === "dark" ? "bg-black" : "bg-white"
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
                                    className="rounded-[20px] bg-[#2196F3] p-[10px] disabled:bg-gray-400"
                                    style={{
                                        elevation: 2,
                                    }}
                                    onPress={createTodo}
                                    disabled={!todoText}
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
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
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
                            colorScheme === "dark"
                                ? "border-white"
                                : "border-black"
                        }`}
                        onPress={() => setModalVisible(true)}
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
