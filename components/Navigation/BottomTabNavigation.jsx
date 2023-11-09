import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import Profile from "../../Views/Profile";
import Search from "../../Views/Search";
import Home from "../../Views/Home";

const Tab = createBottomTabNavigator();
import {COLORS} from "../../assets/constants";
import { Ionicons } from '@expo/vector-icons';
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
            <Tab.Screen name="Search" component={Search}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <Ionicons
                                    name="search-sharp"
                                    size={24}
                                    color={focused ? COLORS.primary : COLORS.gray2}
                                />
                            )
                        }}
            />
            <Tab.Screen name="Profile" component={Profile}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <Ionicons
                                    name={focused ? "person" : "person-outline"}
                                    size={24}
                                    color={focused ? COLORS.primary : COLORS.gray2}
                                />
                            )
                        }}
            />
        </Tab.Navigator>

    )
}

export default BottomTabNavigation;