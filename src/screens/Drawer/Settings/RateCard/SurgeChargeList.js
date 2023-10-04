import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const SurgeChargeList = memo(({item}) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.25 }}>
                <Text style={styles.mediumText}>{item?.date}</Text>
            </View>
            <View style={{ flex: 0.25 }}>
                <Text style={styles.mediumText}>{'Time'}</Text>
            </View>
            <View style={{ flex: 0.25 }}>
                <Text style={styles.mediumText}>{'Type'}</Text>
            </View>
            <View style={{ flex: 0.35 }}>
                <Text style={styles.mediumText}>{'Franchisee'}</Text>
            </View>
            <View style={{ flex: 0.1 }}>
                <Text style={styles.mediumText}>{'Rate'}</Text>
            </View>
        </View>
    )
})

export default SurgeChargeList

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        paddingHorizontal: 15,  
        paddingBottom: 3,
        marginBottom:8 
    },
    mediumText: { 
        fontFamily: 'Poppins-Medium', 
        color: '#707070', 
        fontSize: 10 
    }
})