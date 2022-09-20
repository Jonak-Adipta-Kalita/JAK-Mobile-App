import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

export type ScreensParamList = {
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

export type DrawerScreensParamList = ScreensParamList & {
    HomeDrawer: undefined;
    AuthDrawer: undefined;
    ProfileDrawer: undefined;
};

export type TopTabScreensParamList = ScreensParamList & {
    PublicNotifications: undefined;
    PrivateNotifications: undefined;
};

type NavigationPropsStack = StackNavigationProp<ScreensParamList>;
type NavigationPropsDrawer = DrawerNavigationProp<DrawerScreensParamList>;
type NavigationPropsTopTab =
    MaterialTopTabNavigationProp<TopTabScreensParamList>;
