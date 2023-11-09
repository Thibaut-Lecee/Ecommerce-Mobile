import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from "react-native";
import {COLORS, SIZES} from "../../assets/constants";
import {Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';
import {useState} from "react";
import axios from "axios";

const HomeBody = () => {
    const navigation = useNavigation();

    const [search, setSearch] = useState("");
    const [images, setImages] = useState("");
    const handleDownloadImages = async (params) => {
        try {
            const response = await axios.get(`https://loremflickr.com/320/240/${params}`)
            setImages(response.config.url);
        } catch (error) {
            console.error(error)
        }
    }


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

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name={'search'} size={24} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput style={styles.searchInput} placeholder={'Rechercher un produit'}
                               value={search} onChangeText={(e) => setSearch(e)}/>
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn} onPressIn={() => handleDownloadImages(search)}>
                        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>
            {images && <Image source={{uri: images}} style={{width: 320, height: 240}}/>}
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
        }),
        searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.secondary,
            marginHorizontal: SIZES.small,
            borderRadius: SIZES.medium,
            marginVertical: SIZES.medium,
            height: 50,
        },
        searchWrapper: {
            flex: 1,
            backgroundColor: COLORS.secondary,
            marginRight: SIZES.small,
            borderRadius: SIZES.small,
        },
        searchInput: {
            fontFamily: "regular",
            width: "100%",
            height: "100%",
            paddingHorizontal: SIZES.small,
        },
        searchIcon: {
            marginHorizontal: 10,
            color: COLORS.gray,
            marginTop: SIZES.small,
        },
        searchBtn: {
            width: 50,
            height: "100%",
            borderRadius: SIZES.medium,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.primary,
        }

    }
)
export default HomeBody

