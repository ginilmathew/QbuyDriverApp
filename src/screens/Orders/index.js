import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CommonOrderCard from './CommonOrderCard'
import SelectTab from '../../Components/SelectTab'

const Orders = ({navigation, route}) => {

    const mode = route?.params?.mode

	const [currentTab, setCurrentTab] = useState(0)

    useEffect(() => {
        if(mode === 'maps'){
            setCurrentTab(1)
        }
        if(mode === 'active'){
            setCurrentTab(2)
        }
    }, [mode])

    // console.log({mode, currentTab})

    const orders = [
        {
            id:'1',
            customerName: 'Raj',
            addr: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
            name:'#10765',
            hotel : [
                {
                    id:'1',
                    name:'Aalife Restaurant',
                    location: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
                    food : [
                        {
                            id:'1',
                            name:'Chicken Biriyani',
                            qty: '2',
                            price: '520'
                        },
                        {
                            id:'2',
                            name:'Mutton Biriyani',
                            qty: '3',
                            price: '800'
                        },
                    ],

                },
                {
                    id:'2',
                    name:'Aariyas Vegetarian Restaurant',
                    location: 'Kottiyam, Kollam, Kerala 691003',
                    food : [
                        {
                            id:'1',
                            name:'Meals',
                            qty: '1',
                            price: '120'
                        },
                        {
                            id:'2',
                            name:'Fried Rice',
                            qty: '2',
                            price: '500'
                        },
                    ],
                },
                
            ],
            status: 'new'
        },
        {
            id:'2',
            name:'#87452',
            hotel : [
                {
                    id:'1',
                    name:'Zam Zam Restaurant',
                    location: 'Palaym, TVM , 695101',
                    food : [
                        {
                            id:'1',
                            name:'Chicken Biriyani',
                            qty: '1',
                            price: '130'
                        },
                     
                    ],
                },
                {
                    id:'2',
                    name:'MRA',
                    location: 'Palaym, TVM , 695101',
                    food : [
                        {
                            id:'2',
                            name:'Fried Rice',
                            qty: '3',
                            price: '600'
                        },
                    ],
                },
            ],
            status: 'new'
        },
    ]

    const activeOrders = [
        {
            id:'1',
            name:'#10765',
            customerName: 'Raj',
            addr: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
            hotel : [
                {
                    id:'1',
                    name:'Aalife Restaurant',
                    location: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
                    food : [
                        {
                            id:'1',
                            name:'Chicken Biriyani',
                            qty: '2',
                            price: '520'
                        },
                        {
                            id:'2',
                            name:'Mutton Biriyani',
                            qty: '3',
                            price: '800'
                        },
                    ],

                },
                {
                    id:'2',
                    name:'Aariyas Vegetarian Restaurant',
                    location: 'Kottiyam, Kollam, Kerala 691003',
                    food : [
                        {
                            id:'1',
                            name:'Meals',
                            qty: '1',
                            price: '120'
                        },
                        {
                            id:'2',
                            name:'Fried Rice',
                            qty: '2',
                            price: '500'
                        },
                    ],
                },
                
            ],
            status : 'active'
        },
       
    ]

    const completedOrders = [
        {
            id:'1',
            name:'#10765',
            customerName: 'Raj',
            addr: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
            hotel : [
                {
                    id:'1',
                    name:'Aalife Restaurant',
                    location: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
                    food : [
                        {
                            id:'1',
                            name:'Chicken Biriyani',
                            qty: '2',
                            price: '520'
                        },
                        {
                            id:'2',
                            name:'Mutton Biriyani',
                            qty: '3',
                            price: '800'
                        },
                    ],

                },
                {
                    id:'2',
                    name:'Aariyas Vegetarian Restaurant',
                    location: 'Kottiyam, Kollam, Kerala 691003',
                    food : [
                        {
                            id:'1',
                            name:'Meals',
                            qty: '1',
                            price: '120'
                        },
                        {
                            id:'2',
                            name:'Fried Rice',
                            qty: '2',
                            price: '500'
                        },
                    ],
                },
                
            ],
            status : 'complete'
        },
       
    ]

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
            <HeaderWithTitle title={'Orders'} drawerOpen={openDrawer}/>
            <ScrollView style={{backgroundColor: '#F3F3F3', paddingHorizontal:15 }}>
                <View style={{ marginTop: 15, flexDirection: 'row', flex:1, justifyContent: 'space-between' }}>
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
				<View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5, marginBottom:10 }}/>
                {currentTab === 0 && orders?.map((item)=>(
                    <CommonOrderCard key={item?.id} item={item}/>
                ))}
                {currentTab === 1 && activeOrders?.map((item)=>(
                    <CommonOrderCard key={item?.id} item={item}/>
                ))}
                {currentTab === 2 && completedOrders?.map((item)=>(
                    <CommonOrderCard key={item?.id} item={item}/>
                ))}
            </ScrollView>
        </>
    )
}

export default Orders

const styles = StyleSheet.create({})