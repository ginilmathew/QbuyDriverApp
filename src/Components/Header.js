import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useNavigation } from '@react-navigation/native'

const Header = ({  onPress, openAddress, goCart}) => {



    const navigation = useNavigation()

  return (
    <>
        <StatusBar backgroundColor={ '#fff' } barStyle="dark-content" />
        <SafeAreaView 
            style={{ 
                flexDirection:'row', 
                backgroundColor: '#fff' , 
                alignItems:'center',
                justifyContent:'space-between',
                paddingTop: 5
            }}
        >
            <TouchableOpacity onPress={onPress} style={{marginLeft:10}}>
                <EvilIcons name={"navicon"} color="#23233C" size={36}/> 
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Notifications')} style={{marginRight:12}}>
                <Ionicons name={"notifications"} color="#23233C" size={25} />
            </TouchableOpacity> 
                              
        </SafeAreaView>
        
    </>
  )
}

export default Header



const styles = StyleSheet.create({
   
    logo: {
		width: 25,
		height: 25,
		resizeMode: 'contain',
	},
    textStyle : {
        fontFamily: 'Poppins-Medium',
        color: '#0D0D0D',
        fontSize: 9, 
    }
})