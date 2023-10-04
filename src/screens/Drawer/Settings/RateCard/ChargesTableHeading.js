import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChargesTableHeading = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.25 }}>
                <Text style={styles.mediumText}>{'Date'}</Text>
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
}

export default ChargesTableHeading

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        paddingHorizontal: 15, 
        borderBottomWidth: 2, 
        borderColor: '#0D4E810D', 
        paddingBottom: 3,
        marginBottom:5 
    },
    mediumText: { 
        fontFamily: 'Poppins-Medium', 
        color: '#707070', 
        fontSize: 10 
    }
})