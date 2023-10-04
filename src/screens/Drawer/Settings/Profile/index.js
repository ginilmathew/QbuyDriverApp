import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderWithTitle from '../../../../Components/HeaderWithTitle'
import CommonTexts from '../../../../Components/CommonTexts'
import CommonReadonlyBox from '../../../../Components/CommonReadonlyBox'


const Profile = ({ navigation }) => {

    const {width} = useWindowDimensions()
    return (
        <>
            <HeaderWithTitle title={'Profile'} backAction />
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <ScrollView style={{ backgroundColor: '#fff', marginBottom:80 }}>

                    <View style={{paddingHorizontal:15, }}>
                        <View style={{alignSelf:'center', marginTop:10, alignItems:'center', marginBottom:10}}>
                            <Image
                                style={{ width: 100, height: 100, borderRadius: 12 }}
                                source={require('../../../../Images/men.jpg')} alt='img'
                            />
                            <CommonTexts label={'Ben Johnson'} fontSize={15} mt={5}/>
                            <Text style={{fontSize:10, color: '#909091',}}>ID : #638237</Text>
                        </View>

                        <CommonReadonlyBox 
                            topLabel={'Primary Franchisee'}
                            label={'Qbuy Kollam'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Secondary Franchisee'}
                            label={'Qbuy Trivandrum'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Phone Number'}
                            label={'1234567890'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Emergency Contact'}
                            label={'9874563214'}
                        />
                        <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                            <CommonReadonlyBox 
                                topLabel={'Gender'}
                                label={'Male'}
                                width={width/2.25}
                            />
                            <CommonReadonlyBox 
                                topLabel={'Age in Days (From Joining)'}
                                label={'25'}
                                width={width/2.25}
                            />
                        </View>
                        <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                            <CommonReadonlyBox 
                                topLabel={'Bootcash (COD Limit)'}
                                label={'5000'}
                                width={width/2.25}
                            />
                            <CommonReadonlyBox 
                                topLabel={'Customer Ratings'}
                                label={'4.2'}
                                width={width/2.25}
                            />
                        </View>
                    </View>
                    <View style={styles.border}/>
                    <View style={{paddingHorizontal:15, }}>
                        <CommonTexts label={'KYC'} fontSize={12} mb={8}/>
                        <CommonReadonlyBox 
                            topLabel={'Aadhaar Number'}
                            label={'124512412451'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'PAN Card Number'}
                            label={'BRIPE0608F'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Driving License'}
                            label={'YHG675DD3'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'RC Book Number'}
                            label={'CCAIU8765RRF'}
                        />
                    </View>
                    <View style={styles.border}/>
                    <View style={{paddingHorizontal:15, }}>
                        <CommonTexts label={'Bank Details '} fontSize={12} mb={8}/>
                        <CommonReadonlyBox 
                            topLabel={'Bank Name'}
                            label={'State Bank of India'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'IFSC Code'}
                            label={'SBI000884'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Account Number'}
                            label={'8877456544156'}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Account Name'}
                            label={'Ben Johnson'}
                        />
                    </View>


                    
               
                </ScrollView>

            </View>
            
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    border: {  
        height: 4,
        backgroundColor: '#0D4E810D', 
        marginVertical:10 
    }
})