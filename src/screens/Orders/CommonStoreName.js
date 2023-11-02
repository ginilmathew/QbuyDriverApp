import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal, } from 'react-native'
import React, { useState, memo, useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonStoreDetails from './CommonStoreDetails'
import reactotron from 'reactotron-react-native'

const CommonStoreName = memo(({ item }) => {

    reactotron.log(item, "dfsf")

    const [showItems, setShowItems] = useState(false)

    const openDropdown = useCallback(() => {
        setShowItems(!showItems)
    })

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 20, height: 20 }} source={(require('../../Images/store.png'))} alt='img' />
                    <Text style={{
                        fontFamily: 'Poppins-Medium',
                        color: '#23233C',
                        fontSize: 12,
                        marginLeft: 5
                    }}>{item?.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={openDropdown}>
                        <Ionicons name={showItems ? 'chevron-up-circle' : 'chevron-down-circle'} size={22} color={'#58D36E'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginHorizontal: 10 }}>
                <Image style={{ width: 20, height: 20 }} source={(require('../../Images/price.png'))} alt='img' />
                <Text style={styles.total}>₹ {'1320'}</Text>
                {/* <Text style={styles.type}>{'Ready Cash'}</Text> */}
            </View>
            {showItems &&
                <>
                    <CommonStoreDetails item={item} />
                </>
            }

        </View>
    )
})

export default CommonStoreName

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F4F4F4",
        width: "100%",
        paddingBottom: 10
    },
    header: {
        borderRadius: 20,
        width: 15,
        height: 15,
        backgroundColor: '#576FD0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    total: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#2EA10C',
        marginLeft: 5,
        marginRight: 10
    },
    type: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#BC0E0E',
        backgroundColor: "#FFEDED",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    }
})