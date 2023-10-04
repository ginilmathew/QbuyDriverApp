import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'


const RouteCard = memo(({onPress, selected, item}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.circle}>
                <Text style={styles.mediumText}>{item?._id}</Text>
            </View>
            <View style={{flex:0.95}}>
                <Text style={styles.boldText}>{item?.name}</Text>
                <Text
                    style={styles.addressText}
                >{item?.address}</Text>
            </View>

            <View style={{marginHorizontal:5, alignSelf:'center'}}>
                <Ionicons name={selected === item?._id ? 'checkmark-circle' : 'ellipse-outline'} color = {'#58D36E'} size={20}/>
            </View>
        </TouchableOpacity>
    )
})

export default RouteCard

const styles = StyleSheet.create({
    container : { 
        paddingHorizontal:8,
        backgroundColor: '#fff', 
        borderRadius: 10, 
        marginBottom: 5, 
        borderWidth:1, 
        flexDirection:'row', 
        borderColor:'#E9E9E9', 
        paddingVertical:8,
    },
    addressText: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 11,
        marginTop:5
    },
    circle: { 
        borderRadius: 20, 
        width: 15, 
        height: 15, 
        backgroundColor: '#576FD0', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight:5, 
        marginTop:1
    },
    mediumText: {
        fontFamily: 'Poppins-Medium',
        color: '#fff',
        fontSize: 9,
    },
    boldText: {
        fontFamily: 'Poppins-Bold',
        color: '#23233C',
        fontSize: 11
    }
    
})