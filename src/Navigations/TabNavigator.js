import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeNav from './HomeNav'
import WorkNav from './WorkNav'
import Orders from '../screens/Orders'
import Payout from '../screens/Payout'

const Tab = createBottomTabNavigator()

const TabNavigator = ({navigation}) => {

    const onPressHome = useCallback(() => {
        navigation.navigate('HomeNav', {screen:'Home'})
    }, [])

    const onPressOrders = useCallback(() => {
        navigation.navigate('Orders')
    }, [])

    const onPressPayout = useCallback(() => {
        navigation.navigate('Payout')
    }, [])

    const onPressWork = useCallback(() => {
        navigation.navigate('WorkNav', {screen:'Work'})
    }, [])



    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'e91e63', 
                tabBarStyle: { height: 60, position: 'absolute', bottom: 20, borderRadius: 20, marginHorizontal: 25, elevation:1,  shadowOpacity: 0.1,  },
                tabBarItemStyle: { justifyContent: 'center', height: 60, },
                tabBarIcon: ({ focused, color }) => {
                    color = focused ? '#58D36E' : '#AAD1A2'
                    if (route.name === 'HomeNav') {
                        return (
                            <TouchableOpacity 
                                onPress={onPressHome}
                                style={{ width:'100%',alignItems:'center', borderRightWidth:1, borderColor:'#00000014'}}>
                                <FontAwesome5 name={'home'} size={focused ? 27 : 26} color={color} />
                            </TouchableOpacity>
                        )
                    } 
                    else if (route.name === 'Orders') {
                        return (
                            <TouchableOpacity
                                onPress={onPressOrders}
                                style={{ width:'100%',alignItems:'center', borderRightWidth:1, borderColor:'#00000014'}}
                            >
                                <FontAwesome5 name={'shopping-bag'} size={focused ? 26 : 25} color={color} />
                            </TouchableOpacity>
                        )
                    } 
                    else if (route.name === 'Payout') {
                        return (
                            <TouchableOpacity 
                                onPress={onPressPayout}
                                style={{ width:'100%',alignItems:'center', borderRightWidth:1, borderColor:'#00000014'}}
                            >
                                <MaterialCommunityIcons name={'cash'} size={focused ? 35 : 34} color={color} />
                            </TouchableOpacity>
                        )
                    } 
                    else if (route.name === 'WorkNav') {
                        return <TouchableOpacity onPress={onPressWork}>
                            <Image source={ focused ? require('../Images/select.jpeg') : require('../Images/notSelect.jpeg')  } resizeMode='contain' style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    } 
                },
            })}
        >
            <Tab.Screen name="HomeNav" component={HomeNav} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Payout" component={Payout} />
            <Tab.Screen name="WorkNav" component={WorkNav} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})