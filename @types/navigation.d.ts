import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

type ScreensParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    GetStarted: undefined;
    Notification: undefined;
    Settings: undefined;
    ChangeEmail: undefined;
    ChangeName: undefined;
    ChangePhoneNumber: undefined;
    Note: undefined;
};

interface DrawerScreensParamList extends ScreensParamList {
    HomeDrawer: undefined;
    AuthDrawer: undefined;
    ProfileDrawer: undefined;
}

interface NavigationScreensParamList extends ScreensParamList {
    PublicNotifications: undefined;
    PrivateNotifications: undefined;
}

type NavigationPropsStack = StackNavigationProp<ScreensParamList>;
type NavigationPropsDrawer = DrawerNavigationProp<DrawerScreensParamList>;
type NavigationPropsTopTab =
    MaterialTopTabNavigationProp<NavigationScreensParamList>;
