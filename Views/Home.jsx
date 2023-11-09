import React from 'react';
import {FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../assets/constants";
import {Fontisto, Ionicons} from "@expo/vector-icons";
import HomeBody from "../components/Home/HomeBody";
import useStore from "../hooks/zustand";
import ProductCardView from "../components/Products/ProductCardView"; // Import your store

const Home = () => {
    const cartItems = useStore(state => state.cartItems)
    const favItems = useStore(state => state.favItems);
    const [modalVisible, setModalVisible] = React.useState({
        cart: false, fav: false
    });
    const totalQuantity = Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = Object.values(cartItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
    const clearPanier = useStore((state) => state.clearCart);
    const clearFav = useStore((state) => state.clearFav);
    const totalFav = favItems ? Object.values(favItems).length : 0;
    const handleClear = (params) => {
        if (params === "fav") {
            clearFav()
            setModalVisible(() => ({
                fav: false
            }));
        } else {
            clearPanier();
            setModalVisible(() => ({
                cart: false
            }));
        }
    }

    return (<SafeAreaView style={{flex: 1}}>
        <View style={styles.appBarWrapper}>
            <View style={styles.appBar}>
                <Ionicons name={"location-outline"} size={24}/>
                <Text style={styles.location}>Rouen</Text>
                <TouchableOpacity onPress={() => setModalVisible((prevState) => ({
                    ...prevState, cart: true
                }))}>
                    <View style={styles.cardCount}>
                        <Text style={styles.cardCountText}>{totalQuantity}</Text>
                    </View>
                    <Fontisto name={'shopping-bag'} size={24}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible((prevState) => ({
                    ...prevState, fav: true
                }))}>
                    <View style={styles.cardCount}>
                        <Text style={styles.cardCountText}>{totalFav}</Text>
                    </View>
                    <Ionicons name={"heart"} size={30} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            <HomeBody/>
        </ScrollView>

        {/* Modal to show cart items */}
        {modalVisible.cart && (<Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.cart}
            onRequestClose={() => setModalVisible(!modalVisible.cart)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FlatList
                        data={Object.values(cartItems)}
                        renderItem={({item}) => <ProductCardView images={item}
                                                                 setModalVisible={setModalVisible}/>}
                        keyExtractor={item => item.id.toString()}
                        extraData={totalQuantity}
                    />
                    <View>
                        <Text>
                            Total : {totalPrice} €
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(() => ({
                                cart: false
                            }))}
                        >
                            <Text> Fermer </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleClear()}>
                            <Text> Vider le panier </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>)}

        {/* Modal to show fav items */}
        {modalVisible.fav && (<Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.fav}
            onRequestClose={() => setModalVisible(!modalVisible.fav)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FlatList
                        data={Object.values(favItems)}
                        renderItem={({item}) => <ProductCardView images={item}/>}
                        keyExtractor={item => item.id.toString()}
                        extraData={totalFav}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(() => ({
                                fav: false
                            }))}
                        >
                            <Text> Fermer </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleClear("fav")}>
                            <Text> Vider les favoris </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>)}
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'bold', fontSize: 30,
    }, appBarWrapper: {
        marginHorizontal: 20, marginTop: SIZES.small,
    }, appBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SIZES.small,
    }, location: {
        fontFamily: "semiBold", fontSize: SIZES.medium, color: COLORS.gray
    }, cardCount: {
        position: 'absolute',
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        zIndex: 2000,
    }, cardCountText: {
        color: COLORS.lightWhite, fontFamily: 'regular', fontWeight: '600', fontSize: 10
    }, centeredView: {
        flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22
    }, modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }, button: {
        borderRadius: 20, padding: 10, elevation: 2
    },
});

export default Home;