import React, {useEffect} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const CarouselHome = ({items, navigation}) => {
    const width = Dimensions.get('window').width;
    return (
        <View style={styles.carouselContainer}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={items}
                scrollAnimationDuration={1000}
                renderItem={({index}) => (
                    <View style={styles.slide}>
                        <Image
                            source={{uri: items[index].thumbnail}}
                            style={styles.thumbnail}

                        />
                    </View>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: "center"
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: 'green',
    },
    rating: {
        fontSize: 14,
        color: 'orange',
    },
});

export default CarouselHome;