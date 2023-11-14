import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CommonSquareButton = ({position, bottom, mt, onPress, iconName}) => {

    return (
        <TouchableOpacity
            style={{
                width: 45,
                height: 45,
                backgroundColor: '#58D36E',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: mt
            }}
            onPress={onPress}
        >
            <FontAwesome5 name={iconName} color='#fff' size={25} />

        </TouchableOpacity>
    )
}

export default CommonSquareButton

const styles = StyleSheet.create({})