import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from "react-native-reanimated-carousel";
const Carousel = () => {
    const width = Dimensions.get('window').width;
    return (
        <View style={styles.carouselContainer}>
<Carousel data={} renderItem={}
        </View>
    )
}


const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})
export default Carousel;