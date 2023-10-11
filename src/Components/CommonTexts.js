import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CommonTexts = ({label, mt, textAlign, color, fontSize, my, ml, mb}) => {
    return (
        <Text
            style={{
                fontFamily: 'Poppins-SemiBold',
                color: color ? color : '#23233C',
                fontSize: fontSize ? fontSize : 11,
                marginTop: mt,
                textAlign: textAlign,
                marginVertical: my,
                marginLeft:ml,
                marginBottom:mb,
            }}
        >{label}</Text>
    )
}

export default memo(CommonTexts) 

const styles = StyleSheet.create({})