import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderWithTitle from '../../../../Components/HeaderWithTitle'
import CommonTexts from '../../../../Components/CommonTexts'
import CommonReadonlyBox from '../../../../Components/CommonReadonlyBox'
import reactotron from 'reactotron-react-native'
import { IMG_URL } from '../../../../config/constants'
import { useQuery } from '@tanstack/react-query'
import customAxios from '../../../../CustomeAxios'



const getFranchisis = async () => {
    const data = await customAxios.get('admin/franchise/list');
    return data?.data?.data;
}

const Profile = ({ navigation, route }) => {

    
    const { item } = route?.params;
    const { data } = useQuery({
        queryKey: ['franchise-query'],
        queryFn: getFranchisis
    })
    const [franchiseList, setFranchiseList] = useState([]); 

    useEffect(() => {
        if(data) {

            let filteredList = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < item?.secondary_franchise?.length; j++) {
                    if (data[i]?._id === item?.secondary_franchise[j]?.franchise_id) {
                        filteredList.push(data[i]?.franchise_name)
                    }
               }
            }

            setFranchiseList(filteredList);
        }
    }, [data])


    const {width} = useWindowDimensions();

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
                            label={item?.primary_franchise?.franchise_name}
                        />
                        <CommonReadonlyBox 
                            topLabel={'Secondary Franchisee'}
                            label={franchiseList?.join(', ')}
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
                                label={item?.age_in_days}
                                width={width/2.25}
                            />
                        </View>
                        <View style={{flexDirection:'row',  justifyContent:'space-between'}}>
                            <CommonReadonlyBox 
                                topLabel={'Bootcash (COD Limit)'}
                                label={item?.boot_cash_limit}
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