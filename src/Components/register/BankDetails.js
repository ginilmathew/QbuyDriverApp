import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import CommonInput from '../CommonInput'
import CommonSelectDropdown from '../CommonSelectDropdown'
import CustomButton from '../CustomButton'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import reactotron from 'reactotron-react-native'

const BankDetails = ({ reg, tabChangeBack, data, loading }) => {

    const bankData = [
        { label: 'State Bank of India', value: '1' },
        { label: 'HDFC Bank', value: '2' },
        { label: 'ICICI Bank', value: '3' },
        { label: 'Federal Bank', value: '4' },
        { label: 'Indian Overseas Bank', value: '5' },
        { label: 'Standard Chartered Bank', value: '6' },
        { label: 'Yes Bank', value: '7' },
        { label: 'Axis Bank', value: '8' },
        { label: 'Kerala Gramin Bank', value: '9' },
        { label: 'South Indian Bank', value: '10' },
        { label: 'Bank of Baroda', value: '11' },
        { label: 'Canara Bank', value: '12' },
        { label: 'Central Bank of India', value: '13' },
        { label: 'IDBI Bank', value: '14' },
        { label: 'Syndicate Bank', value: '15' },
    ];

    const schema = yup.object({
        branch: yup.string().required('Bank Name is required'),
        ifsc: yup.string().required('IFSC Code is required').min(5, 'IFSC Code should be atleast 5 characters.').max(15, 'IFSC Code is limited to 15 characters.'),
        account_number: yup.string().required('Account Number is required').min(5, 'Account Number should be atleast 5 characters.').max(15, 'Account Number is limited to 15 characters.'),
        account_name: yup.string().required('Account Name is required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data
    });

    const branchName = useCallback((value) => {
        setValue("branch", value)
        setError("branch", null)
    }, [])

    const backButton = () => {
        tabChangeBack()
    }

    const formThree = useCallback((data) => {
        reactotron.log(data, "DATA")
        //onsubmit(data)
        reg(data)
    }, [])

    return (
        <>
            <CommonSelectDropdown
                data={bankData}
                control={control}
                fieldName='branch'
                error={errors.branch}
                placeholder='Bank Name'
                onchange={branchName}
                leftIcon={<FontAwesome name='bank' color='#58D36E' size={22} marginLeft={10} marginRight={10} />}
                mt={7}
                height={60}
                search
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.ifsc}
                fieldName="ifsc"
                placeholder='IFSC Code'
                inputMode={'text'}
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.account_number}
                fieldName="account_number"
                placeholder='Account Number'
                inputMode={'numeric'}
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.account_name}
                fieldName="account_name"
                placeholder='Account Name'
                inputMode={'text'}
                mt={20}
                icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
            />

            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}>

                <CustomButton
                    onPress={backButton}
                    bg='#58D36E'
                    label={'Go Back'}
                    mt={92}
                    width="48.5%"
                />

                <CustomButton
                    onPress={handleSubmit(formThree)}
                    bg='#58D36E'
                    label={'Register'}
                    mt={92}
                    width="48.5%"
                    loading={loading}
                    disabled={loading ? true : false }
                />

            </View>
        </>
    )
}

export default BankDetails

const styles = StyleSheet.create({})