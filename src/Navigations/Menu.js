import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import TabNavigator from './TabNavigator';
import RouteMap from '../screens/RouteMap';
import Support from '../screens/Drawer/Settings/Support';
import AddCommentScreen from '../screens/Drawer/Settings/Support/AddCommentScreen';

const Drawer = createDrawerNavigator();

const Menu = ({route}) => {
   
    return (

        <>
            <Drawer.Navigator
                swipeEdgeWidth={true}
                screenOptions={{
                    headerShown: false,
                    drawerType: 'front',
                }}
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name="TabNavigator" component={TabNavigator} />
                <Drawer.Screen name="RouteMap" component={RouteMap} />
                <Drawer.Screen name="Support" component={Support} />
                <Drawer.Screen name="AddCommentScreen" component={AddCommentScreen} />

            </Drawer.Navigator>
        </>
    )
}

export default Menu

const styles = StyleSheet.create({})