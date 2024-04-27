import { useSetAtom } from "jotai";
import { tabBarHideState } from "@atoms/tabBarAtom";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const useHideBottomTab = () => {
    const setTabBarHide = useSetAtom(tabBarHideState);

    useFocusEffect(
        useCallback(() => {
            setTabBarHide(true);
        }, [])
    );
};

const useShowBottomTab = () => {
    const setTabBarHide = useSetAtom(tabBarHideState);

    useFocusEffect(
        useCallback(() => {
            setTabBarHide(false);
        }, [])
    );
};

export { useHideBottomTab, useShowBottomTab };
