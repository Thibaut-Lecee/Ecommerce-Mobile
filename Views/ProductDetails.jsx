import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {COLORS, SIZES} from "../assets/constants";
import {Fontisto, Ionicons, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import useStore from "../hooks/zustand";

const ProductDetails = ({navigation, route}) => {
    const [count, setCount] = React.useState(1)
    const addToFav = useStore((state) => state.addToFav);
    const addToCart = useStore((state) => state.addToCart);

    const handleCount = (params) => {
        if (params === "increment") {
            setCount(count + 1)
        } else {
            if (count > 1)
                setCount(count - 1)
        }
    }

    const handleAddToCart = () => {
        const item = {
            id: route.params.images.id,
            thumbnail: route.params.images.thumbnail,
            title: route.params.images.title,
            price: route.params.images.price,
        };
        addToCart(item, count);
    };

    const handleAddToFav = () => {
        if (route.params && route.params.images) {
            const item = {
                id: route.params.images.id,
                thumbnail: route.params.images.thumbnail,
                title: route.params.images.title,
                price: route.params.images.price,
            };
            addToFav(item);
        } else {
            console.error('Les informations sur les images ne sont pas disponibles');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name={"chevron-back-circle"} size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAddToFav
                }>
                    <Ionicons name={"heart"} size={30} color={COLORS.white}/>
                </TouchableOpacity>
            </View>
            <Image source={{uri: route.params.images.thumbnail}}
                   style={styles.image}/>

            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{route.params.images.title}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.price}>{route.params.images.price} €</Text>
                    </View>
                </View>

                <View style={styles.ratingRow}>
                    <View style={styles.rating}>
                        {[...Array(5)].map((_, index) => (
                            <Ionicons
                                key={index}
                                name={"star"}
                                size={20}
                                color={index < route.params.images.rating ? COLORS.primary : COLORS.gray}
                            />
                        ))
                        }
                        <Text style={styles.ratingText}>  {route.params.images.rating}</Text>
                    </View>


                </View>
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>Description</Text>
                    <Text style={styles.descriptionText}>{route.params.images.description}</Text>
                </View>
                <View style={{marginBottom: SIZES.small}}>
                    <View style={styles.location}>
                        <View style={{flexDirection: "row"}}>
                            <Ionicons name={"location-outline"} size={20}/>
                            <Text> Paris </Text>
                        </View>

                        <View style={{flexDirection: "row"}}>
                            <MaterialCommunityIcons name={"truck-delivery-outline"} size={20}/>
                            <Text> Livraison offerte </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cartRow}>

                    <TouchableOpacity onPress={() => handleCount('increment')}>
                        <SimpleLineIcons name={'plus'} size={20}/>
                    </TouchableOpacity>
                    <Text style={styles.ratingText}>  {count} </Text>
                    <TouchableOpacity onPress={() => handleCount('decrement')}>
                        <SimpleLineIcons name={'minus'} size={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addCart} onPress={handleAddToCart}>
                        <Fontisto name={'shopping-bag'} size={22} color={COLORS.white}/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: SIZES.xxLarge,
        width: SIZES.width - 44,
        zIndex: 999,
    },
    image: {
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    details: {
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
    },
    titleRow: {
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 44,
        top: 20,
    },
    title: {
        fontFamily: 'bold',
        fontSize: SIZES.large,
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: 'semiBold',
        fontSize: SIZES.medium,
    },
    priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large,
    },
    ratingRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 10,
        top: 5,
    },
    rating: {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: SIZES.large,

    },
    ratingText: {
        color: COLORS.gray,
        fontFamily: 'medium',
        paddingHorizontal: SIZES.xSmall,
    },
    descriptionWrapper: {
        marginTop: SIZES.large * 2,
        marginHorizontal: SIZES.large,
    },
    descriptionText: {
        fontFamily: 'regular',
        fontSize: SIZES.small,
        textAlign: "justify",
        marginBottom: SIZES.small,
    },
    description: {
        fontFamily: 'medium',
        fontSize: SIZES.large - 2,
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        padding: 5,
        borderRadius: SIZES.large,
    },
    cartRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: SIZES.width,
    },
    cartBtn: {
        width: SIZES.width * 0.7,
        backgroundColor: COLORS.black,
        padding: SIZES.small / 2,
        borderRadius: SIZES.large,
        marginLeft: 12,
    },
    cartTitle: {
        marginLeft: SIZES.small,
        fontFamily: 'bold',
        fontSize: SIZES.small,
        color: COLORS.white,
    },
    addCart: {
        width: 37,
        height: 37,
        backgroundColor: COLORS.black,
        borderRadius: 50,
        margin: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ProductDetails;