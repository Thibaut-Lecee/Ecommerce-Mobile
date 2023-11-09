import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS, SIZES} from "../../assets/constants";


const Headings = ({title}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {title}
                </Text>
                <TouchableOpacity>
                    <Ionicons name={'ios-grid'} size={24} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        marginHorizontal: 12
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.primary
    }
})

export default Headings;