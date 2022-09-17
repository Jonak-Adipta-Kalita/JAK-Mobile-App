const __DEV__ = process.env.PRODUCTION !== "true";
const VERSION = "0.0.1";

export default {
    name: "JAK Mobile App",
    slug: "JAK-Mobile-App",
    version: VERSION,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: __DEV__ ? "host.exp.exponent" : "com.beastnighttv.jakmobileapp",
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
        bundleIdentifier: __DEV__
            ? "host.exp.exponent"
            : "com.beastnighttv.jakmobileapp",
        buildNumber: VERSION,
        googleServicesFile: __DEV__
            ? "./google_services_ios-dev.plist"
            : "./google_services_ios-prod.plist",
    },
    android: {
        permissions: [],
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
        package: __DEV__
            ? "host.exp.exponent"
            : "com.beastnighttv.jakmobileapp",
        googleServicesFile: __DEV__
            ? "./google_services_android-dev.json"
            : "./google_services_android-prod.json",
    },
};
