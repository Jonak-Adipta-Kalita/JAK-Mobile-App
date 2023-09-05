import { User, sendEmailVerification } from "firebase/auth";
import messageAlertShower from "./alertShowers/messageAlertShower";
import errorAlertShower from "./alertShowers/errorAlertShower";

export const verifyEmail = async (navigation: any, user: User) => {
    try {
        await sendEmailVerification(user);
        messageAlertShower(
            "Verification Email Sent",
            "Please check your Email!",
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
