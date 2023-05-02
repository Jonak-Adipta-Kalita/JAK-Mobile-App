import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

export type StackScreenParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    GetStarted: undefined;
    Notification: undefined;
    Settings: undefined;
    ChangeEmail: undefined;
    ChangeName: undefined;
    ChangePhoneNumber: undefined;
    Todo: undefined;
};

export type BottomTabScreensParamList = {
    HomeTab: undefined;
    AuthTab: undefined;
    ProfileTab: undefined;
};

export type BottomTabStackNavigationProps<
    StackRouteName extends keyof StackScreenParamList
> = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabScreensParamList>,
    StackNavigationProp<StackScreenParamList, StackRouteName>
>;
