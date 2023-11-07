import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity, Platform, TextInput } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonTexts from './CommonTexts'
import { useNavigation } from '@react-navigation/native'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const HeaderWithTitle = ({ title, backAction, drawerOpen,  onPress}) => {

    const navigation = useNavigation()

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])
    return (
        <>
            <StatusBar backgroundColor={Platform.OS === 'android' ? '#58D36E' : null} />
            <View
                style={{ backgroundColor: '#58D36E', height: Platform.OS === 'android' ? 60 : 100, flexDirection: 'row', paddingHorizontal: 15, alignItems: 'flex-end', justifyContent:'space-between' }}
            >
                <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    {backAction && <TouchableOpacity onPress={ onPress ? onPress : goBack}>
                        <Ionicons name={"chevron-back"} size={30} color='#fff' />
                    </TouchableOpacity>}

                    {drawerOpen && <TouchableOpacity onPress={drawerOpen} style={{marginRight:5}}>
                        <EvilIcons name={"navicon"} color="#fff" size={34} />
                    </TouchableOpacity>}

                    <CommonTexts
                        label={title}
                        color={'#fff'}
                        fontSize={21}
                        mt={7}
                    />
                    
                </View>
                <TouchableOpacity onPress={drawerOpen} style={{ justifyContent:'flex-end', marginBottom: 4}}>
                    <Ionicons name={"add-circle"} color="#fff" size={30} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default HeaderWithTitle

const styles = StyleSheet.create({})