/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();

const PACKAGE_NAME = process.env.PACKAGE_NAME;
const PROJECT_ID = process.env.PROJECT_ID;
const VERSION = "0.0.1";

export default {
    name: "JAK Mobile App",
    slug: "JAK-Mobile-App",
    owner: "xxjonakadiptaxx",
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
    extra: {
        eas: {
            projectId: PROJECT_ID,
        },
    },
};
