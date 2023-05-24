import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../../globalStyles";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import StatusBar from "../../../components/StatusBar";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useHideBottomTab } from "../../../hooks/useHideBottomTab";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { BottomTabStackNavigationProps } from "../../../../@types/navigation";
import BarcodeMask from "react-native-barcode-mask";
import { TextInput } from "react-native-gesture-handler";
import SVGQRCode from "react-native-qrcode-svg";
import { v4 as uuid } from "uuid";
import messageAlertShower from "../../../utils/alertShowers/messageAlertShower";
import * as FileSystem from "expo-file-system";

const QRCodeScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"QRCode">>();
    const colorScheme = useColorScheme();
    useHideBottomTab();
    const [mode, setMode] = useState<"scan" | "create" | null>(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState<any | null>(null);
    const [QRCodeData, setQRCodeData] = useState("");
    const [displayQRCode, setDisplayQRCode] = useState(false);
    const [qrCodeSVG, setQRCodeSVG] = useState<any | null>(null);

    const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
        setScanned(true);
        setScannedData(data);
    };

    const downloadQRCode = async () => {
        const dataURL: string = await qrCodeSVG.toDataURL();
        const fileName = `${FileSystem.documentDirectory}qrcode-${uuid()}.png`;

        messageAlertShower(
            "QR Code saved to Downloads directory",
            `Saved to ${fileName}`,
            [
                {
                    text: "OK",
                    onPress: () => {},
                },
            ]
        );
    };

    useEffect(() => {
        const requestPermissions = async () => {
            const { status: barcodeStatus } =
                await BarCodeScanner.requestPermissionsAsync();

            if (barcodeStatus !== "granted") {
                navigation.replace("Home");
            }
        };

        requestPermissions();
    }, []);

    if (mode === "scan" && !scanned) {
        return (
            <View className="relative">
                <View className="absolute bottom-[15%] left-1/2 z-40 -ml-8 -translate-x-1/2 transform">
                    <TouchableOpacity
                        onPress={() => setMode(null)}
                        className="z-50 rounded-full bg-[#fff] p-5"
                    >
                        <AntDesign
                            name="close"
                            size={24}
                            color={colorScheme === "dark" ? "#000000" : "#fff"}
                        />
                    </TouchableOpacity>
                </View>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={{
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <BarcodeMask
                        edgeColor="#62B1F6"
                        height={300}
                        width={300}
                        showAnimatedLine
                    />
                </BarCodeScanner>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1">
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                        className="-mt-[0.5px] ml-10"
                    >
                        <AntDesign
                            name="back"
                            size={24}
                            color={colorScheme === "dark" ? "#fff" : "#000000"}
                        />
                    </TouchableOpacity>
                    <Text
                        className={`m-5 mx-10 ml-6 flex-1 rounded-2xl ${
                            colorScheme == "dark"
                                ? "bg-[#272934] text-gray-200"
                                : "bg-white text-gray-900"
                        } p-2 px-0 text-center text-lg`}
                        style={globalStyles.font}
                    >
                        QRCode
                    </Text>
                </View>
                <View className="mt-10">
                    <View className="flex w-full flex-row items-center justify-center space-x-5">
                        <TouchableOpacity
                            className={`rounded-lg ${
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
                            } p-5 px-16 shadow-md`}
                            onPress={() => setMode("scan")}
                        >
                            <Text
                                className={`${
                                    colorScheme === "dark"
                                        ? "text-[#fff]"
                                        : "text-[#000000]"
                                } text-center text-sm`}
                                style={globalStyles.font}
                            >
                                Scan
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`rounded-lg ${
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
                            } p-5 px-16 shadow-md`}
                            onPress={() => setMode("create")}
                        >
                            <Text
                                className={`${
                                    colorScheme === "dark"
                                        ? "text-[#fff]"
                                        : "text-[#000000]"
                                } text-center text-sm`}
                                style={globalStyles.font}
                            >
                                Create
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mb-8 mt-5 border-b-[0.5px] border-black" />
                    <View className="">
                        {mode === null && (
                            <View className="mt-10">
                                <Text
                                    className={`self-center rounded-2xl ${
                                        colorScheme == "dark"
                                            ? "bg-[#272934] text-gray-200"
                                            : "bg-white text-gray-900"
                                    } mx-5 p-5 text-center text-lg`}
                                    style={globalStyles.font}
                                >
                                    Select a Mode to continue.
                                </Text>
                            </View>
                        )}
                        {mode === "scan" && (
                            <View className="flex items-center">
                                {scanned && (
                                    <View className="flex flex-col items-center justify-center space-y-10">
                                        <Text
                                            className={`${
                                                colorScheme === "dark"
                                                    ? "text-[#fff]"
                                                    : "text-[#000000]"
                                            } text-center text-sm`}
                                            style={globalStyles.font}
                                        >
                                            {scannedData}
                                        </Text>
                                        <TouchableOpacity
                                            className={`rounded-lg ${
                                                colorScheme == "dark"
                                                    ? "bg-[#272934]"
                                                    : "bg-white"
                                            } p-5 px-16 shadow-md`}
                                            onPress={() => {
                                                setScanned(false);
                                                setScannedData(null);
                                            }}
                                        >
                                            <Text
                                                className={`${
                                                    colorScheme === "dark"
                                                        ? "text-[#fff]"
                                                        : "text-[#000000]"
                                                } text-center text-sm`}
                                                style={globalStyles.font}
                                            >
                                                Scan Again
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                        {mode === "create" && (
                            <View className="mx-10 flex items-center justify-center space-y-5">
                                <View
                                    className={`mb-5 px-7 ${
                                        colorScheme == "dark"
                                            ? "bg-[#272934]"
                                            : "bg-[#fff]"
                                    } mx-5 w-full rounded-lg p-5 shadow-md`}
                                >
                                    <TextInput
                                        placeholder="Enter Text to be Stored"
                                        placeholderTextColor={"#9CA3AF"}
                                        className={`${
                                            colorScheme === "dark"
                                                ? "text-[#fff]"
                                                : "text-[#000000]"
                                        } text-sm`}
                                        style={globalStyles.font}
                                        onChangeText={(text) =>
                                            setQRCodeData(text)
                                        }
                                        value={QRCodeData}
                                        multiline
                                    />
                                </View>
                                <View className="">
                                    {displayQRCode ? (
                                        <View className="flex flex-row items-center justify-center space-x-2">
                                            <TouchableOpacity
                                                className={`rounded-full ${
                                                    colorScheme == "dark"
                                                        ? "bg-[#272934]"
                                                        : "bg-white"
                                                } mb-10 p-5 shadow-md`}
                                                onPress={downloadQRCode}
                                            >
                                                <FontAwesome
                                                    name="cloud-download"
                                                    size={24}
                                                    color={
                                                        colorScheme === "dark"
                                                            ? "#fff"
                                                            : "#000000"
                                                    }
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                className={`rounded-full ${
                                                    colorScheme == "dark"
                                                        ? "bg-[#272934]"
                                                        : "bg-white"
                                                } mb-10 p-5 shadow-md`}
                                                onPress={() => {
                                                    setDisplayQRCode(false);
                                                    setQRCodeData("");
                                                }}
                                            >
                                                <Entypo
                                                    name="cross"
                                                    size={24}
                                                    color={
                                                        colorScheme === "dark"
                                                            ? "#fff"
                                                            : "#000000"
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            className={`rounded-lg ${
                                                colorScheme == "dark"
                                                    ? "bg-[#272934]"
                                                    : "bg-white"
                                            } mb-10 p-5 px-16 shadow-md`}
                                            onPress={() => {
                                                setDisplayQRCode(true);
                                            }}
                                        >
                                            <Text
                                                className={`${
                                                    colorScheme === "dark"
                                                        ? "text-[#fff]"
                                                        : "text-[#000000]"
                                                } text-center text-sm`}
                                                style={globalStyles.font}
                                            >
                                                Create
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {displayQRCode && (
                                    <View className="mx-10">
                                        <SVGQRCode
                                            value={QRCodeData}
                                            size={300}
                                            backgroundColor={
                                                colorScheme == "dark"
                                                    ? "#413f44"
                                                    : "white"
                                            }
                                            color={
                                                colorScheme == "dark"
                                                    ? "#fff"
                                                    : "#000"
                                            }
                                            getRef={(c) => setQRCodeSVG(c)}
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QRCodeScreen;
