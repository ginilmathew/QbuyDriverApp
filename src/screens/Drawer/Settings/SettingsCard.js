import { StyleSheet, Text, Image, ScrollView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SettingsCard = ({label, leftElement, onPress}) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container}
        >
            <View style={{flex:0.1}}>
                {leftElement}
            </View>
            <View style={{flex:1}}>
                <Text style={styles.mediumText}>{label}</Text>
            </View>
            <View>
                <AntDesign name='arrowright' color='#58D36E' size={20}/>
            </View>
        </TouchableOpacity>
    )
}
export default SettingsCard

const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        elevation:1, 
        marginHorizontal:2, 
        shadowOpacity:0.1, 
        shadowOffset:{height:1, width:1}, 
        backgroundColor:'#fff', 
        borderRadius:10, 
        marginBottom:15, 
        alignItems:'center', 
        minHeight:40, 
        paddingHorizontal:10 
    },
    mediumText: {
        fontFamily:'Poppins-Medium', 
        fontSize:14, 
        color:'#23233C'
    }
})