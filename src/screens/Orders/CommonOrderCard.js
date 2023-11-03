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
import reactotron from 'reactotron-react-native';
import { useToast } from 'native-base';
import customAxios from '../../CustomeAxios';

const CommonOrderCard = memo(({ item, currentTab }) => {

    const toast = useToast()

    reactotron.log(item, "Card")

    const { width } = useWindowDimensions()

    const navigation = useNavigation();
    //const [showItems, setShowItems] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);


    // const openDropdown = useCallback(() => {
    //     setShowItems(!showItems)
    // })

    const openModal = useCallback(() => {
        setModalVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const onSubmit = useCallback(() => {
        setModalVisible(false)
        if (currentTab === 0) {
            acceptOrder();
        } else {
            navigation.navigate('Orders', { mode: 'active' })
        }
    }, [])

    const acceptOrder = async () => {

        const datas = {
            order_id: item?._id,
            status: "active"
        };

        try {
            const acceptData = await customAxios.post(`rider/orders/updateStatus`, datas)
            if (acceptData?.status === 201 && acceptData?.data?.message === "success") {
                reactotron.log(acceptData, "ACCEPTED")
                //setNewOrder(acceptData?.data?.data)
            } else {
                throw "Internal server error"
            }

        } catch (error) {
            if (error) {
                toast.show({
                    title: error,
                    backgroundColor: "error.400",
                    duration: 1500
                })
            }
            else {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
        }
    }

    const renderText = () => {
        if (currentTab === 0) {
            return (
                <Text>Are you sure you want to accept this order?</Text>
            )
        } else if (currentTab === 1) {
            return (
                <Text>Are you sure you want to change this order to pickup?</Text>
            )
        }
    }

    return (
        <>
            <View style={{ marginBottom: 15, paddingHorizontal: 1 }}>
                <Text style={styles.dateText}>{item?.delivery_date}</Text>
                <View key={item?.id} style={styles.container}>
                    <View style={styles.containerHead}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.orderIdLabel}>{"Order ID "}</Text>
                            <Text style={styles.orderId}>{item?.order_id}</Text>
                        </View>
                        {/* {item?.status === 'new' && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.reassignLabel}>{"Order reassign time  "}</Text>
                            <Text style={styles.countDouwn}>{"00:59"}</Text>
                        </View>} */}
                        {item?.status === 'complete' && <CommonStatusCard label={'Completed'} bg='#BCFFC8' labelColor={'#07AF25'} />}
                    </View>
                    {currentTab === 0 && item?.store?.map((item) => (
                        <CommonStoreName item={item} key={item?.id} />
                    ))}
                    {currentTab === 1 && item?.store?.map((item) => (
                        <CommonStoreName item={item} key={item?.id} currentTab={currentTab} onpress={openModal} />
                    ))}
                    {currentTab === 1 ?
                        <CustomerNameLocation
                            customerName={item?.customer_details?.customer_name}
                            customerLocation={item?.customer_details?.customer_address?.area?.address}
                        /> : null}
                    {/* {item?.status === 'active' || item?.status === 'complete' ?
                        <CustomerNameLocation
                            customerName={item?.customerName}
                            customerLocation={item?.addr}
                        /> : null} */}
                    {/* <View style={styles.orderBreakBox} >
                        <Text style={styles.orderBreakText}>{'Order Breakdown'}</Text>
                        <TouchableOpacity onPress={openDropdown}>
                            <Ionicons name={showItems ? 'chevron-up-circle' : 'chevron-down-circle'} size={22} color={'#58D36E'} />
                        </TouchableOpacity>
                    </View> */}
                    {/* {showItems && <>
                        {item?.hotel?.map((item, index) => <CommonStoreDetails item={item} key={index} />)}
                    </>} */}

                    <TouchableOpacity style={styles.customerLoc}>
                        <Text style={{ marginRight: 8, fontFamily: 'Poppins-Medium', color: '#2EA10C', fontSize: 12 }}>Customer Location</Text>
                        <Image style={{ width: 15, height: 15 }} source={(require('../../Images/arrow.png'))} alt='img' />
                    </TouchableOpacity>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <View style={styles.box}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.total}>{'Payment Method'}</Text>
                                <Text style={styles.totalTwo}>{item?.payment_type}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.total}>{'Grand Total'}</Text>
                                <Text style={styles.totalThree}>{`₹ ${item?.grand_total}`}</Text>
                            </View>
                        </View>
                    </View>

                    {currentTab === 0 && <CustomButton
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
                <Text style={styles.lightText}>{renderText()}</Text>
                <CustomButton
                    onPress={onSubmit}
                    label={'Confirm'} bg='#58D36E'
                    width={width / 3.5}
                    alignSelf='center'
                    my={10}
                />
            </CommonModal>

        </>
    )
})

export default CommonOrderCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#fff',
        paddingBottom: 10,
        shadowOffset: { height: 1, width: 1 },
        elevation: 1,
        shadowOpacity: 0.2
    },
    containerHead: {
        flexDirection: 'row',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
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
        marginBottom: 3,
        // marginLeft: 1
    },
    orderIdLabel: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10,
    },
    orderId: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        color: '#23233C'
    },
    reassignLabel: {
        fontFamily: 'Poppins-LightItalic',
        color: '#23233C',
        fontSize: 7,
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
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 5,
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
        fontFamily: 'Poppins-Light',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 30
    },
    customerLoc: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#D3FFD0',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    total: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
        marginRight: 10
    },
    totalTwo: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
        marginRight: 10
    },
    totalThree: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#2EA10C',
        marginLeft: 5,
        marginRight: 10
    },
    box: {
        borderWidth: 1,
        borderRadius: 9,
        borderStyle: 'dashed',
        borderColor: '#E6E6E6',
        padding: 10,
    }

})