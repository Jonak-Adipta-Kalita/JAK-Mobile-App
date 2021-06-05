import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Login",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 20,
                        }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
		});
	}, [navigation]);
	return (
		<View>
			<StatusBar style="auto" />
		</View>
	);
}

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};
