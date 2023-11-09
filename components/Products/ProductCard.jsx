import {FlatList, StyleSheet, Text, View} from "react-native";
import {SIZES} from "../../assets/constants";
import ProductCardView from "./ProductCardView";


const ProductCard = ({products}) => {
    return (
        <View style={styles.container}>
            <FlatList data={products}
                      renderItem={({item}) => (<ProductCardView images={item}/>)}
                      horizontal={true}
                      contentContainerStyle={{columnGap: SIZES.medium}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        marginLeft: 12
    }
});
export default ProductCard