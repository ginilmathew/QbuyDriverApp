import { StyleSheet, useWindowDimensions, TextInput, View, Image, Platform, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Controller } from 'react-hook-form'


const CommonInput = ({ placeholder, control, fieldName, error, inputMode, mt, icon, backgroundColor, topLabel, mb, placeholderTextColor, width, fontFamily, top, height, length }) => {


    return (
        <>
            {topLabel && <Text
                style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 11,
                    marginLeft: 5,
                    marginTop: top
                }}
            >{topLabel}</Text>}
            <View
                style={{
                    backgroundColor: backgroundColor ? backgroundColor : '#fff',
                    borderRadius: 7,
                    borderColor: "#fff",
                    borderWidth: 10,
                    marginTop: mt ? mt : 3,
                    // maxHeight: maxHeight ? maxHeight : 45,
                    shadowColor: Platform.OS === 'android' ? "#A2A2A2" : "#f2f2f2",
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    elevation: 8,
                    shadowOffset: { width: 1, height: 10 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 1,
                    marginBottom: mb,
                    height: 60
                }}
            >
                {icon && <View style={{width: 30, alignItems:'center', marginLeft: 5}}>
                    {icon}
                </View>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            minHeight={ height ? height : 45}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#23233C'}
                            inputMode={inputMode}
                            paddingLeft={7}
                            fontFamily={ fontFamily ? fontFamily : 'Poppins-Regular'}
                            fontSize={12}
                            color='#23233C'
                            width={ width ? width :'100%'}
                            marginTop={Platform.OS === 'android' ? 5 : 1}
                            maxLength={length}
                        />
                    )}
                    name={fieldName}
                />
            </View>
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
        </>

    )
}

export default CommonInput


const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 8
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 12, 
        marginTop: 15
    }
})
