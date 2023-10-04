import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonTexts from '../../../../Components/CommonTexts'
import { useNavigation } from '@react-navigation/native'


const TicketCard = memo(({item}) => {

    const {width} = useWindowDimensions()
    const navigation = useNavigation()

    const onSubmit = useCallback(() => {
        navigation.navigate('AddCommentScreen',{item:item})
    }, [])

    return (
        <TouchableOpacity 
            onPress={onSubmit}
            style={styles.container}
        >
            <View 
                style={{alignSelf:'flex-end', backgroundColor: item?.status === 'open' ?'#58D36E' : '#FF4646', borderTopRightRadius:10, borderBottomLeftRadius:10, width: width/5.5, alignItems:'center'}}
            >
                <Text style={styles.statusText}>{(item?.status).toUpperCase()}</Text>
            </View>
            <View style={{paddingLeft:10, paddingBottom:10}}>
                <Text style={styles.semiboldText}>Ticket ID {'#262'}</Text>
                <View style={styles.textBtn}>
                    <Text style={styles.regularText}>{'22/05/2022 10:30am'}</Text>
                    <Ionicons name='arrow-forward' size={20} color='#58D36E'/>
                </View>
                <Text style={styles.mediumText}>Subject : {'Vehicle Repair'}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default TicketCard

const styles = StyleSheet.create({
    container: { 
        borderRadius: 10, 
        backgroundColor: '#fff', 
        shadowOpacity: 0.2, 
        shadowOffset: { height: 1, width: 1 }, 
        marginBottom: 20, 
        elevation: 1, 
        marginHorizontal: 2, 
        paddingBottom: 5 
    },
    mediumText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 10, 
        color: '#23233C' 
    },
    statusText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 12, 
        color: '#fff' 
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 9, 
        color: '#8D8D8D',
        marginVertical:6
    },
    semiboldText: { 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 14, 
        color: '#23233C' 
    },
    textBtn: {
        marginRight:15, 
        justifyContent:'space-between', 
        flexDirection:'row', 
        alignItems:'center'
    }
})