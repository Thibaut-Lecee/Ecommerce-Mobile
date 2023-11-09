import {Text, View, StyleSheet,} from "react-native";
import {COLORS, SIZES} from "../../assets/constants";
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from "react";

import {getAllProducts} from "../../axiosRequest/axiosGet";
import Search from "../../Views/Search";
import Carousel from "react-native-reanimated-carousel";
import CarouselHome from "./CarouselHome";
import Headings from "./Headings";
import ProductCard from "../Products/ProductCard";
import SearchHeader from "../Search/SearchHeader";

const HomeBody = () => {
    const [products, setProducts] = useState([]);
    const handleProducts = async () => {
        const response = await getAllProducts();
        setProducts(response);
    }
    useEffect(() => {
        handleProducts();
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
                    Trouvez vos produits
                </Text>
                <Text style={styles.welcomeTxt(COLORS.primary, 0)}>
                    en un clic
                </Text>
            </View>
            <SearchHeader items={products}/>
            <CarouselHome items={products}/>
            <Headings title={'Nos produits'}/>
            <ProductCard products={products}/>
        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            width: "100%",
        },
        welcomeTxt: (color, top) => ({
            fontFamily: 'bold',
            color: color,
            fontSize: SIZES.xxLarge - 6,
            marginTop: top,
            marginHorizontal: 12,
        })
    }
)
export default HomeBody

