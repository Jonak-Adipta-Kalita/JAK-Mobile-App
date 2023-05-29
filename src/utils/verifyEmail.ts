import { User, sendEmailVerification } from "firebase/auth";
import messageAlertShower from "./alertShowers/messageAlertShower";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
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
        await setDoc(
            doc(db, "users", user?.uid!),
            {
                emailVerified: true,
            },
            { merge: true }
        );
        navigation.navigate("Home");
    } catch (error) {
        errorAlertShower(error);
    }
};
