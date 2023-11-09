import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from "../../Views/Profile";
import Search from "../../Views/Search";
import Home from "../../Views/Home";
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
import {COLORS} from "../../assets/constants";

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: 70,

    }
}
const BottomTabNavigation = () => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={Home}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    size={24}
                                    color={"black"}
                                />
                            )
                        }}
            />

        </Tab.Navigator>

    )
}

export default BottomTabNavigation;