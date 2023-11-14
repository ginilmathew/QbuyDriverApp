import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment';
import HeaderWithTitle from '../../../../Components/HeaderWithTitle';
import Lottie from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CommonPicker from '../../../../Components/CommonPicker';
import CommonSquareButton from '../../../../Components/CommonSquareButton';


const ReferFriend = ({ navigation }) => {

    const { width } = useWindowDimensions()



    return (
        <>
            <HeaderWithTitle title={'Refer A Friend'} backAction />
            <ScrollView style={{ backgroundColor: '#fff', paddingHorizontal: 15 }}>
                <Lottie
                    source={{ uri: 'https://assets3.lottiefiles.com/packages/lf20_osdxlbqq.json' }}
                    autoPlay
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                />
                <Text style={styles.semibold}>Invite your Friends to our Qbuy Panda fam!</Text>

                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'flex-end' }}>
                    <CommonPicker
                        // onPress={()=>setOpenCalendar(true)}
                        icon={<FontAwesome5 name={'copy'} size={25} color={"#58D36E"} />}
                        w={width - 90}
                        label='QBUY8654652'
                        topLabel='Your Referral Code'
                    />
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <CommonSquareButton
                            iconName={'share-alt'}
                        />
                    </View>
                </View>


            </ScrollView>

        </>

    )
}

export default ReferFriend

const styles = StyleSheet.create({

    semibold: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 17,
        textAlign: 'center',
        paddingHorizontal: 40,
        marginTop: 10
    }

})