import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Work from '../screens/Work';
import WorkLogs from '../screens/Work/WorkLogs';


const Stack = createStackNavigator();

const WorkNav = () => {
    return (
        <Stack.Navigator initialRouteName='Work'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Work" component={Work}/>
            <Stack.Screen name="WorkLogs" component={WorkLogs}/>
        </Stack.Navigator>
    )
}

export default WorkNav

const styles = StyleSheet.create({})