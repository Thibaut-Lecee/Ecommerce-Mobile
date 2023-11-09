import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import BottomTabNavigation from './components/Navigation/BottomTabNavigation';
import {RootSiblingParent} from 'react-native-root-siblings';
import ProductDetails from './Views/ProductDetails';
import useStore from './hooks/zustand';
import Home from "./Views/Home";
import LottieView from "lottie-react-native";
import {SafeAreaView, View, StyleSheet} from "react-native";
import Search from "./Views/Search";

const Stack = createStackNavigator();

const App = () => {
    const initCart = useStore((state) => state.initCart);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [fontsLoaded] = useFonts({
        regular: require('./assets/fonts/Poppins-Regular.ttf'),
        bold: require('./assets/fonts/Poppins-Bold.ttf'),
        light: require('./assets/fonts/Poppins-Light.ttf'),
        medium: require('./assets/fonts/Poppins-Medium.ttf'),
        semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
        extraBold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    });

    const prepare = async () => {
        try {
            await initCart();
        } catch (e) {
            console.warn('An error occurred while preparing the app:', e);
        }
    };

    useEffect(() => {
        prepare();
        if (fontsLoaded && animationFinished) {
            SplashScreen.hideAsync().catch(e => console.warn('An error occurred while hiding the splash screen:', e));
        }
    }, [fontsLoaded, animationFinished]);


    if (!fontsLoaded || !animationFinished) {
        return (
            <View style={styles.container}>
                <LottieView
                    source={require('./assets/splashScreen.json')}
                    autoPlay
                    loop={false}
                    speed={1}
                    style={styles.lottie}
                    onAnimationFinish={() => {
                        setAnimationFinished(true);
                    }}
                />
            </View>

        );
    }

    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Bottom Navigation'
                        component={BottomTabNavigation}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
                    <Stack.Screen name={'ProductDetails'} component={ProductDetails} options={{headerShown: false}}/>
                    <Stack.Screen name={'Search'} component={Search} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        position: 'absolute',
        top: 100,
        right: 0,
        left: 25,
        width: 300, // Adjust based on the size of the Lottie animation
        height: 300, // Adjust based on the size of the Lottie animation
    },
});


export default App;
