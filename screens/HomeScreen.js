import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import PropTypes from "prop-types";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
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
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
