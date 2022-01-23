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
                        Kendriya Vidyalaya Mangaldoi, I am currently studying in
                        standard &apos;8th&apos;. I am a Coder and also a
                        &apos;Home Game Developer&apos;. I code for fun but
                        sometimes I also teach some of my colleagues some
                        &apos;Python&apos;. I love &apos;Python&apos; and
                        &apos;JavaScript&apos; the most. I am a Youtuber too. I
                        love to play Games such as NFS, COD, AC, Among Us, GTA,
                        etc. I am a huge fan of Anime and watched
                        &apos;Pokemon&apos;, &apos;One Piece&apos;,
                        &apos;Beyblade&apos;, &apos;DBG&apos;.
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
