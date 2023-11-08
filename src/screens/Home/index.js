import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Header from '../../Components/Header'
import { BlurView } from "@react-native-community/blur";
import TotalCard from './TotalCard';
import CommonTexts from '../../Components/CommonTexts';
import UserImageName from './UserImageName';
import CommonOrderCard from '../Orders/CommonOrderCard';
import dark from '../../Images/dark.png'
import light from '../../Images/light.png'
import { useQuery, useMutation } from '@tanstack/react-query';
import { homeDetails } from '../../Api/homeapi';
import { useFocusNotifyOnChangeProps } from '../../hooks/useFocusNotifyOnChangeProps';
import reactotron from 'reactotron-react-native';
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';
import { updateOrderStatus } from '../../Api/orders';
import Toast from 'react-native-toast-message';
import AuthContext from '../../contexts/Auth';
import { IMG_URL } from '../../config/constants';


const Home = ({ navigation, }) => {
    const{height,width} = useWindowDimensions()
    const { userData } = useContext(AuthContext)

    reactotron.log(userData, "USER")

    const notifyOnChangeProps = useFocusNotifyOnChangeProps();


    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['homeData'],
        queryFn: homeDetails,
        notifyOnChangeProps
    })

    reactotron.log(data, "TESTITEM!")

    useRefreshOnFocus(refetch)

    const mutation = useMutation({
        mutationFn: updateOrderStatus,
    })

    useRefreshOnFocus(refetch)


    useEffect(() => {
        if(mutation.isSuccess){
            Toast.show({
                type: 'success',
                text1: 'Order Accepted successfully'
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


    // const orders = [
    //     {
    //         id:'1',
    //         customerName: 'Raj',
    //         addr: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
    //         name:'#10765',
    //         hotel : [
    //             {
    //                 id:'1',
    //                 name:'Aalife Restaurant',
    //                 location: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
    //                 food : [
    //                     {
    //                         id:'1',
    //                         name:'Chicken Biriyani',
    //                         qty: '2',
    //                         price: '520'
    //                     },
    //                     {
    //                         id:'2',
    //                         name:'Mutton Biriyani',
    //                         qty: '3',
    //                         price: '800'
    //                     },
    //                 ],

    //             },
    //             {
    //                 id:'2',
    //                 name:'Aariyas Vegetarian Restaurant',
    //                 location: 'Kottiyam, Kollam, Kerala 691003',
    //                 food : [
    //                     {
    //                         id:'1',
    //                         name:'Meals',
    //                         qty: '1',
    //                         price: '120'
    //                     },
    //                     {
    //                         id:'2',
    //                         name:'Fried Rice',
    //                         qty: '2',
    //                         price: '500'
    //                     },
    //                 ],
    //             },
                
    //         ],
    //         status: 'new'
    //     },
    //     {
    //         id:'2',
    //         name:'#87452',
    //         hotel : [
    //             {
    //                 id:'1',
    //                 name:'Zam Zam Restaurant',
    //                 location: 'Palaym, TVM , 695101',
    //                 food : [
    //                     {
    //                         id:'1',
    //                         name:'Chicken Biriyani',
    //                         qty: '1',
    //                         price: '130'
    //                     },
                     
    //                 ],
    //             },
    //             {
    //                 id:'2',
    //                 name:'MRA',
    //                 location: 'Palaym, TVM , 695101',
    //                 food : [
    //                     {
    //                         id:'2',
    //                         name:'Fried Rice',
    //                         qty: '3',
    //                         price: '600'
    //                     },
    //                 ],
    //             },
    //         ],
    //         status: 'new'
    //     },
    // ]

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    const ViewAllOrders = useCallback(() => {
        navigation.navigate('Orders')
    }, [])

    const updateOrder = (item) => {
        mutation.mutate({ order_id: item?._id, status: "active" })
    }

    return (
        <>
            <Header onPress={openDrawer} />
            <View style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView 
                style={{ backgroundColor: '#fff', paddingHorizontal: 15, marginBottom:80}} 
                showsVerticalScrollIndicator={false}
            >
                <UserImageName name={userData?.name} src={userData?.image ? ({ uri: IMG_URL + userData?.image }) : (require('../../Images/drawerLogo.png'))}/>
                <TotalCard label={'Orders Today'} count={data?.total_order_count} bg='#58D36E' bgImg={light}/>
                <TotalCard label={'Amount Earned'} count={data?.total_order_payment} bg='#58D39D' bgImg={dark}/>
                <View style={styles.newOrders}>
                    <CommonTexts label={'New Orders'} fontSize={18} />
                    <TouchableOpacity onPress={ViewAllOrders}>
                        <Text style={styles.viewAllText}>{"View All >>"}</Text>
                    </TouchableOpacity>
                </View>
                {data?.orders?.map((item)=>(
                    <CommonOrderCard key={item?.id} item={item} currentTab={0} onAccept={updateOrder}/>
                ))}
            </ScrollView>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    textBold: {
        fontFamily: 'Poppins-Bold',
        color: '#FF4646',
        fontSize: 18,
    },
    textRegular: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 18,
    },
    viewAllText: {
        fontFamily: 'Poppins-Medium',
        color: '#118826',
        fontSize: 11,
    },

    newOrders: { 
        flexDirection: 'row', 
        marginTop: 10, 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom:10
    }
})