import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CommonOrderCard from './CommonOrderCard'
import SelectTab from '../../Components/SelectTab'
import customAxios from '../../CustomeAxios'
import reactotron from 'reactotron-react-native'
import NewOrders from './NewOrders'
import ActiveOrders from './ActiveOrders'
import CompletedOrders from './CompletedOrders'

const Orders = ({ navigation, route }) => {

    const [currentTab, setCurrentTab] = useState(0)

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    const selectNew = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectActive = useCallback(() => {
        setCurrentTab(1)
    }, [])

    const selectCompleted = useCallback(() => {
        setCurrentTab(2)
    }, [])



    return (
        <>
            <HeaderWithTitle title={'Orders'} drawerOpen={openDrawer} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F3F3F3', marginTop: 10, marginHorizontal: 10 }}>
                <SelectTab
                    label={"New"}
                    onPress={selectNew}
                    selected={currentTab === 0 ? true : false}
                />
                <SelectTab
                    label={"Active"}
                    onPress={selectActive}
                    selected={currentTab === 1 ? true : false}
                />
                <SelectTab
                    label={"Completed"}
                    onPress={selectCompleted}
                    selected={currentTab === 2 ? true : false}
                />
            </View>
            <View style={{ backgroundColor: '#707070', marginBottom: 10, height: 1, marginHorizontal: 10, opacity: 0.4, top: -1 }} />
            {currentTab === 0 && <NewOrders />}
            {currentTab === 1 && <ActiveOrders />}
            {currentTab === 2 && <CompletedOrders />}
        </>
    )
}

export default Orders

const styles = StyleSheet.create({})