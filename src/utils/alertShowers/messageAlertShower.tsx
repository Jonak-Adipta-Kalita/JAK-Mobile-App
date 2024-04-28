import { alertDataState } from "@atoms/alertAtom";
import { AlertButton, Platform } from "react-native";
import { writeAtom } from "jotai-nexus";

const messageAlertShower = (
    title: string,
    message: string,
    noActionButtonText: "Ok" | "Cancel" | "No" = "Ok",
    actionButton?: { text: string; onPress: () => void }
) => {
    const buttons: [AlertButton, AlertButton] | [AlertButton] = [
        {
            text: noActionButtonText,
        },
    ];

    if (actionButton) buttons.push(actionButton);

    return Platform.OS === "android" || Platform.OS === "ios"
        ? writeAtom(alertDataState, {
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
