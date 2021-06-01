import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function AboutScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "About!!",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerBackTitle: "Back",
      headerLeft: () => (
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ alignItems: "flex-start", margin: 16 }}
            onPress={navigation.goBack}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <StatusBar style="auto" />
      <Text 
		style={{ 
			fontSize: "20px",
			marginTop: "80px",
			marginRight: "20px",
			marginLeft: "20px" 
		}}
	  >
        My name is JONAK ADIPTA KALITA. I am a student in Kendriya Vidyalaya
        Mangaldoi, I am currently studying in standard '8th'. My mom is a Banker
        and my Dad is a Mathematics Teacher. I am a Coder and also a 'Home Game
        Developer'. I code for fun but sometimes I also teach some of my
        colleagues some 'Python'. I love Python and JavaScript the most. I am a
        Youtuber too. I love to play Games such as NFS, COD, AC, Among Us, GTA,
        etc. I am a huge fan of Anime and watched 'Pokemon', 'One Piece',
        'Beyblade', 'DBG'. If you want to get to my Instagram or Github you have
        to find it by yourself. Actually you'll find my Social Medias in the
        Social Media Page.
      </Text>
    </View>
  );
}

AboutScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
