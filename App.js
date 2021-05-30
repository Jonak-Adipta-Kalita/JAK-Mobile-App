import React from 'react';
import 'react-native-gesture-handler';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
	headerStyle: { backgroundColor: '#3f7de0' },
	headerTitleStyle: { color: 'white' },
	headerTintColor: "white",
};

export default function App({ navigation }) {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
