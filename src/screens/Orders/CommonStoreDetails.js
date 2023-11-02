import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal, } from 'react-native'
import React, { useState, memo, useCallback } from 'react'
import CountCircle from '../../Components/CountCircle'
import CommonItems from './CommonItems'
import reactotron from 'reactotron-react-native'


const CommonStoreDetails = memo(({ item }) => {

    reactotron.log(item, "Stro")
    const { width } = useWindowDimensions()
    return (
        <View key={item?.id} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 3, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '70%', alignItems: 'center' }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 10, marginRight: 5 }} source={(require('../../Images/location2.png'))} alt='img' />
                    <Text style={styles.mediumText}>{item?.location}</Text>
                </View>
                <View style={{marginRight: 10}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontFamily: "Poppins-Medium", fontSize: 12, color: "#2EA10C"}}>View Map</Text>
                        <Image style={{ width: 15, height: 15, marginLeft: 5, marginRight: 5 }} source={(require('../../Images/arrow.png'))} alt='img' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemBox}>
                <View style={styles.itemHeader}>
                    <View style={{ flex: 0.68 }}>
                        <Text style={styles.boldText}>{'Product'}</Text>
                    </View>
                    <View style={{ flex: 0.25 }}>
                        <Text style={styles.boldText}>{'Qty'}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.boldText}>{'Price'}</Text>
                    </View>
                </View>
                {item?.food?.map((item, index) => (<CommonItems item={item} key={index} />))}
                <View style={styles.totalBox} >
                    <Text style={styles.boldText}>{'Total Bill'}</Text>
                    <Text style={styles.total}>₹ {'1320'}</Text>
                </View>
            </View>
        </View>
    )
})

export default CommonStoreDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: -10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 5
    },
    nameText: {
        fontFamily: 'Poppins-Light',
        color: '#23233C',
        fontSize: 10, marginLeft: 5
    },
    mediumText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10
    },
    locationText: {
        fontFamily: 'Poppins-Light',
        color: '#23233C',
        fontSize: 10, marginLeft: 25
    },
    boldText: {
        fontFamily: 'Poppins-Bold',
        color: '#23233C',
        fontSize: 11,
        marginLeft: 5
    },
    itemBox: {
        borderRadius: 10,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 5,
        paddingBottom: 5
    },
    itemHeader: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 2,
        borderColor: '#F8F8F8',
    },
    totalBox: {
        borderTopWidth: 2,
        borderColor: '#F8F8F8',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    total: {
        fontFamily: 'Poppins-Bold',
        fontSize: 11,
        color: '#2EA10C',
        marginRight: 20
    }
})