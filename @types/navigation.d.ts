import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

export type StackScreenParamList = {
    GetStarted: undefined;
    Login: undefined;
    Register: undefined;

    Home: undefined;
    Todo: undefined;
    QRCode: undefined;

    NoNetwork: undefined;

    Settings: undefined;
};

export type BottomTabScreensParamList = {
    HomeTab: undefined;
    ProfileTab: undefined;
};

export type BottomTabStackNavigationProps<
    StackRouteName extends keyof StackScreenParamList,
> = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabScreensParamList>,
    StackNavigationProp<StackScreenParamList, StackRouteName>
>;
