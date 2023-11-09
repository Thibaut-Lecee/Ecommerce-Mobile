import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {COLORS, SIZES} from "../../assets/constants";
import {useNavigation} from "@react-navigation/native";

const SearchHeader = ({items}) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Ionicons name={'camera-outline'} size={SIZES.xLarge} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput style={styles.searchInput} placeholder={'Rechercher un produit'}
                               editable={false}
                               onPressIn={() => navigation.navigate('Search', {
                                   items: items
                               })}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Feather name="search" size={24} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        marginHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50,
    }, searchWrapper: {
        flex: 1, backgroundColor: COLORS.secondary, marginRight: SIZES.small, borderRadius: SIZES.small,
    }, searchInput: {
        fontFamily: "regular", width: "100%", height: "100%", paddingHorizontal: SIZES.small,
    }, searchIcon: {
        marginHorizontal: 10, color: COLORS.gray,
    }, searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
});
export default SearchHeader;
