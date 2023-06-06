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
import { Measure } from "convert-units";
import { SelectList } from "react-native-dropdown-select-list";

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

    const [selectedMeasure, setSelectedMeasure] = useState<Measure>(
        Object.keys(measures)[0] as Measure
    );

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
                <View className="mt-10 flex flex-row items-center justify-center">
                    <SelectList
                        setSelected={(val: Measure) => setSelectedMeasure(val)}
                        data={Object.values(measures).map((measure, i) => ({
                            key: i,
                            value: measure,
                        }))}
                        save="value"
                        placeholder="Select a Measure"
                        searchPlaceholder="Search a Measure"
                        notFoundText="No Measure found"
                    />
                </View>
                <View className="flex flex-row items-center justify-center space-x-5">
                    <View></View>
                    <View></View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UnitConvertorScreen;
