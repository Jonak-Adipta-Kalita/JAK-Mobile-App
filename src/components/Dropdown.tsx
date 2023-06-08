import React, { Dispatch, SetStateAction } from "react";
import { useColorScheme } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
    items: { value: string; label: string }[];
    dropdownExpanded: boolean;
    setDropdownExpanded: Dispatch<SetStateAction<boolean>>;
    selectedValue: string;
    setSelectedValue: Dispatch<SetStateAction<any>>;
}

const Dropdown = ({
    items,
    dropdownExpanded,
    setDropdownExpanded,
    selectedValue,
    setSelectedValue,
}: Props) => {
    const colorScheme = useColorScheme();

    return (
        <DropDownPicker
            items={items}
            open={dropdownExpanded}
            setOpen={setDropdownExpanded}
            value={selectedValue}
            setValue={setSelectedValue}
            placeholder="Select a Measure"
            style={{
                backgroundColor: colorScheme === "dark" ? "#272934" : "#fff",
                borderColor: colorScheme === "dark" ? "#272934" : "#fff",
            }}
            dropDownContainerStyle={{
                backgroundColor: colorScheme === "dark" ? "#272934" : "#fff",
            }}
            textStyle={{
                color: colorScheme === "dark" ? "#D3D3D3" : "#6B6B6B",
            }}
            arrowIconContainerStyle={{
                marginTop: 5,
            }}
            ArrowDownIconComponent={({ style }) => (
                <AntDesign
                    style={style}
                    name="down"
                    size={15}
                    color={colorScheme === "dark" ? "#fff" : "#000000"}
                />
            )}
            ArrowUpIconComponent={({ style }) => (
                <AntDesign
                    style={style}
                    name="up"
                    size={15}
                    color={colorScheme === "dark" ? "#fff" : "#000000"}
                />
            )}
            TickIconComponent={({ style }) => (
                <AntDesign
                    style={style}
                    name="check"
                    size={15}
                    color={colorScheme === "dark" ? "#fff" : "#000000"}
                />
            )}
        />
    );
};

export default Dropdown;
