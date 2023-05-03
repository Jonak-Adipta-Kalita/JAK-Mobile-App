import React from "react";
import { ButtonProps } from "react-native";
import { View } from "react-native";

type Props = {
    title: string;
    description?: string;
    button: ButtonProps;
};

const Card = ({ title }: Props) => {
    return <View></View>;
};

export default Card;
