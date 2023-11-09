import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {COLORS, SIZES} from "../../assets/constants";
import {Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import useStore from "../../hooks/zustand";

const ProductCardView = ({images, setModalVisible}) => {
    const navigation = useNavigation();
    const removeFromCart = useStore((state) => state.removeFromCart);
    const addToCart = useStore((state) => state.addToCart);
    const addToFav = useStore((state) => state.addToFav);
    const handleAddToFav = () => {
        const item = {
            id: images.id,
            thumbnail: images.thumbnail,
            title: images.title,
            price: images.price,
        };
        addToFav(item);
    }
    const handleAddToCart = () => {
        const item = {
            id: images.id,
            thumbnail: images.thumbnail,
            title: images.title,
            price: images.price,
        };
        addToCart(item, 1);
    };

    const handleNavigation = () => {
        navigation.navigate("ProductDetails", {
            images: images
        })
        if (setModalVisible !== undefined)
            setModalVisible((prevState) => ({
                ...prevState,
                cart: false
            }))

    }

    const handleRemoveFromCart = () => {
        removeFromCart(images.id);
    }
    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: images.thumbnail}} style={styles.image}/>
                </View>
                <View>
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddToFav}>
                        <Ionicons name="heart" size={24} color={COLORS.white}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{images.title}</Text>
                    <Text style={styles.price}>{images.price} € / unité</Text>
                    <Text style={styles.price}>{images.quantity}</Text>
                    {images.quantity !== undefined && (
                        <Text style={styles.price}> Cout total : {images.quantity * images.price} €</Text>)}
                </View>
                <View style={styles.details}>
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                        <Ionicons name="add-circle" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>
                    {images.quantity !== undefined && (
                        <TouchableOpacity style={styles.removeBtn} onPress={handleRemoveFromCart}>
                            <SimpleLineIcons name={'minus'} size={20}/>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 182,
        height:
            240,
        marginEnd:
            22,
        borderRadius:
        SIZES.medium,
        backgroundColor:
        COLORS.secondary,
        marginBottom: SIZES.small,
    }
    ,
    imageContainer: {
        flex: 1,
        width:
            170,
        marginLeft:
            SIZES.small / 2,
        marginTop:
            SIZES.small / 2,
        borderRadius:
        SIZES.small,
        overflow:
            "hidden",
    }
    ,
    image: {
        aspectRatio: 1,
        resizeMode:
            "cover",
    }
    ,
    details: {
        padding: SIZES.small,
    }
    ,
    title: {
        fontFamily: "bold",
        fontSize:
        SIZES.small,
        color:
        COLORS.black,
    }
    ,
    price: {
        fontFamily: "regular",
        fontSize:
        SIZES.small,
        color:
        COLORS.black,
    },
    addBtn: {
        position: "absolute",
        right: SIZES.xSmall,
        bottom: SIZES.xSmall,
    },
    removeBtn: {
        position: "absolute",
        left: SIZES.xSmall,
        bottom: SIZES.xSmall,
    }

});
export default ProductCardView;