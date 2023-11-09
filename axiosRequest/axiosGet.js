import axios from "./axiosConfig";
import Toast from "react-native-root-toast";


export const getAllProducts = async () => {
    try {
        const response = await axios.get("/products")
        return response.data.products
    } catch (error) {
        console.error(error)
        Toast.show("Error", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
    }
}