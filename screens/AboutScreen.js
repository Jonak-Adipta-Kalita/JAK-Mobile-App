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
import PropTypes from "prop-types";
import { Card } from "react-native-elements";

export default function AboutScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "About Me!!",
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
            <Card>
                <Card.Title>So you want to know about Me?</Card.Title>
                <Card.Divider />
                <Text style={styles.content}>
                    My name is JONAK ADIPTA KALITA. I am a student in Kendriya
                    Vidyalaya Mangaldoi, I am currently studying in standard
                    '8th'. I am a Coder and also a 'Home Game Developer'. I code
                    for fun but sometimes I also teach some of my colleagues
                    some 'Python'. I love Python and JavaScript the most. I am a
                    Youtuber too. I love to play Games such as NFS, COD, AC,
                    Among Us, GTA, etc. I am a huge fan of Anime and watched
                    'Pokemon', 'One Piece', 'Beyblade', 'DBG'.
                </Text>
            </Card>
        </View>
    );
}

AboutScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
    content: {
        fontSize: 20,
        color: "#594d4c",
    },
});
