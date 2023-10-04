import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const HistoryList = memo(({item}) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.4 }}>
                <Text style={styles.italicText}>{item?.date}</Text>
            </View>
            <View style={{ flex: 0.4 }}>
                <Text style={styles.regularText}>{'8:45am'}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.regularText}>{'6:45pm'}</Text>
            </View>
        </View>
    )
})

export default HistoryList

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        paddingHorizontal: 15,
        marginBottom: 8 
    },
    italicText: { 
        fontFamily: 'Poppins-LightItalic', 
        color: '#000', 
        fontSize: 10 
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        color: '#000', 
        fontSize: 10 
    }
})