import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { memo, useCallback, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native'
import CodCollectProgress from './CodCollectProgress';
import moment from 'moment';


const WorkCard = memo(({item}) => {

    const [date, setDate] = useState(new Date())

    const today = moment(date).format('DD/MM/YYYY')

    // console.log({today})

    const navigation = useNavigation()

    const {width} = useWindowDimensions()

    const amount = item?.amount

    

    const goWorkLogs = useCallback(() => {
        navigation.navigate('WorkLogs')
    }, [])

    return (
        <TouchableOpacity
            onPress={goWorkLogs} 
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.dateText}>{item?.date}</Text>
                <Ionicons name='ellipse' color={item?.date === today ? '#58D36E' : '#FF7B7B'} size={10}/>
            </View>

            <View style={styles.totalDetails}>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Total Orders'}</Text>
                    <Text style={styles.totalCount}>{'205'}</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Total Revenue'}</Text>
                    <Text style={styles.totalCount}>₹ {'550'}</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Amount Earned'}</Text>
                    <Text style={styles.totalCount}>₹ {'550'}</Text>
                </View>
            </View>
            <View style={styles.loginTimeBox}>
                <Text style={styles.regularText}>{'Total Logged In Time'}</Text>
                <Text style={styles.semiboldText}>{'8 hrs 38 mins'}</Text>
            </View>

            <CodCollectProgress amount={amount}/>

            <View style={{flexDirection:'row', position:'absolute', alignSelf:'center', alignItems:'center', bottom:4}}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 9, color: amount === 1000 ? '#fff' : '#23233C' }}>{'COD Collected : '}</Text>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 10, color: amount === 1000 ? '#fff' : '#23233C' }}>{amount} / 1000</Text>
            </View>

        </TouchableOpacity>
    )
})

export default WorkCard

const styles = StyleSheet.create({
    container: { 
        borderRadius: 15, 
        backgroundColor: '#fff', 
        shadowOpacity: 0.2, 
        shadowOffset: { height: 1, width: 1 }, 
        marginBottom: 17, 
        elevation: 1, 
        marginHorizontal: 1, 
    },
    header: { 
        flexDirection: 'row', 
        borderTopRightRadius: 15, 
        borderTopLeftRadius: 15, 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    dateText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 10, 
        color: '#23233C' 
    },
    totalDetails: { 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        alignItems: 'center', 
        marginTop: 8,
   
        paddingBottom:5
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 9, 
        color: '#23233C' 
    },
    totalCount: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 18, 
        color: '#23233C' 
    },
    payouBreak: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10, 
        borderTopWidth: 1, 
        marginTop: 5, 
        borderColor: '#7070700F' 
    },
    payouBreakText: { 
        fontFamily: 'Poppins-Bold',
        color: '#23233C',
        fontSize: 11
    },
    dropdownBox: { 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 10, 
        marginBottom: 5,
        paddingTop:3
    },
    mediumText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 10, 
        color: '#23233C' 
    },
    semiboldText: { 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 10, 
        color: '#23233C' 
    },
    extraCharges: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom:3 
    },
    loginTimeBox: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        marginHorizontal:10,     
        borderTopWidth:1, 
        borderColor:'#F3F3F3', 
        paddingVertical:10
    }
    
})