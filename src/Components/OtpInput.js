import { StyleSheet } from 'react-native'
import React from 'react'
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
export default OtpInput
const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        backgroundColor: "#fff",
        borderRadius: 15,
        borderBottomWidth: 0,
        color: '#000',
        shadowColor: "#f2f2f2",
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 10 },
        marginTop: 50,
        elevation: 2
    }
})