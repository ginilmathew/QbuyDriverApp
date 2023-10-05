import { StyleSheet, TouchableOpacity, useWindowDimensions, Text, View } from 'react-native'
import React, { useContext } from 'react'
import CommonTexts from './CommonTexts'

const CommonPicker = ({onPress, label, fontFamily, topLabel, icon, w, mt, bg, leftIcon, children}) => {

    const { width, height } = useWindowDimensions()

  return (
    <View style={{marginTop:mt, marginHorizontal:1}}>
        {<Text
            style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 11,
                marginBottom:2,
                marginLeft:3
            }}
        >{topLabel}</Text>}
    
        <TouchableOpacity 
            onPress={onPress}
            style={{
                width: w,
                flexDirection:'row', 
                minHeight:45, 
                alignItems:'center',
                backgroundColor: bg ? bg : '#fff', 
                borderRadius:7,  
                shadowColor: "#f2f2f2",
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 2,
                shadowOffset: { width: 1, height: 10 },
                marginBottom: 1,
                height: 60
            }}
        >
            {leftIcon && <View style={{width:35, alignItems:'center', marginLeft: 10}}>
                {leftIcon}
            </View>}
            {children}
            <Text style={{fontFamily: fontFamily ? fontFamily : 'Poppins-Regular', color:'#23233C', fontSize:11, flex:0.95, paddingLeft:10}} >{label}</Text>
            {icon}
        </TouchableOpacity>
    </View>
  )
}

export default CommonPicker

const styles = StyleSheet.create({})