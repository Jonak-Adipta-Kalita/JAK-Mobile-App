import React, { useState } from "react";
import StatusBar from "@components/StatusBar";
import { Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHideBottomTab } from "@hooks/useBottomTab";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from "@utils/globalStyles";
import convert, { Measure } from "convert-units";
import Dropdown from "@components/Dropdown";
import Header from "@components/Header";

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
    const colorScheme = useColorScheme();
    useHideBottomTab();

    const [measureDropdownExpanded, setMeasureDropdownExpanded] =
        useState(false);
    const [fromDropdownExpanded, setFromDropdownExpanded] = useState(false);
    const [toDropdownExpanded, setToDropdownExpanded] = useState(false);

    const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(
        null
    );
    const [selectedFrom, setSelectedFrom] = useState<convert.Unit | null>(null);
    const [selectedTo, setSelectedTo] = useState<convert.Unit | null>(null);

    const [fromValue, setFromValue] = useState<string>("0");
    const [toValue, setToValue] = useState<string>("0");

    const getData = (selectedMeasure: Measure) => {
        const data = convert().possibilities(selectedMeasure);
        return data.map((item) => ({
            label: item,
            value: item,
        }));
    };

    const convertUnit = (
        value: string,
        from: convert.Unit,
        to: convert.Unit
    ) => {
        return convert(parseInt(value === "" ? "0" : value))
            .from(from)
            .to(to);
    };

    const onSelectedUnit = (item: any, unitType: "from" | "to") => {
        if (!selectedFrom || !selectedTo) return;
        const converted = convertUnit(
            fromValue,
            unitType === "from" ? item.label : selectedFrom!,
            unitType === "to" ? item.label : selectedTo!
        );
        setToValue(converted.toString());
    };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <View className="flex-1">
                <Header title="Unit Convertor" />
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
                        onSelectItem={() => {
                            setSelectedFrom(null);
                            setSelectedTo(null);
                            setFromValue("0");
                            setToValue("0");
                        }}
                    />
                </View>
                {selectedMeasure !== null && !measureDropdownExpanded && (
                    <View className="mx-5 mt-[50px] space-y-10">
                        <View>
                            <View className="mx-[40px] flex flex-row items-center justify-center">
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
                                    setDropdownExpanded={
                                        setFromDropdownExpanded
                                    }
                                    selectedValue={selectedFrom!}
                                    setSelectedValue={setSelectedFrom}
                                    placeholderName="Unit"
                                    onSelectItem={(item) =>
                                        onSelectedUnit(item, "from")
                                    }
                                />
                            </View>
                            {selectedFrom &&
                                selectedTo &&
                                !fromDropdownExpanded && (
                                    <View
                                        className={` ${
                                            colorScheme == "dark"
                                                ? "bg-[#272934]"
                                                : "bg-[#fff]"
                                        } my-5 rounded-lg px-5 py-4 shadow-md`}
                                    >
                                        <TextInput
                                            placeholder="From"
                                            keyboardType="numeric"
                                            value={fromValue}
                                            onChangeText={(text) => {
                                                setFromValue(text);
                                                const converted = convertUnit(
                                                    text,
                                                    selectedFrom!,
                                                    selectedTo!
                                                );
                                                setToValue(
                                                    converted.toString()
                                                );
                                            }}
                                            style={globalStyles.font}
                                            className={`${
                                                colorScheme === "dark"
                                                    ? "text-[#fff]"
                                                    : "text-[#000000]"
                                            } text-sm`}
                                            placeholderTextColor={"#9CA3AF"}
                                            autoFocus
                                        />
                                    </View>
                                )}
                        </View>
                        {selectedFrom && !fromDropdownExpanded && (
                            <View>
                                <View className="mx-[40px] flex flex-row items-center justify-center">
                                    <Text
                                        className={`mr-[45px] text-lg ${
                                            colorScheme == "dark"
                                                ? "text-gray-200"
                                                : "text-gray-900"
                                        }`}
                                        style={globalStyles.font}
                                    >
                                        To :
                                    </Text>
                                    <Dropdown
                                        items={getData(selectedMeasure!)}
                                        dropdownExpanded={toDropdownExpanded}
                                        setDropdownExpanded={
                                            setToDropdownExpanded
                                        }
                                        selectedValue={selectedTo!}
                                        setSelectedValue={setSelectedTo}
                                        placeholderName="Unit"
                                        onSelectItem={(item) => {
                                            onSelectedUnit(item, "to");
                                        }}
                                    />
                                </View>
                                {selectedTo && !toDropdownExpanded && (
                                    <View
                                        className={` ${
                                            colorScheme == "dark"
                                                ? "bg-[#272934]"
                                                : "bg-[#fff]"
                                        } my-5 rounded-lg px-5 py-4 shadow-md`}
                                    >
                                        <Text
                                            style={globalStyles.font}
                                            className={`${
                                                colorScheme === "dark"
                                                    ? "text-[#fff]"
                                                    : "text-[#000000]"
                                            } text-sm`}
                                        >
                                            {toValue || "To"}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default UnitConvertorScreen;
