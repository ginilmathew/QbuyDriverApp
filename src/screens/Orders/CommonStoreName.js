import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal,  } from 'react-native'
import React, { useState, memo } from 'react'

const CommonStoreName = memo(({item}) => {
    return (
        <View style={styles.container}>
            <View
                style={styles.header}
            >
                <Text style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#fff',
                    fontSize: 9,
                }}>{item?.id}</Text>
            </View>
            <Text style={{
                fontFamily: 'Poppins-Light',
                color: '#23233C',
                fontSize: 10, marginLeft: 5
            }}>{"Store Name : "}</Text>
            <Text style={{
                fontFamily: 'Poppins-Medium',
                color: '#23233C',
                fontSize: 10
            }}>{item?.name}</Text>
        </View>
    )
})

export default CommonStoreName

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginHorizontal: 5, 
        marginTop: 10,
    },
    header:{ 
        borderRadius: 20, 
        width: 15, 
        height: 15, 
        backgroundColor: '#576FD0', 
        alignItems: 'center', 
        justifyContent: 'center', 
    }
})