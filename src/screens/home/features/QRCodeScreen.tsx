import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "@utils/globalStyles";
import {
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
    Linking,
} from "react-native";
import StatusBar from "@components/StatusBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import BarcodeMask from "react-native-barcode-mask";
import { TextInput } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "@utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    collection,
    orderBy,
    query,
    setDoc,
    doc,
    serverTimestamp,
    deleteDoc,
} from "firebase/firestore";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import LoadingIndicator from "@components/Loading";
import messageAlertShower from "@utils/alertShowers/messageAlertShower";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { uploadImageAsync } from "@utils/uploadImageAsync";
import { ScrollView } from "react-native-gesture-handler";
import Header from "@components/Header";
import { checkAncestoryDoc } from "@utils/checkAncestoryDoc";

const Create = () => {
    const colorScheme = useColorScheme();
    const [user, userLoading, userError] = useAuthState(auth);
    const [qrCodesFetched, firestoreLoading, firestoreError] = useCollection(
        query(
            collection(db, "users", user?.uid!, "qrcodes"),
            orderBy("timestamp", "desc")
        )
    );

    const [qrCodeData, setQRCodeData] = useState("");
    const [showStoredQRCodes, setShowStoredQRCodes] = useState(false);
    const qrCodeSVGDataURL = useRef<any>(null);

    const qrCodeAlreadyExists = () => {
        return (
            qrCodesFetched?.docs?.length! > 0 &&
            qrCodesFetched?.docs.some((doc) => doc.data().value === qrCodeData)
        );
    };

    const uploadQRCode = async (): Promise<string | null> => {
        setQRCodeData(qrCodeData.trim());
        const qrCodeID = qrCodeData.replaceAll("\n", ";").replaceAll(" ", "_");

        const fileRef = ref(storage, `users/${user?.uid}/qrcodes/${qrCodeID}`);

        if (qrCodeAlreadyExists()) {
            return await getDownloadURL(fileRef);
        }

        if (qrCodesFetched?.docs?.length! >= 5) {
            messageAlertShower(
                "Max QRCodes Reached!",
                "Total amount of QRCodes stored cannot be more than 5. Delete some from the Stored QRCode",
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
            return null;
        }

        const downloadURL = await uploadImageAsync(
            qrCodeSVGDataURL.current,
            fileRef,
            true
        );

        await checkAncestoryDoc(user!);
        await setDoc(doc(db, "users", user?.uid!, "qrcodes", qrCodeID), {
            value: qrCodeData,
            timestamp: serverTimestamp(),
            image: downloadURL,
        });

        return downloadURL;
    };

    const deleteQRCode = async () => {
        const qrCodeID = qrCodeData.replaceAll("\n", ";").replaceAll(" ", "_");

        await deleteDoc(doc(db, "users", user?.uid!, "qrcodes", qrCodeID));
        await deleteObject(
            ref(storage, `users/${user?.uid}/qrcodes/${qrCodeID}`)
        );
    };

    const downloadQRCode = async (qrCodeValue: string) => {
        const downloadURI = await uploadQRCode();

        if (!downloadURI) return;

        const directoryPath = FileSystem.documentDirectory + "QRCodes/";
        const filePath = directoryPath + qrCodeValue + ".png";

        if (!(await FileSystem.getInfoAsync(directoryPath)).exists) {
            await FileSystem.makeDirectoryAsync(directoryPath, {
                intermediates: true,
            });
        }

        const downloadedFile: FileSystem.FileSystemDownloadResult =
            await FileSystem.downloadAsync(downloadURI!, filePath);

        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        const album = await MediaLibrary.getAlbumAsync("QRCodes");
        if (album == null) {
            await MediaLibrary.createAlbumAsync("QRCodes", asset, false);
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

        messageAlertShower(
            "QRCode Downloaded!",
            "The QRCode has been downloaded to your device!!",
            [
                {
                    text: "OK",
                    onPress: () => {},
                },
            ]
        );
    };

    if (firestoreError || userError) {
        errorAlertShower(firestoreError || userError);
    }

    if (firestoreLoading || userLoading) {
        return (
            <LoadingIndicator
                containerStyle={{ flex: 1 }}
                dimensions={{ width: 70, height: 70 }}
            />
        );
    }

    return (
        <View className="mx-10">
            {showStoredQRCodes ? (
                <View className="-mx-7">
                    <View className="mx-7 flex flex-row items-center justify-between">
                        <TouchableOpacity
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                colorScheme == "dark"
                                    ? "bg-[#272934]"
                                    : "bg-white"
                            }`}
                            onPress={() => setShowStoredQRCodes(false)}
                        >
                            <Ionicons
                                name="close"
                                size={20}
                                color={
                                    colorScheme === "dark" ? "#fff" : "#000000"
                                }
                            />
                        </TouchableOpacity>
                        <Text
                            style={globalStyles.font}
                            className={`text-xl ${
                                colorScheme === "dark"
                                    ? "text-[#fff]"
                                    : "text-[#000000]"
                            } flex-1 text-center font-bold`}
                        >
                            Stored QRCodes ({qrCodesFetched?.docs?.length}/5)
                        </Text>
                    </View>
                    <ScrollView className="mt-[40px] space-y-2">
                        {qrCodesFetched?.docs?.map((qrCode) => (
                            <TouchableOpacity
                                key={qrCode.id}
                                className={`mb-5 px-7 ${
                                    colorScheme == "dark"
                                        ? "bg-[#272934]"
                                        : "bg-[#fff]"
                                } mx-5 rounded-lg p-5 shadow-md`}
                                onPress={() => {
                                    setQRCodeData(qrCode.data().value);
                                    setShowStoredQRCodes(false);
                                }}
                            >
                                <Text
                                    className={`${
                                        colorScheme === "dark"
                                            ? "text-[#fff]"
                                            : "text-[#000000]"
                                    } text-sm`}
                                    style={globalStyles.font}
                                >
                                    {qrCode.data().value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <View className="flex items-center justify-center space-y-5">
                    <View
                        className={`mb-5 px-7 ${
                            colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
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
                            onChangeText={(text) => setQRCodeData(text)}
                            value={qrCodeData}
                            multiline
                            autoFocus
                        />
                    </View>
                    <View>
                        {qrCodeData != "" ? (
                            <View className="flex flex-row items-center justify-center space-x-2">
                                <TouchableOpacity
                                    className={`rounded-full ${
                                        colorScheme == "dark"
                                            ? "bg-[#272934]"
                                            : "bg-white"
                                    } mb-10 p-5 shadow-md`}
                                    onPress={() =>
                                        qrCodeAlreadyExists()
                                            ? messageAlertShower(
                                                  "Are you sure?",
                                                  qrCodeData,
                                                  [
                                                      {
                                                          text: "Cancel",
                                                          onPress: () => {},
                                                      },
                                                      {
                                                          text: "Delete",
                                                          onPress: deleteQRCode,
                                                      },
                                                  ]
                                              )
                                            : uploadQRCode()
                                    }
                                >
                                    <FontAwesome
                                        name={
                                            qrCodeAlreadyExists()
                                                ? "trash"
                                                : "cloud-upload"
                                        }
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
                                    onPress={() => downloadQRCode(qrCodeData)}
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
                            <View>
                                {qrCodesFetched?.docs?.length! > 0 && (
                                    <TouchableOpacity
                                        className={`rounded-lg ${
                                            colorScheme == "dark"
                                                ? "bg-[#272934]"
                                                : "bg-white"
                                        } p-5 px-12 shadow-md`}
                                        onPress={() =>
                                            setShowStoredQRCodes(true)
                                        }
                                    >
                                        <Text
                                            className={`${
                                                colorScheme === "dark"
                                                    ? "text-[#fff]"
                                                    : "text-[#000000]"
                                            } text-center text-xs`}
                                            style={globalStyles.font}
                                        >
                                            Stored QRCodes
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                    {qrCodeData != "" && (
                        <View className="mx-10">
                            <QRCode
                                value={qrCodeData}
                                size={300}
                                backgroundColor={
                                    colorScheme == "dark" ? "#413f44" : "white"
                                }
                                color={colorScheme == "dark" ? "#fff" : "#000"}
                                getRef={(c) => {
                                    if (!c || !c.toDataURL) return;

                                    c?.toDataURL((base64Image: string) => {
                                        qrCodeSVGDataURL.current = base64Image;
                                    });
                                }}
                            />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const QRCodeScreen = () => {
    const navigation = useNavigation<BottomTabStackNavigationProps<"QRCode">>();
    const colorScheme = useColorScheme();
    useHideBottomTab();
    const [mode, setMode] = useState<"scan" | "create" | null>(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState<any | null>(null);

    const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
        setScanned(true);
        if (data.startsWith("https://")) {
            Linking.openURL(data);
        }
        setScannedData(data);
    };

    useEffect(() => {
        const requestPermissions = async () => {
            const { status: barcodeStatus } =
                await BarCodeScanner.requestPermissionsAsync();
            const { status: mediaLibraryStatus } =
                await MediaLibrary.requestPermissionsAsync();

            if (
                barcodeStatus !== "granted" &&
                mediaLibraryStatus !== "granted"
            ) {
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
                <Header title="QRCode" />
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
                    <View>
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
                                            } mx-2 text-center text-sm ${
                                                scannedData.startsWith(
                                                    "https://"
                                                )
                                                    ? "underline-blue-500 text-blue-500 underline"
                                                    : ""
                                            }`}
                                            style={globalStyles.font}
                                            onPress={() => {
                                                if (
                                                    scannedData.startsWith(
                                                        "https://"
                                                    )
                                                ) {
                                                    Linking.openURL(
                                                        scannedData
                                                    );
                                                }
                                            }}
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
                        {mode === "create" && <Create />}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QRCodeScreen;
