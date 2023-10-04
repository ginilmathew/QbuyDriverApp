import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import CustomButton from '../../Components/CustomButton';
import RouteCard from './RouteCard';
import CommonModal from '../../Components/CommonModal';
import { useNavigation } from '@react-navigation/native';
import TotalBillBox from './TotalBillBox';
import CustomerDetailsBox from './CustomerDetailsBox';
import Ionicons from 'react-native-vector-icons/Ionicons'

const RouteMap = () => {

    const {width} = useWindowDimensions()

    const [selected, setSelected] = useState('1')
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState(1);

    const navigation = useNavigation()

    // console.log({ status })

    const food = [
        {
            id:'1',
            name:'Chicken Biriyani',
            qty: '2',
            price: '520'
        },
        {
            id:'2',
            name:'Mutton Biriyani',
            qty: '3',
            price: '800'
        },
    ]


    const datas = [
        {
            _id: '1',
            name: 'Aalife Restaurant',
            address: 'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003',
        },
        {
            _id: '2',
            name: 'Aariyas Vegetarian Restaurant',
            address: 'Kottiyam, Kollam, Kerala 691003',
        },
    ]

    const renderTripButton = (status) => {
        switch (status) {
            case 1:
                return (
                    <View style={styles.floatingView}>
                        {datas.map((item) =>
                            <RouteCard
                                item={item}
                                key={item?._id}
                                selected={selected}
                                onPress={() => setSelected(item?._id)}
                            />
                        )}
                        <CustomButton
                            onPress={() => setModalVisible(true)}
                            label={'Confirm Restaurant'}
                            bg='#58D36E'
                        />
                    </View>
                )

            case 2:
                return (

                    <View style={styles.floatingView}>
                        <TotalBillBox item={food}/>
                        <CustomButton
                            onPress={() => setModalVisible(true)}
                            label={'Pickup Order'}
                            bg='#C7B63E'
                        />
                    </View>
                )
            case 3:
                return (

                    <View style={styles.floatingView}>
                        <CustomerDetailsBox/>
                        <CustomButton
                            onPress={() => setModalVisible(true)}
                            label={'On Location'}
                            bg='#FF7B7B'
                        />
                    </View>
                   
                )
            // case 4:
            //     return (
            //         <CustomButton
            //             // onPress={()=>setStatus(5)}
            //             label={'Confirm Restaurant'}
            //             bg='#58D36E'
            //         />
            //     )
            // case 5:
            //     return (
            //         <CustomButton
            //             // onPress={()=>setStatus(2)}
            //             label={'Confirm Restaurant'}
            //             bg='#58D36E'
            //         />
            //     )

            default:
                return (
                    <CustomButton
                        onPress={() => setStatus(2)}
                        label={'Confirm Restaurant'}
                        bg='#58D36E'
                    />
                )
        }
    }
    const openModal = useCallback(() => {
        setModalVisible(false)
        status !== 3 ? setStatus(status + 1) : navigation.navigate('Orders', { mode: 'maps' })
    })

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Route'} backAction />
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: 8.5686,
                        longitude: 76.8731,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 8.5686,
                            longitude: 76.8731,
                        }}
                    />
                    <MapViewDirections
                        origin={{
                            latitude: 8.5686,
                            longitude: 76.8731,
                        }}
                        destination={{
                            latitude: 8.8932,
                            longitude: 76.6141
                        }}
                        apikey="AIzaSyC0G7dxT1BOwA2sacNdua7wmwcZbQonKXo"
                        strokeWidth={4}
                        strokeColor="#FF0000"
                        optimizeWaypoints={true}
                        mode="DRIVING"
                        timePrecision="now"
                        onReady={result => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 10,
                                    bottom: 20,
                                    left: 10,
                                    top: 40
                                }
                            })

                        }}
                    />
                    <Marker
                        coordinate={{
                            latitude: 8.8932,
                            longitude: 76.6141
                        }}
                        pinColor='#576FD0'
                    />

                </MapView>


                {renderTripButton(status)}
            </View>
            <CommonModal
                visible={modalVisible}
                onClose={closeModal}
            >
                <Ionicons name={'ios-alert-circle'} size={40} color={'#FF0000'} alignSelf='center' marginTop={-10} />
                <Text style={styles.lightText}>{
                    status === 1 ? 'Are you sure you want to choose route for this restaurant?' :
                    status === 2 ? 'Are you sure you want to confirm pickup for this order?' :
                    status === 3 ? 'Are you sure you want to confirm this status ?' : null
                }</Text>
                <CustomButton
                    onPress={openModal}
                    label={'Confirm'} bg='#58D36E'
                    width={width / 3.5}
                    alignSelf='center'
                    my={10}
                />
            </CommonModal>
        </>
    )
}

export default RouteMap

const styles = StyleSheet.create({
    floatingView: { 
        position: 'absolute', 
        bottom: 40, 
        alignSelf: 'center', 
        width: '100%', 
        paddingHorizontal: 15 
    },
    lightText: {
        fontFamily: 'Poppins-Light',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 30
    }
})