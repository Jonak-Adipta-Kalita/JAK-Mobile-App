import { alertDataState } from "@/src/atoms/alertAtom";
import { AlertButton, Platform } from "react-native";
import { setRecoil } from "recoil-nexus";

const messageAlertShower = (
    title: string,
    message: string,
    buttons: [AlertButton, AlertButton] | [AlertButton]
) => {
    return Platform.OS === "android" || Platform.OS === "ios"
        ? setRecoil(alertDataState, {
              show: true,
              data: {
                  title,
                  message,
                  buttons,
              },
          })
        : undefined;
};

export default messageAlertShower;
