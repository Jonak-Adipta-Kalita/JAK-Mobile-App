import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { tabBarHideState } from "../atoms/tabBarAtom";

const useHideBottomTab = () => {
    const setTabBarHide = useSetRecoilState(tabBarHideState);

    useEffect(() => {
        setTabBarHide(true);

        return () => setTabBarHide(false);
    }, []);
};

export { useHideBottomTab };
