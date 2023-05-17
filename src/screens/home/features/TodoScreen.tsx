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
    useColorScheme,
    ScrollView,
} from "react-native";
import { BottomTabStackNavigationProps } from "../../../../@types/navigation";
import LoadingIndicator from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import globalStyles from "../../../globalStyles";
import { Entypo } from "@expo/vector-icons";
import StatusBar from "../../../components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { bottomTabScreenOptions } from "../../../navigation/BottomTabNavigator";

const Todo = ({ id, data }: { id: string; data: DocumentData }) => {
    const colorScheme = useColorScheme();
    const [user] = useAuthState(auth);

    return (
        <Card
            key={id}
            containerStyle={{
                backgroundColor: colorScheme === "dark" ? "#000000" : "#fff",
            }}
        >
            <View className="flex flex-row items-center justify-between">
                <Text
                    style={{
                        color: colorScheme === "dark" ? "#fff" : "#000000",
                    }}
                >
                    {data.value}
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        deleteDoc(doc(db, "users", user?.uid!, "todos", id))
                    }
                >
                    <Entypo
                        name="cross"
                        size={24}
                        color={colorScheme === "dark" ? "#fff" : "#000000"}
                    />
                </TouchableOpacity>
            </View>
        </Card>
    );
};

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
                    <ScrollView className="mb-32 mt-10">
                        {todos?.map(({ id, data }) => (
                            <Todo id={id} key={id} data={data} />
                        ))}
                    </ScrollView>
                )}
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
