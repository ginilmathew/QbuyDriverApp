import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TableHeading = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.4 }}>
                <Text style={styles.mediumText}>{'Date'}</Text>
            </View>
            <View style={{ flex: 0.4 }}>
                <Text style={styles.mediumText}>{'Login Time'}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.mediumText}>{'Logout Time'}</Text>
            </View>
        </View>
    )
}

export default TableHeading

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