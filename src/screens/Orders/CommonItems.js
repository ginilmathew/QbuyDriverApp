import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CommonItems = memo(({item}) => {
    return (
        <View style={{ flexDirection: 'row', padding: 5 }}>
            <View style={{ flex: 0.68 }}>
                <Text style={styles.mediumText}>{item?.name}</Text>
            </View>
            <View style={{ flex: 0.25 }}>
                <Text style={styles.mediumText}>{item?.qty}</Text>
            </View>
            <View>
                <Text style={styles.mediumText}>{item?.price}</Text>
            </View>
        </View>
    )
})

export default CommonItems

const styles = StyleSheet.create({
    mediumText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10
    }
})