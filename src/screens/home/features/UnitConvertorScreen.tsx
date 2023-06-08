import React, { useState } from "react";
import StatusBar from "@/src/components/StatusBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHideBottomTab } from "@/src/hooks/useBottomTab";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "@/src/utils/globalStyles";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import { useNavigation } from "@react-navigation/native";
import convert, { Measure } from "convert-units";
import Dropdown from "@components/Dropdown";

const measures: { [key in Measure]: string } = {
    length: "Length",
    mass: "Mass",
    volume: "Volume",
    temperature: "Temperature",
    time: "Time",
    speed: "Speed",
    pace: "Pace",
    pressure: "Pressure",
    current: "Current",
    voltage: "Voltage",
    power: "Power",
    reactivePower: "Reactive Power",
    apparentPower: "Apparent Power",
    energy: "Energy",
    reactiveEnergy: "Reactive Energy",
    volumeFlowRate: "Volume Flow Rate",
    illuminance: "Illuminance",
    frequency: "Frequency",
    angle: "Angle",
    area: "Area",
    ditgital: "Digital",
    partsPer: "Parts Per",
};

const UnitConvertorScreen = () => {
    const navigation =
        useNavigation<BottomTabStackNavigationProps<"UnitConvertor">>();
    const colorScheme = useColorScheme();
    useHideBottomTab();

    const [measureDropdownExpanded, setMeasureDropdownExpanded] =
        useState(false);
    const [fromDropdownExpanded, setFromDropdownExpanded] = useState(false);

    const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(
        null
    );
    const [selectedFrom, setSelectedFrom] = useState<string | null>(null);
    const [selectedTo, setSelectedTo] = useState<string | null>(null);

    const getData = (selectedMeasure: Measure) => {
        const data = convert().possibilities(selectedMeasure);
        return data.map((item) => ({
            label: item,
            value: item,
        }));
    };

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
                        Unit Converter
                    </Text>
                </View>
                <View className="mx-20 mt-10">
                    <Dropdown
                        items={Object.keys(measures).map((measure) => ({
                            value: measure,
                            // @ts-ignore
                            label: measures[measure] as string,
                        }))}
                        dropdownExpanded={measureDropdownExpanded}
                        setDropdownExpanded={setMeasureDropdownExpanded}
                        selectedValue={selectedMeasure!}
                        setSelectedValue={setSelectedMeasure}
                        placeholderName="Measure"
                    />
                </View>
                {selectedMeasure !== null && (
                    <View className="mx-16 mt-[40px]">
                        <View className="flex flex-row items-center justify-center">
                            <Text
                                className={`mr-6 text-lg ${
                                    colorScheme == "dark"
                                        ? "text-gray-200"
                                        : "text-gray-900"
                                }`}
                                style={globalStyles.font}
                            >
                                From :
                            </Text>
                            <Dropdown
                                items={getData(selectedMeasure!)}
                                dropdownExpanded={fromDropdownExpanded}
                                setDropdownExpanded={setFromDropdownExpanded}
                                selectedValue={selectedFrom!}
                                setSelectedValue={setSelectedFrom}
                                placeholderName="Unit"
                            />
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default UnitConvertorScreen;
