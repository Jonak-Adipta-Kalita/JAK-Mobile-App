import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase";
import { Avatar, Button } from "react-native-elements";
import PropTypes from "prop-types";

export default function SettingsScreen({ navigation }) {
    const logOut = () => {
        auth.signOut().then(() => navigation.replace("Login"));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Profile!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 20 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ marginTop: 50, alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50 }}>
				<View>
					<Text style={{ fontSize: 17 }}>
						Name:
					</Text>
					<Text style={{ fontSize: 12 }}>
						{auth?.currentUser?.displayName}
					</Text>
				</View>
				<View>
					<Text style={{ fontSize: 15 }}>
						Email:
					</Text>
					<Text style={{ fontSize: 12 }}>
						{auth?.currentUser?.email}
					</Text>
				</View>
            </View>
			<View style={{ alignSelf: "center", position: 'absolute', bottom: 35 }}>
				<Button onPress={logOut} title="Logout" />
			</View>
        </View>
    );
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
		flexDirection: 'column',
		flex: 1
	},
});
