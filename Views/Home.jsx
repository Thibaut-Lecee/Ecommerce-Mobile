import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { StyleSheet } from 'react-native';
import {COLORS, SIZES} from "../assets/constants";
import {Fontisto, Ionicons} from "@expo/vector-icons";
import HomeBody from "../components/Home/HomeBody";

const Home = () => {

    return (
        <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <View style={styles.appBar}>
                    <Ionicons name={"location-outline"} size={24}/>
                    <Text style={styles.location}>Rouen</Text>
                <View style={{alignItems: 'flex-end'}}>
                    <View style={styles.cardCount}>
                        <Text style={{color: COLORS.lightWhite, fontFamily: 'regular', fontWeight: '600', fontSize: 10}}>3</Text>
                    </View>
                    <TouchableOpacity>
                        <Fontisto name={'shopping-bag'} size={24}/>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            <ScrollView>
    <HomeBody />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'bold',
        fontSize: 30,
    },
    appBarWrapper: {
        marginHorizontal: 20,
        marginTop: SIZES.small,
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZES.small,
    },
    location: {
        fontFamily: "semiBold",
        fontSize: SIZES.medium,
        color: COLORS.gray
    },
    cardCount: {
        position: 'absolute',
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        zIndex: 2000,
    }
    });

export default Home;