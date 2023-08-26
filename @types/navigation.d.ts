import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

export type StackScreenParamList = {
    GetStarted: undefined;
    NoNetwork: undefined;
    Home: undefined;
    Settings: undefined;
    Login: undefined;
    Register: undefined;

    Todo: undefined;
    QRCode: undefined;
    UnitConvertor: undefined;
};

export type BottomTabScreensParamList = {
    HomeTab: undefined;
    AuthTab: undefined;
    ProfileTab: undefined;
};

export type BottomTabStackNavigationProps<
    StackRouteName extends keyof StackScreenParamList,
> = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabScreensParamList>,
    StackNavigationProp<StackScreenParamList, StackRouteName>
>;
