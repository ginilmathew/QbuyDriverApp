import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CommonOrderCard from './CommonOrderCard'
import SelectTab from '../../Components/SelectTab'
import { useToast } from 'native-base'
import customAxios from '../../CustomeAxios'
import reactotron from 'reactotron-react-native'

const Orders = ({ navigation, route }) => {

    const toast = useToast()

    const mode = route?.params?.mode

    const [currentTab, setCurrentTab] = useState(0)
    const [loading, setLoading] = useState(false)
    const [newOrder, setNewOrder] = useState('')
    const [activeOrder, setActiveOrder] = useState('')

    reactotron.log(activeOrder, "ACTIVE")

    // useEffect(() => {
    //     if(mode === 'maps'){
    //         setCurrentTab(1)
    //     }
    //     if(mode === 'active'){
    //         setCurrentTab(2)
    //     }
    // }, [mode])

    // console.log({mode, currentTab})

    // useEffect(() => {
    //     if (currentTab === 0) {
    //         getNewOrders()
    //     } else if (currentTab === 1) {
    //         getActiveOrders()
    //     }
    // }, [])

    useEffect(() => { 
        getNewOrders();
        getActiveOrders();
    }, [])

    const getNewOrders = async () => {
        setLoading(true);
        try {
            const newData = await customAxios.get(`rider/orders/new`)
            if (newData?.data?.message === "success") {
                reactotron.log(newData, "NEWORDER")
                setNewOrder(newData?.data?.data)
            } else {
                throw "Internal server error"
            }

        } catch (error) {
            if (error) {
                toast.show({
                    title: error,
                    backgroundColor: "error.400",
                    duration: 1500
                })
            }
            else {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
        } finally {
            setLoading(false);
        }
    }

    const getActiveOrders = async () => {
        setLoading(true);
        try {
            const activeData = await customAxios.get(`rider/orders/active`)
            if (activeData?.data?.message === "success") {
                reactotron.log(activeData, "ActiveORDER")
                setActiveOrder(activeData?.data?.data)
            } else {
                throw "Internal server error"
            }

        } catch (error) {
            if (error) {
                toast.show({
                    title: error,
                    backgroundColor: "error.400",
                    duration: 1500
                })
            }
            else {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
        } finally {
            setLoading(false);
        }
    }


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

    const refreshState = () => {
        if (currentTab === 0) {
            getNewOrders()
        } else if (currentTab === 1) {
            getActiveOrders()
        } else if (currentTab === 2) {
            getCompletedOrders()
        }
    }

    return (
        <>
            <HeaderWithTitle title={'Orders'} drawerOpen={openDrawer} />
            <ScrollView
                style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15 }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshState} />}
            >
                <View style={{ marginTop: 15, flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
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
                <View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5, marginBottom: 10 }} />
                {currentTab === 0 && newOrder?.orders?.map((item) => (
                    <CommonOrderCard key={item?.id} item={item} currentTab={currentTab}/>
                ))}
                {currentTab === 1 && activeOrder?.orders?.map((item) => (
                    <CommonOrderCard key={item?.id} item={item} currentTab={currentTab}/>
                ))}
                {currentTab === 2 && completedOrders?.map((item) => (
                    <CommonOrderCard key={item?.id} item={item} />
                ))}
            </ScrollView>
        </>
    )
}

export default Orders

const styles = StyleSheet.create({})