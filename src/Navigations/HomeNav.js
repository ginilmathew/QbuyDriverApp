import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Settings from '../screens/Drawer/Settings';
import Profile from '../screens/Drawer/Settings/Profile';
import Attendance from '../screens/Drawer/Attendance';
import Reservation from '../screens/Drawer/Reservation';
import RateCard from '../screens/Drawer/Settings/RateCard';
import ReferFriend from '../screens/Drawer/Settings/ReferFriend';

const Stack = createStackNavigator();

const HomeNav = () => {
    return (
        <Stack.Navigator initialRouteName='Home'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Attendance" component={Attendance}/>
            <Stack.Screen name="Reservation" component={Reservation}/>
            <Stack.Screen name="Settings" component={Settings}/>
            
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="RateCard" component={RateCard}/>
            <Stack.Screen name="ReferFriend" component={ReferFriend}/>





           
        </Stack.Navigator>
    )
}

export default HomeNav

const styles = StyleSheet.create({})