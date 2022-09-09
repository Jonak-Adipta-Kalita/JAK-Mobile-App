import { useNavigation } from "@react-navigation/native";
import { collection, orderBy, query } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Text,
    Modal,
} from "react-native";
import { NavigationPropsStack } from "../../../../@types/navigation";
import ArrowGoBack from "../../../components/ArrowGoBack";
import LoadingIndicator from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import errorAlertShower from "../../../utils/alertShowers/errorAlertShower";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import globalStyles from "../../../globalStyles";

const TodoScreen = () => {
    const navigation = useNavigation<NavigationPropsStack>();
    const [user, userLoading, userError] = useAuthState(auth);
    const [todos, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "todos"),
            orderBy("timestamp", "desc")
        )
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [todoText, setTodoText] = useState("");

    const createTodo = () => {};

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Todo(s)!!",
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
            {todos?.docs.length === 0 && (
                <Text className="text-bold mt-5 self-center text-lg">
                    No Todo(s)!! Press the Plus to create!!
                </Text>
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
                        className="m-[20px] items-center rounded-[20px] bg-white p-[35px] pt-[-20px]"
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
                    className="rounded-full border-8 border-black"
                    onPress={() => setModalVisible(true)}
                >
                    <AntDesign name="plus" size={60} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;
