import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomerNameLocation = ({ customerName, customerLocation, customerNumber, customerComments, onpress, currentTab }) => {
    return (
        <View style={{ paddingHorizontal: 10, marginTop: 10, marginBottom: 3, flexDirection: 'row', justifyContent: "space-between" }}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.regularText}>{'Customer Name : '}</Text>
                    <Text style={styles.semiBoldText}>{customerName}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 2, width: "85%" }}>
                    <Text style={styles.regularText}>{'Location : '}</Text>
                    <Text style={styles.addressText}>{customerLocation}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <Text style={styles.regularText}>{'Phone No : '}</Text>
                    <Text style={styles.addressText}>{customerNumber}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <Text style={styles.regularText}>{'Comments : '}</Text>
                    <Text style={styles.addressText}>{customerComments}</Text>
                </View>
            </View>
            {currentTab === 1 ? (<View style={{ paddingHorizontal: 10, marginTop: 10, marginBottom: 3, alignSelf: "center" }}>
                <TouchableOpacity onPress={onpress}>
                <Image style={styles.call} source={require('../../Images/phone.png')} resizeMode='contain' />
                </TouchableOpacity>
            </View>) : null}
        </View>
    )
}

export default CustomerNameLocation

const styles = StyleSheet.create({
    addressText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 10,
        paddingRight: 50
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
    },
    call: {
        width: 35,
        height: 35
    }
})