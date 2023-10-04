import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal,  } from 'react-native'
import React, { useState, memo, useCallback } from 'react'
import CountCircle from '../../Components/CountCircle'
import CommonItems from './CommonItems'


const CommonStoreDetails = memo(({item}) => {
    const { width } = useWindowDimensions()
    return (
        <View key={item?.id} style={styles.container}>
            <View style={styles.header}>
                <CountCircle label={item?.id}/>
                <Text style={styles.nameText}>{"Store Name : "}</Text>
                <Text style={styles.mediumText}>{item?.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: width - 140, }}>
                <Text style={styles.locationText}>{"Location : "}</Text>
                <Text style={styles.mediumText}>{item?.location}</Text>
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
                {item?.food?.map((item,index) => (<CommonItems item={item} key={index}/>))}
                <View style={styles.totalBox} >
                    <Text style={styles.boldText}>{ 'Total Bill'}</Text>
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
        borderBottomWidth: 2, 
        borderBottomColor: '#00000014', 
        paddingBottom: 5 
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
        fontSize: 11
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
        borderColor: '#F8F8F8' 
    },
    totalBox: { 
        borderTopWidth: 2, 
        borderColor: '#F8F8F8', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingHorizontal: 5, 
        paddingVertical: 2
    },
    total: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 11, 
        color: '#2EA10C', 
        marginRight: 20 
    }
})