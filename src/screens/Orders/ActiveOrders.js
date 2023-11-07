import { FlatList, Text, View } from 'react-native'
import React, { memo, useCallback, useState, useEffect } from 'react'
import CommonOrderCard from './CommonOrderCard'
import customAxios from '../../CustomeAxios'
import Toast from 'react-native-toast-message'
import reactotron from 'reactotron-react-native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { activeOrders, updateOrderStatus } from '../../Api/orders'
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus'
import { useFocusNotifyOnChangeProps } from '../../hooks/useFocusNotifyOnChangeProps'

const ActiveOrders = () => {



    const notifyOnChangeProps = useFocusNotifyOnChangeProps();


    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['activeorders'],
        queryFn: activeOrders,
        notifyOnChangeProps
    })

    const mutation = useMutation({
        mutationFn: updateOrderStatus,
    })

    useRefreshOnFocus(refetch)


    useEffect(() => {
        if(mutation.isSuccess){
            Toast.show({
                type: 'success',
                text1: 'Order updated successfully'
            })
            refetch()
        }

        if(mutation?.isError){
            Toast.show({
                type: 'error',
                text1: mutation?.error
            })
        }

        if(error){
            Toast.show({
                type: 'error',
                text1: error
            })
        }

    }, [mutation.isSuccess, mutation?.isError, isError])
    


    const updateOrder = (mode, item, id = null) => {
        console.log({item, id})
        if(mode === "pickup"){
            mutation.mutate({ order_id: item?._id, status: "pickedup", storeId: id })
        }
        else if(mode === "onlocation"){
            mutation.mutate({ order_id: item?._id, status: "onLocation" })
        }
        else if(mode === "completed"){
            mutation.mutate({ order_id: item?._id, status: "completed" })
        }
        
    }


    const renderCard = ({ item }) => {
        return (
            <CommonOrderCard key={item?.id} item={item} currentTab={1} onAccept={updateOrder} />
        )
    }

    const emptyCpmp = () => {
        return (
            <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>No Orders</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => `${item?._id}`}
            renderItem={renderCard}
            removeClippedSubviews={true}
            style={{ marginBottom: 70, marginHorizontal: 15 }}
            refreshing={isLoading || mutation.isPending}
            onRefresh={refetch}
            ListEmptyComponent={emptyCpmp}

        />
    )
}

export default memo(ActiveOrders) 