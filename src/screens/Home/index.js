import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import Header from '../../Components/Header'
import { BlurView } from "@react-native-community/blur";
import TotalCard from './TotalCard';
import CommonTexts from '../../Components/CommonTexts';
import UserImageName from './UserImageName';
import CommonOrderCard from '../Orders/CommonOrderCard';
import dark from '../../Images/dark.png'
import light from '../../Images/light.png'
import { useQuery } from '@tanstack/react-query';
import { homeDetails } from '../../Api/homeapi';
import { useFocusNotifyOnChangeProps } from '../../hooks/useFocusNotifyOnChangeProps';
import reactotron from 'reactotron-react-native';


const Home = ({ navigation, }) => {
    const{height,width} = useWindowDimensions()

    const notifyOnChangeProps = useFocusNotifyOnChangeProps();


    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['homeData'],
        queryFn: homeDetails,
        notifyOnChangeProps
    })

    reactotron.log(data, "TESTITEM!")

    //useRefreshOnFocus(refetch)


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

    return (
        <>
            <Header onPress={openDrawer} />
            <View style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView 
                style={{ backgroundColor: '#fff', paddingHorizontal: 15, marginBottom:80}} 
                showsVerticalScrollIndicator={false}
            >
                <UserImageName/>
                <TotalCard label={'Orders Today'} count={251} bg='#58D36E' bgImg={light}/>
                <TotalCard label={'Amount Earned'} count={'₹ 5250'} bg='#58D39D' bgImg={dark}/>
                <View style={styles.newOrders}>
                    <CommonTexts label={'New Orders'} fontSize={18} />
                    <TouchableOpacity onPress={ViewAllOrders}>
                        <Text style={styles.viewAllText}>{"View All >>"}</Text>
                    </TouchableOpacity>
                </View>
                {data?.orders?.map((item)=>(
                    <CommonOrderCard key={item?.id} item={item}/>
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