import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment';
import HeaderWithTitle from '../../../Components/HeaderWithTitle';
import LogCard from './LogCard'

const WorkLogs = ({ navigation }) => {

    const { width } = useWindowDimensions()

    let logs = [
        {
            id: '1',
            cod: false,
            date : '22/05/2022'
        },
        {
            id: '2',
            cod: true,
            date : '28/03/2022'
        },
        {
            id: '3',
            cod: false,
            date : '12/11/2022'
        },
        {
            id: '4',
            cod: true,
            date : '02/03/2023'
        },
        {
            id: '5',
            cod: false,
            date : '01/02/2023'
        },
    ]

    return (
        <>
            <HeaderWithTitle title={'Work Logs'} backAction />
            <View style={{flex:1, backgroundColor: '#F3F3F3', }}>
                <ScrollView style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15, marginBottom:80, paddingTop:10 }}>
                {logs?.map((item) => (
                    <LogCard item={item} key={item?.id} />
                ))}
                </ScrollView>
            </View>
        </>
    )
}

export default WorkLogs

const styles = StyleSheet.create({
    tabContainer: {
        marginTop: 15,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    border: {
        backgroundColor: '#00000014',
        height: 2,
        marginTop: -1.5,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 20
    },
    semibold: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 17,
        textAlign: 'center',
        paddingHorizontal: 40,
        marginTop: 10
    }

})