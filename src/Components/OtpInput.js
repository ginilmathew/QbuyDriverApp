import { Platform, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import OTPTextInput from 'react-native-otp-textinput'

const OtpInput = ({ onchange }) => {
    return (
        <OTPTextInput
            inputCount={4}
            textInputStyle={styles.container}
            tintColor='#E5E5E5'
            handleTextChange={onchange}
        />
    )
}
export default memo(OtpInput) 
const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        backgroundColor: "#fff",
        borderRadius: 15,
        borderBottomWidth: 0,
        color: '#000',
        shadowColor: Platform.OS === 'android' ? "#A2A2A2" : "#f2f2f2",
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 10 },
        marginTop: 50,
        elevation: 2
    }
})