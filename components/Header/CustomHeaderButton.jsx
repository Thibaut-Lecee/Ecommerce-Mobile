import useStore from "../../hooks/zustand";
import {TouchableOpacity, Text} from "react-native";
import {Fontisto} from "@expo/vector-icons";

const CustomHeaderButton = () => {
    const cartItems = useStore(state => state.cartItems);
    const totalQuantity = Object.values(cartItems).reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (
        <TouchableOpacity onPress={() => {/* handle press */
        }}>
            <Text>{totalQuantity}</Text>
            <Fontisto name={'shopping-bag'} size={24}/>
        </TouchableOpacity>
    );
};

export default CustomHeaderButton;
