import { DrawerNavigationProp } from "@react-navigation/drawer";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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

export type DrawerScreensParamList = {
    HomeDrawer: undefined;
    AuthDrawer: undefined;
    ProfileDrawer: undefined;
};

export type TopTabScreensParamList = {
    PublicNotifications: undefined;
    PrivateNotifications: undefined;
};

export type DrawerStackNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<DrawerScreensParamList>,
    StackNavigationProp<StackScreenParamList>
>;

export type TopTabDrawerStackNavigationProps = CompositeNavigationProp<
    CompositeNavigationProp<
        DrawerNavigationProp<DrawerScreensParamList>,
        StackNavigationProp<StackScreenParamList>
    >,
    MaterialTopTabScreenProps<TopTabScreensParamList>
>;
