import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../globalStyles";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "About Me!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
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
            <ScrollView>
                <Card>
                    <Card.Title>So you want to know about Me?</Card.Title>
                    <Card.Divider />
                    <Text style={[globalStyles.font, styles.content]}>
                        My name is JONAK ADIPTA KALITA. I am a student in
						Kendriya Vidyalaya Mangaldoi, I am currently
						studying in standard &rsquo;9th&rsquo;. I am a
						Programmer and also a &rsquo;Gamer&rsquo;. I code
						for fun but sometimes I also teach some of my
						colleagues some &rsquo;Python&rsquo;. I love Python
						and TypeScript/JavaScript the most. I am a Youtuber
						too. I love to play Games such as NFS, COD, AC,
						Among Us, GTA, etc. I am a huge fan of Anime and
						watched &rsquo;Pokemon&rsquo;,
						&rsquo;Beyblade&rsquo;, &rsquo;Dragon Ball Z&rsquo;.
                    </Text>
                </Card>
            </ScrollView>
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: "#594d4c",
    },
});
