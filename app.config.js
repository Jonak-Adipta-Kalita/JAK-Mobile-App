/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();

const PACKAGE_NAME = process.env.PACKAGE_NAME;
const PROJECT_ID = process.env.PROJECT_ID;
const VERSION = "v2.0.0";

const splash = {
    image: "./assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
    dark: {
        image: "./assets/images/splash.png",
        resizeMode: "cover",
        backgroundColor: "#413f44",
    },
};

export default {
    name: "StreamlineX",
    slug: "JAK-Mobile-App",
    owner: "xxjonakadiptaxx",
    version: VERSION,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: PACKAGE_NAME,
    userInterfaceStyle: "automatic",
    privacy: "public",
    githubUrl: "https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App",
    assetBundlePatterns: ["**/*"],
    ios: {
        splash,
        usesAppleSignIn: true,
        supportsTablet: true,
        bundleIdentifier: PACKAGE_NAME,
        buildNumber: VERSION,
        googleServicesFile: "./google_services_ios.plist",
    },
    android: {
        splash,
        permissions: [],
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
        package: PACKAGE_NAME,
        googleServicesFile: "./google_services_android.json",
    },
    plugins: [
        [
            "expo-camera",
            {
                cameraPermission: "Allow $(PRODUCT_NAME) to access camera.",
            },
        ],
    ],
    extra: {
        eas: {
            projectId: PROJECT_ID,
        },
    },
    updates: {
        url: `https://u.expo.dev/${PROJECT_ID}`,
    },
    runtimeVersion: {
        policy: "sdkVersion",
    },
};
