import React, { useLayoutEffect } from 'react';
import { 
	View, 
	Text, 
	Button, 
	StyleSheet, 
	SafeAreaView, 
	TouchableOpacity 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function HomeScreen({ navigation }) {
	const login = () => {};
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Welcome!!",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<SafeAreaView style={{ flex: 1 }}>
					<TouchableOpacity 
						style={{ alignItems: "flex-start", margin: 16 }} 
						onPress={navigation.openDrawer}
					>
						<FontAwesome5 name="bars" size={24} />
					</TouchableOpacity>
				</SafeAreaView>
			),
			headerRight: () => (
				<SafeAreaView style={{ flex: 1 }}>
					<TouchableOpacity 
						style={{ alignItems: "flex-end", margin: 16, justifyContent: "center" }}
						onPress={login}
					>
						<Button 
							title="Login" 
						/>
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
};

const styles = StyleSheet.create({
	text: {
		color: "#161924",
		fontSize: 20,
		fontWeight: "500"
	}
});
