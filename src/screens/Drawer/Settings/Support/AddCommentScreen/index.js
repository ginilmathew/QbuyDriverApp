import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment';
import HeaderWithTitle from '../../../../../Components/HeaderWithTitle';

import CustomButton from '../../../../../Components/CustomButton';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonInput from '../../../../../Components/CommonInput';
import CommonTexts from '../../../../../Components/CommonTexts';
import SubjectBox from './SubjectBox';
import Comments from './Comments';
import CommonModal from '../../../../../Components/CommonModal';

const AddCommentScreen = ({ navigation, route }) => {

    const item = route?.params?.item

    console.log({ item })

    const { width } = useWindowDimensions()

    const [modalVisible, setModalVisible] = useState(false);


    const schema = yup.object({
        subject: yup.string().min(8).required('Subject is required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });




    const openModal = useCallback(() => {
        setModalVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const onSubmit = useCallback(() => {
        setModalVisible(false)
    }, [])

    const goBack = useCallback(() => {
        navigation.navigate('Support')
    }, [])



    return (
        <>
            <HeaderWithTitle title={'Ticket ID ' + item?.id} onPress={goBack} backAction />
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <SubjectBox />
                <View style={{paddingHorizontal: 15, marginBottom: 80}}>

                    <Comments />

                </View>
                <View style={{ position: 'absolute', width: width, bottom: 40, paddingHorizontal: 40 }}>
                    {item?.status === 'open' ? <CustomButton
                        onPress={openModal}
                        bg={'#FF6565'}
                        label='Add Comment'
                    /> : 
                        <View style={{ alignItems: 'center' }}>
                            <View
                                style={{ backgroundColor: '#FF4646', borderRadius: 10, width: width / 5.5, alignItems: 'center' }}
                            >
                                <Text style={styles.statusText}>{'CLOSED'}</Text>
                            </View>
                            <Text 
                                style={{fontSize:8, color:'#F71C1C', fontFamily:'Montserrat-Medium', marginTop:2 }}
                            >{'22/05/2022 10:40am'}</Text>
                        </View>
                    }
                </View>

            </View>

        

            <CommonModal
                visible={modalVisible}
                onClose={closeModal}
            >
                <CommonTexts textAlign={'center'} label={'Add Comments'} fontSize={22} mt={-25}/>
                <View style={{paddingHorizontal:10,}}>
                    <CommonInput
                        control={control}
                        error={errors.subject}
                        fieldName="comments"
                        placeholder='Type your comments here...'
                        backgroundColor={'#F2F2F2'}
                        height={130}
                        mt={5}
                        fontFamily='Poppins-LightItalic'
                    />
                </View>
                <CustomButton
                    onPress={onSubmit}
                    label={'Confirm'} bg='#58D36E'
                    width={width / 3.5}
                    alignSelf='center'
                    my={20}
                />
            </CommonModal>


        </>

    )
}

export default AddCommentScreen

const styles = StyleSheet.create({
    tabContainer: {
        marginTop: 15,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    border: {
        backgroundColor: '#00000014',
        height: 2,
        marginTop: -1.5,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 20
    },
    statusText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 12, 
        color: '#fff' 
    },
})