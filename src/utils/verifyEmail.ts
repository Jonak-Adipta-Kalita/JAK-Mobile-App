import { User, sendEmailVerification } from "firebase/auth";
import messageAlertShower from "./alertShowers/messageAlertShower";
import errorAlertShower from "./alertShowers/errorAlertShower";

export const verifyEmail = async (navigation: any, user: User) => {
    try {
        await sendEmailVerification(user);
        messageAlertShower(
            "Verification Email Successfully Sent!!",
            "Please check your Email for the Verification Link!!",
            [
                {
                    text: "OK",
                    onPress: () => {},
                },
            ]
        );
        navigation.navigate("Home");
    } catch (error) {
        errorAlertShower(error);
    }
};
