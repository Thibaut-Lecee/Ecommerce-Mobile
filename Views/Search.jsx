import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {COLORS, SIZES} from "../assets/constants";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import SearchHeader from "../components/Search/SearchHeader";
import ProductCardView from "../components/Products/ProductCardView";

const Search = ({route}) => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const items = route.params.items || [];
    const categories = ['all', ...new Set(items.map(item => item.category))];
    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const renderCategoryItems = ({item}) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                item === selectedCategory ? styles.categoryItemSelected : {}
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={styles.categoryItemText}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 15}}>
                <Ionicons name={"chevron-back-circle"} size={30}/>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Ionicons name={'camera-outline'} size={SIZES.xLarge} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput style={styles.searchInput} placeholder={'Rechercher un produit'}
                               onChangeText={(text) => setSearch(text)} e
                               value={search}/>
                </View>

            </View>
            <View style={{marginBottom: 10}}>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={renderCategoryItems}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>
            <View>
                <FlatList
                    data={filteredItems}
                    renderItem={({item}) => <ProductCardView images={item}/>}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>)
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
    list: {
        columnGap: SIZES.medium,
        alignItems: "center",
    },
    categoriesList: {
        flexGrow: 0,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    categoryItem: {
        padding: SIZES.small,
        marginHorizontal: SIZES.small,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    categoryItemSelected: {
        backgroundColor: COLORS.tertiary,
    },
    categoryItemText: {
        color: COLORS.black,
    },
});
export default Search;
