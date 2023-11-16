import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonStatusCard from '../../Components/CommonStatusCard'


const PayoutCard = memo(({item}) => {
    const [showItems, setShowItems] = useState(false)

    return (
        <View 
        // style={styles.container}
        style={{flex:1,justifyContent:'center',alignItems:'center'}}
        >
            {/* <View style={styles.header}>
                <Text style={styles.dateText}>{item?.date}</Text>
                <CommonStatusCard
                    bg={item?.status === 'Completed' ? '#BCFFC8' : '#FFF297'}
                    label={item?.status}
                    labelColor={item?.status === 'Completed' ? '#07AF25' :'#B7A000'}
                />
            </View>

            <View style={styles.totalDetails}>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Total Orders'}</Text>
                    <Text style={styles.totalCount}>{'205'}</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Total Revenue'}</Text>
                    <Text style={styles.totalCount}>₹ {'550'}</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Payout'}</Text>
                    <Text style={styles.totalCount}>₹ {'550'}</Text>
                </View>
            </View>

            <View style={styles.payouBreak}>
                <Text style={styles.payouBreakText}>{'Payout Breakdown'}</Text>
                <TouchableOpacity onPress={() => setShowItems(!showItems)} style={{marginTop: 5}}>
                    <Ionicons name={showItems ? 'chevron-up-circle' : 'chevron-down-circle'} size={22} color={'#58D36E'} />
                </TouchableOpacity>
            </View>
            {showItems && <>
                <View style={styles.dropdownBox}>
                    <View style={styles.extraCharges}>
                        <Text style={styles.mediumText}>{'Delivery Charge'}</Text>
                        <Text style={styles.semiboldText}>₹ {'80'}</Text>
                    </View>
                    <View style={styles.extraCharges}>
                        <Text style={styles.mediumText}>{'Tips Given'}</Text>
                        <Text style={styles.semiboldText}>₹ {'80'}</Text>
                    </View>
                    <View style={styles.extraCharges}>
                        <Text style={styles.mediumText}>{'Surge Charge'}</Text>
                        <Text style={styles.semiboldText}>₹ {'80'}</Text>
                    </View>
                </View>
            </>} */}
            <Text>Coming Soon!.. </Text>
        </View>
    )
})

export default PayoutCard

const styles = StyleSheet.create({
    container: { 
        borderRadius: 15, 
        // backgroundColor: '#fff',
        // shadowColor: "#f2f2f2",
        shadowRadius: 5, 
        shadowOpacity: 1, 
        shadowOffset: { height: 10, width: 1 }, 
        marginBottom: 10, 
        elevation: 1, 
        marginHorizontal: 2, 
    paddingBottom: 10,
        marginTop: 8 
    },
    header: { 
        flexDirection: 'row', 
        borderTopRightRadius: 15, 
        borderTopLeftRadius: 15, 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 10, 
        paddingVertical: 8, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    dateText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 10, 
        color: '#23233C' 
    },
    totalDetails: { 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        alignItems: 'center', 
        marginTop: 8 
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 9, 
        color: '#23233C' 
    },
    totalCount: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 18, 
        color: '#23233C' 
    },
    payouBreak: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10, 
        borderTopWidth: 1, 
        marginTop: 5, 
        borderColor: '#7070700F' 
    },
    payouBreakText: { 
        fontFamily: 'Poppins-Bold',
        color: '#23233C',
        fontSize: 11,
        paddingTop: 8
    },
    dropdownBox: { 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 10, 
        marginBottom: 5,
        paddingVertical:10,
        gap: 5
    },
    mediumText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 10, 
        color: '#23233C' 
    },
    semiboldText: { 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 10, 
        color: '#23233C' 
    },
    extraCharges: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom:3 
    }
    
})