module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./"],
                    alias: {
                        "@": ".",
                        "@components": "./src/components",
                        "@hooks": "./src/hooks",
                        "@navigation": "./src/navigation",
                        "@screens": "./src/screens",
                        "@themes": "./src/themes",
                        "@utils": "./src/utils",
                        "@atoms": "./src/atoms",
                        "@assets": "./assets",
                    },
                    extensions: [".js", ".ts", ".tsx"],
                },
            ],
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                },
            ],
            "nativewind/babel",
            "react-native-reanimated/plugin",
        ],
    };
};
