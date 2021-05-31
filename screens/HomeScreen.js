import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import PropTypes from "prop-types";

const HomeScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const login = () => {
    navigation.navigate("Login");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Welcome!!",
      headerStyle: { backgroundColor: "#fff", justifyContent: "center" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              alignItems: "flex-start",
              margin: 16,
            }}
            onPress={navigation.openDrawer}
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
            {user ? (
              <Entypo name="login" onPress={login} size={24} color="black" />
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
    </View>
  );
};

export default HomeScreen;

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
