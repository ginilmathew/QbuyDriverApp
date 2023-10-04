import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { memo } from 'react'
import CommonTexts from '../../../Components/CommonTexts'
import Ionicons from 'react-native-vector-icons/Ionicons'


const ReservationCard = memo(({item}) => {

    const{width}= useWindowDimensions()

    return (
        <View
            style={{
                borderRadius: 7,
                backgroundColor: '#fff',
                shadowOpacity: 0.2,
                shadowOffset: { height: 1, width: 1 },
                marginBottom: 10,
                elevation: 1,
                marginHorizontal: 1,
                borderWidth: 1,
                borderColor: item?.status === 'Reserved' ? '#FFB840' : '#FF7B7B',
                padding: 7
            }}
        >
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <CommonTexts label={item?.status} fontSize={15} color={item?.status === 'Reserved' ? '#FFB840' : '#FF7B7B'} />
                <Ionicons color={item?.status === 'Reserved' ? '#FFB840' : '#FF7B7B'} size={15} name='ellipse' />
            </View>
            <Text style={{ fontSize: 9, color: '#909091', fontFamily: 'Poppins-Regular', marginTop: 3 }}>{item?.date}</Text>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Text style={styles.regularText}>{"Store Name : "}</Text>
                <Text style={styles.semiBoldText}>{'Aalifa Restaurant'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Text style={styles.regularText}>{"Franchisee : "}</Text>
                <Text style={styles.semiBoldText}>{'Qbuy Kollam'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3, width: width / 1.4 }}>
                <Text style={styles.regularText}>{"Location : "}</Text>
                <Text style={styles.semiBoldText}>{'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003'}</Text>
            </View>

        </View>
    )
})

export default ReservationCard

const styles = StyleSheet.create({
    semiBoldText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 10
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 10,
    },
})