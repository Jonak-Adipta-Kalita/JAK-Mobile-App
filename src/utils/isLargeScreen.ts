import { useWindowDimensions } from "react-native";

const isLargeScreen = () => {
    const dimensions = useWindowDimensions();

    if (dimensions.width >= 768) {
        return true;
    } else {
        return false;
    }
};

export default isLargeScreen;
