import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment';
import HeaderWithTitle from '../../../Components/HeaderWithTitle';
import LogCard from './LogCard'
import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { workLogs } from '../../../Api/work'
import Toast from 'react-native-toast-message';


const WorkLogs = ({ navigation, route }) => {

    const { data, error, isError, mutate } = useMutation({
        mutationFn: workLogs
    });

    useEffect(() => {
        mutate({ date: route?.params?.date });
    }, [route?.params]);

    useEffect(() => {
        if(isError) {

            Toast.show({
                type: 'error',
                text1: error
            })
        }
    }, [isError])

    return (
        <>
            {/* <HeaderWithTitle title={'Work Logs'} backAction /> */}
            <View style={{ flex: 1, backgroundColor: '#F3F3F3', }}>
                <ScrollView style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15, marginBottom: 80, paddingTop: 10 }}>
                    {data?.map((item) => (
                        <LogCard item={item} key={item?._id} />
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