import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomerNameLocation = ({customerName,customerLocation}) => {
    return (
        <View style={{ paddingHorizontal: 5, marginTop: 2 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.regularText}>{'Customer Name : '}</Text>
                <Text style={styles.semiBoldText}>{customerName}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={styles.regularText}>{'Location : '}</Text>
                <Text
                    style={styles.addressText}
                >{customerLocation}</Text>
            </View>
        </View>
    )
}

export default CustomerNameLocation

const styles = StyleSheet.create({
    addressText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 10,
        paddingRight:50
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 10
    },
    semiBoldText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 10
    }
})