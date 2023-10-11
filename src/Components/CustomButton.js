import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomButton = ({ onPress, label, loading, mt, ml, bg, width, alignSelf, disabled, my, mb, mx, leftIcon, rightIconName }) => {

    return (
        <TouchableOpacity
            onPress={!loading ? onPress : null}
            style={{
                marginLeft: ml,
                marginTop: mt,
                backgroundColor: bg,
                borderRadius: 13,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 50,
                shadowColor: "#f2f2f2",
                shadowOpacity: 1,
                shadowRadius: 2,
                shadowOffset: { width: 1, height: 5 },
                elevation: 5,
                width: width,
                alignSelf: alignSelf,
                marginVertical: my,
                marginBottom: mb,
                marginHorizontal: mx,
                flexDirection: 'row'
            }}
            disabled={disabled}
        >
            {leftIcon}
            {!loading ? <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: Platform.OS === 'android' ? 4 : 1 }}>{label}</Text> : <ActivityIndicator color={'#fff'} />}
            {rightIconName && <Ionicons name={rightIconName} color='#fff' size={25} position='absolute' right={15} />}
        </TouchableOpacity>
    )
}

export default memo(CustomButton) 

const styles = StyleSheet.create({})