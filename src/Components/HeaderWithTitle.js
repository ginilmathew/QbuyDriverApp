import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity, Platform, TextInput } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonTexts from './CommonTexts'
import { useNavigation } from '@react-navigation/native'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AuthContext from '../contexts/Auth'
import reactotron from 'reactotron-react-native'

const HeaderWithTitle = ({ title, backAction, drawerOpen, onPress }) => {

    const navigation = useNavigation()
    const { userData } = useContext(AuthContext)

    reactotron.log(userData, "TEST")

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])

    const imageUpload = useCallback(() => {
        navigation.navigate('ImageUploadScreen')
    }, [])



    return (
        <>
            <StatusBar backgroundColor={Platform.OS === 'android' ? '#58D36E' : null} />
            <View
                style={{ backgroundColor: '#58D36E', height: Platform.OS === 'android' ? 60 : 100, flexDirection: 'row', paddingHorizontal: 15, alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    {backAction && <TouchableOpacity onPress={onPress ? onPress : goBack}>
                        <Ionicons name={"chevron-back"} size={30} color='#fff' />
                    </TouchableOpacity>}

                    {drawerOpen && <TouchableOpacity onPress={drawerOpen} style={{ marginRight: 5 }}>
                        <EvilIcons name={"navicon"} color="#fff" size={34} />
                    </TouchableOpacity>}

                    <CommonTexts
                        label={title}
                        color={'#fff'}
                        fontSize={21}
                        mt={7}
                    />

                </View>
                {userData?.online_status === "online" ? (
                    <View style={{ marginBottom: 4, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#008117", width: 10, height: 10, borderRadius: 20, marginRight: 8 }} />
                        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", marginRight: 8, fontSize: 15 }}>Online</Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={imageUpload} style={{ justifyContent: 'flex-end', marginBottom: 4, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Poppins-Medium", color: "#fff", marginRight: 8, fontSize: 12 }}>Attendance Status</Text>
                        <Ionicons name={"add-circle"} color="#fff" size={25} />
                    </TouchableOpacity>
                )}
            </View>
        </>
    )
}

export default HeaderWithTitle

const styles = StyleSheet.create({})