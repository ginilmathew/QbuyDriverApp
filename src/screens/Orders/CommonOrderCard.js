import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Modal, } from 'react-native'
import React, { useState, memo, useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import CommonModal from '../../Components/CommonModal';
import CommonStoreDetails from './CommonStoreDetails';
import CommonStoreName from './CommonStoreName';
import CustomerNameLocation from './CustomerNameLocation';
import CommonStatusCard from '../../Components/CommonStatusCard';

const CommonOrderCard = memo(({ item }) => {

    const { width } = useWindowDimensions()

    const navigation = useNavigation();
    const [showItems, setShowItems] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);


    const openDropdown = useCallback(() => {
        setShowItems(!showItems)
    })

    const openModal = useCallback(() => {
        setModalVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const onSubmit = useCallback(() => {
        setModalVisible(false)
        if (item?.status === 'new') {
            navigation.navigate('RouteMap')
        } else {
            navigation.navigate('Orders', { mode: 'active' })
        }
    }, [])

    return (
        <>
            <View style={{ marginBottom: 20, paddingHorizontal: 1 }}>
                <Text style={styles.dateText}>{"22/05/2022 10:30am"}</Text>
                <View key={item?.id} style={styles.container}>
                    <View style={styles.containerHead}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                            <Text style={styles.orderIdLabel}>{"Order ID "}</Text>
                            <Text style={styles.orderId}>{item?.name}</Text>
                        </View>
                        {item?.status === 'new' && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.reassignLabel}>{"Order reassign time  "}</Text>
                            <Text style={styles.countDouwn}>{"00:59"}</Text>
                        </View>}
                        {item?.status === 'complete' && <CommonStatusCard label={'Completed'} bg='#BCFFC8' labelColor={'#07AF25'} />}
                    </View>
                    {item?.status === 'new' && item?.hotel?.map((item) => (
                        <CommonStoreName item={item} key={item?.id} />
                    ))}
                    {item?.status === 'active' || item?.status === 'complete' ?
                        <CustomerNameLocation
                            customerName={item?.customerName}
                            customerLocation={item?.addr}
                        /> : null}
                    <View style={item?.status === 'complete' ? styles.orderBreakBox : styles.orderBreakBoxTwo} >
                        <Text style={styles.orderBreakText}>{'Order Breakdown'}</Text>
                        <TouchableOpacity onPress={openDropdown}>
                            <Ionicons name={showItems ? 'chevron-up-circle' : 'chevron-down-circle'} size={22} color={'#58D36E'} />
                        </TouchableOpacity>
                    </View>
                    {showItems && <>
                        {item?.hotel?.map((item, index) => <CommonStoreDetails item={item} key={index} />)}
                    </>}
                    {item?.status === 'new' && <CustomButton
                        onPress={openModal}
                        label={'Accept Order'} bg='#576FD0' mt={8} mx={8}
                    />}

                    {item?.status === 'active' && <CustomButton
                        onPress={openModal}
                        label={'Complete Delivery'} bg='#58D36E' mt={8} mx={8}
                    />}
                </View>
            </View>

            <CommonModal
                visible={modalVisible}
                onClose={closeModal}
            >
                <Ionicons name={'ios-alert-circle'} size={40} color={'#FF0000'} alignSelf='center' marginTop={-10} />
                <Text style={styles.lightText}>{item?.status === 'new' ? 'Are you sure you want to accept this order?' :
                    'Are you sure you want to confirm completion of this order ?'
                }</Text>
                <CustomButton
                    onPress={onSubmit}
                    label={'Confirm'} bg='#58D36E'
                    width={200}
                    alignSelf='center'
                    my={20}
                />
            </CommonModal>

        </>
    )
})

export default CommonOrderCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 11,
        backgroundColor: '#fff',
        paddingBottom: 10,
        shadowOffset: { height: 10, width: 1 },
        elevation: 1,
        shadowColor: "#f2f2f2",
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    containerHead: {
        flexDirection: 'row',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 11,
        marginBottom: 10,
        // marginLeft: 1
    },
    orderIdLabel: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 12,
    },
    orderId: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#23233C'
    },
    reassignLabel: {
        fontFamily: 'Poppins-LightItalic',
        color: '#23233C',
        fontSize: 10,
    },
    countDouwn: {
        fontFamily: 'Poppins-Bold',
        color: '#FF4646',
        fontSize: 18,
    },
    orderBreakBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderTopWidth: 1,
        //borderBottomWidth: 1,
        marginTop: 10,
        borderColor: '#7070700F'
    },
    orderBreakBoxTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 10,
        borderColor: '#7070700F'
    },
    orderBreakText: {
        fontFamily: 'Poppins-Bold',
        color: '#23233C',
        fontSize: 11
    },
    addressText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 10,
        paddingRight: 50
    },
    lightText: {
        fontFamily: 'Poppins-Medium',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 30,
        marginTop: 10
    }

})