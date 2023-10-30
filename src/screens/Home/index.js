import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../../Components/Header'
import { BlurView } from "@react-native-community/blur";
import TotalCard from './TotalCard';
import CommonTexts from '../../Components/CommonTexts';
import UserImageName from './UserImageName';
import CommonOrderCard from '../Orders/CommonOrderCard';
import dark from '../../Images/dark.png'
import light from '../../Images/light.png'
import reactotron from 'reactotron-react-native';
import customAxios from '../../CustomeAxios';


const Home = ({ navigation, }) => {
    const{height,width} = useWindowDimensions()

    const [loading, setLoading] = useState(false)
    const [newHomeData, setNewHomeData] = useState('')

    reactotron.log(newHomeData, "NEW1")

    useEffect(() => {
        getHome()
    }, [])

    const getHome = async () => {
        setLoading(true);
        try {
            const homeData = await customAxios.get(`rider/home`)
            if (homeData?.data?.message === "success") {
                reactotron.log(homeData, "HOME")
                setNewHomeData(homeData?.data?.data)
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
                refreshControl={<RefreshControl refreshing={loading} onRefresh={getHome} />}
            >
                <UserImageName name={"TEST"}/>
                <TotalCard label={'Orders Today'} count={newHomeData?.total_order_count} bg='#58D36E' bgImg={light}/>
                <TotalCard label={'Amount Earned'} count={'₹ ' + newHomeData?.total_order_payment} bg='#58D39D' bgImg={dark}/>
                <View style={styles.newOrders}>
                    <CommonTexts label={'New Orders'} fontSize={18} />
                    <TouchableOpacity onPress={ViewAllOrders}>
                        <Text style={styles.viewAllText}>{"View All >>"}</Text>
                    </TouchableOpacity>
                </View>
                {newHomeData?.orders?.map((item)=>(
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
        marginTop: 20, 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom:10
    }
})