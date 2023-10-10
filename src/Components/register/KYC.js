import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import CommonInput from '../CommonInput'
import CustomButton from '../CustomButton'
import Entypo from 'react-native-vector-icons/Entypo'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import reactotron from 'reactotron-react-native'

const phoneRegExp = /^(0|[1-9]\d*)(\.\d+)?$/

const KYC = ({ tabChange, tabChangeBack, onsubmit, data }) => {

    const schema = yup.object({
        aadhar_card_number: yup.string().matches(phoneRegExp, 'Aadhar Number is not valid').min(12, 'Aadhar Number should be atleast 12 digits.').required('Aadhar Card Number is required'),
        pan_card_number: yup.string().min(10, 'Pan Card should be atleast 10 characters.').required('Pan Card Number is required'),
        driving_license: yup.string().min(5, 'Driving License should be atleast 5 characters.').max(15, 'Driving License is limited to 15 characters.').required('Driving License is required'),
        rc_book_number: yup.string().required('RC Book Number is required').min(5, 'RC Book Number should be atleast 5 characters.').max(15, 'RC Book Number is limited to 15 characters.'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data
    });

    const backButton = () => {
        tabChangeBack()
    }

    const formTwo = useCallback((data) => {
        reactotron.log(data, "DATA")
        onsubmit(data)
        tabChange()
    }, [])

    return (
        <>
            <CommonInput
                leftElement
                control={control}
                error={errors.aadhar_card_number}
                fieldName="aadhar_card_number"
                placeholder='Adhaar Number'
                length={12}
                inputMode={'numeric'}
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.pan_card_number}
                fieldName="pan_card_number"
                placeholder='PAN Card Number'
                length={10}
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.driving_license}
                fieldName="driving_license"
                placeholder='Driving License'
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.rc_book_number}
                fieldName="rc_book_number"
                placeholder='RC Book Number'
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />
            <View style={{ flexDirection: "row", gap: 10, alignItems:"center", justifyContent:"center" }}>

                <CustomButton
                    onPress={backButton}
                    bg='#58D36E'
                    label={'Go Back'}
                    mt={92}
                    width="48.5%"
                />

                <CustomButton
                    onPress={handleSubmit(formTwo)}
                    bg='#58D36E'
                    label={'Next'}
                    mt={92}
                    width="48.5%"
                />

            </View>

        </>
    )
}

export default KYC

const styles = StyleSheet.create({})