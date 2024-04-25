import messageAlertShower from "./messageAlertShower";

const errorAlertShower = (error: any) => {
    if (!error) return;

    messageAlertShower(
        `${
            error.code && error.title
                ? `${error.code} - ${error.title}`
                : "Error"
        }`,
        error.message
    );
};

export default errorAlertShower;
