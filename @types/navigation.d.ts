import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import type { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
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

export type TopTabScreensParamList = {
    PublicNotifications: undefined;
    PrivateNotifications: undefined;
};

export type BottomTabStackNavigationProps<
    StackRouteName extends keyof StackScreenParamList
> = CompositeNavigationProp<
    MaterialBottomTabNavigationProp<BottomTabScreensParamList>,
    StackNavigationProp<StackScreenParamList, StackRouteName>
>;

export type TopBottomTabStackNavigationProps<
    StackRouteName extends keyof StackScreenParamList,
    TopTabRouteName extends keyof TopTabScreensParamList
> = CompositeNavigationProp<
    BottomTabStackNavigationProps<StackRouteName>,
    MaterialTopTabNavigationProp<TopTabScreensParamList, TopTabRouteName>
>;
