import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const OrderedItems = memo(({item}) => {
    return (
        <View key={item?.id} style={styles.container}>
            <View style={{ flex: 0.7 }}>
                <Text style={styles.mediumTxt}>{item?.name}</Text>
            </View>
            <View style={{ flex: 0.25 }}>
                <Text style={styles.mediumTxt}>{item?.qty}</Text>
            </View>
            <View>
                <Text style={styles.mediumTxt}>{item?.price}</Text>
            </View>
        </View>
    )
})

export default OrderedItems

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        paddingVertical: 3 
    },
    mediumTxt: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10
    }
})