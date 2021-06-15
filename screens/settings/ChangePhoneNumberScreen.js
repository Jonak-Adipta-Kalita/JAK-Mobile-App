import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import PropTypes from "prop-types";

export default function ChangePhoneNumberScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const changePhoneNumber = () => {
        if (phoneNumber === "") {
            alert("Please Enter all the Values in the Form!!");
        } else {
			//Change or Set Phone Number
		}
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change your Phone Number!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 20,
                        }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Phone Number (Use Country Code)"
                    autoFocus
                    type="text"
                    style={styles.inputBar}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <Button
                style={styles.button}
                title="Upgrade"
                onPress={changePhoneNumber}
            />
        </View>
    );
}

ChangePhoneNumberScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginTop: 20,
    },
    inputContainer: {
        width: 350,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
