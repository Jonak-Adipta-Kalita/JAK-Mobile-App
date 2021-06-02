import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Button } from 'react-native-elements';
import { auth } from "../firebase";
import PropTypes from "prop-types";

export default function HomeScreen({ navigation }) {
    const [user] = useAuthState(auth);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Welcome!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-start",
                            margin: 16,
                        }}
                        onPress={navigation.toggleDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
            headerRight: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-end",
                            margin: 16,
                        }}
                    >
                        {!user ? (
                            <Entypo
                                name="login"
                                onPress={() => navigation.navigate("Login")}
                                size={24}
                                color="black"
                            />
                        ) : (
                            <Ionicons
                                name="md-settings-outline"
                                onPress={() => navigation.navigate("Settings")}
                                size={24}
                                color="black"
                            />
                        )}
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View>
            <StatusBar style="auto" />
			<Card style={styles.card}>
				<Card.Title>About Me!!</Card.Title>
				<Card.Divider />
				<Button 
					onPress={() => navigation.navigate('About')} 
					title="Go to About Screen" 
				/>
			</Card>
			<Card style={styles.card}>
				<Card.Title>Contact Me!!</Card.Title>
				<Card.Divider />
				<Button 
					onPress={() => navigation.navigate('Contact')} 
					title="Go to Contact Screen" 
				/>
			</Card>
        </View>
    );
}

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	card: {
		maxWidth: "50%",
		maxHeight: "50%",
	},
});
