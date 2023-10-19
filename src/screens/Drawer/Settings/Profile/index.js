import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderWithTitle from '../../../../Components/HeaderWithTitle'
import CommonTexts from '../../../../Components/CommonTexts'
import CommonReadonlyBox from '../../../../Components/CommonReadonlyBox'
import reactotron from 'reactotron-react-native'
import { IMG_URL } from '../../../../config/constants'


const Profile = ({ navigation, route }) => {

    const { item } = route?.params

    reactotron.log(item, "PIT")

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
                                source={item?.image ? ({ uri: IMG_URL + item?.image }) : (require('../../../../Images/drawerLogo.png'))} alt='img'
                            />
                            <CommonTexts label={item?.name} fontSize={15} mt={5}/>
                            <Text style={{fontSize:10, color: '#909091',}}>ID : {item?.rider_id}</Text>
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
                            label={item?.mobile}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Emergency Contact'}
                            label={item?.emergency_contact}
                        />
                        <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                            <CommonReadonlyBox 
                                topLabel={'Gender'}
                                label={item?.gender}
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
                            label={item?.kyc_details?.aadhar_card_number}
                        />
                        <CommonReadonlyBox 
                            topLabel={'PAN Card Number'}
                            label={item?.kyc_details?.pan_card_number}

                        />
                        <CommonReadonlyBox 
                            topLabel={'Driving License'}
                            label={item?.kyc_details?.driving_license}

                        />
                        <CommonReadonlyBox 
                            topLabel={'RC Book Number'}
                            label={item?.kyc_details?.rc_book_number}

                        />
                    </View>
                    <View style={styles.border}/>
                    <View style={{paddingHorizontal:15, }}>
                        <CommonTexts label={'Bank Details '} fontSize={12} mb={8}/>
                        <CommonReadonlyBox 
                            topLabel={'Bank Name'}
                            label={item?.bank_account_details?.branch}
                        />
                        <CommonReadonlyBox 
                            topLabel={'IFSC Code'}
                            label={item?.bank_account_details?.ifsc}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Account Number'}
                            label={item?.bank_account_details?.account_number}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Account Name'}
                            label={item?.bank_account_details?.account_name}
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