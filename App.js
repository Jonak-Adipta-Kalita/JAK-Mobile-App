import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const globalScreenOptions = {
	headerStyle: { backgroundColor: '#3f7de0' },
	headerTitleStyle: { color: 'white' },
	headerTintColor: "white",
};

export default function App({ navigation }) {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions}>
				<Stack.Screen 
					name="Home" 
					component={HomeScreen} 
					options={({ navigation }) => ({
						title: "Welcome!!",
						headerLeft: () => (
							<View>
								<SafeAreaView style={{ flex: 1 }}>
									<TouchableOpacity 
										style={{ alignItems: "flex-start", margin: 16 }} 
										onPress={navigation.openDrawer}
									>
										<FontAwesome5 name="bars" size={24} />
									</TouchableOpacity>
								</SafeAreaView>
							</View>
						),
					})} 
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		color: "#161924",
		fontSize: 20,
		fontWeight: "500"
	}
});
