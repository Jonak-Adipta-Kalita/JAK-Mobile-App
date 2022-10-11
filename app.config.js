/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();

const PACKAGE_NAME = process.env.PACKAGE_NAME;
const VERSION = "0.0.1";

export default {
    name: "JAK Mobile App",
    slug: "JAK-Mobile-App",
    version: VERSION,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: PACKAGE_NAME,
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    privacy: "public",
    githubUrl: "https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App",
    assetBundlePatterns: ["**/*"],
    notification: {
        icon: "./assets/images/icon.png",
        color: "#C14580",
        androidMode: "collapse",
        iosDisplayInForeground: false,
        androidCollapsedTitle:
            "{unread_notifications} new Notifications from JAK Mobile App!!",
    },
    ios: {
        usesAppleSignIn: true,
        supportsTablet: true,
        bundleIdentifier: PACKAGE_NAME,
        buildNumber: VERSION,
        googleServicesFile: "./google_services_ios.plist",
    },
    android: {
        permissions: [],
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
        package: PACKAGE_NAME,
        googleServicesFile: "./google_services_android.json",
    },
};
