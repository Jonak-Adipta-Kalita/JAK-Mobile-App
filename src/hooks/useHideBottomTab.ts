import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { bottomTabScreenOptions } from "../utils/bottomTabScreenOptions";
import { useColorScheme } from "react-native";

const useHideBottomTab = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    useEffect(() => {
        navigation.getParent()!.setOptions({
            tabBarStyle: { display: "none" },
            tabBarVisible: false,
        });

        return () =>
            navigation
                .getParent()
                ?.setOptions(bottomTabScreenOptions(colorScheme));
    }, [navigation]);
};

export { useHideBottomTab };
