import { StyleSheet, Text, View, Image, ScrollView, Platform, } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonAuthBg from '../CommonAuthBg';
import CustomButton from '../../../Components/CustomButton';
import CommonTitle from '../../../Components/CommonTitle';
import OtpInput from '../../../Components/OtpInput';
import CommonTexts from '../../../Components/CommonTexts';
import AuthContext from '../../../contexts/Auth';
import LoaderContext from '../../../contexts/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Otp = ({ navigation }) => {


	const userOtp = useContext(AuthContext)
	const loadingg = useContext(LoaderContext)

	let loader = loadingg?.loading
	let mobileNo = userOtp.login.mobile
	let token = 'drglisbgifiuefojejoiwe'

	let otpss = userOtp?.otp

	console.log({otpss})

	const schema = yup.object({
		otp: yup.number().required('OTP is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	var cardnumber = mobileNo;
	var first2 = cardnumber?.substring(0, 2);
	var last1 = cardnumber?.substring(cardnumber.length - 1);
	
	mask = cardnumber?.substring(2, cardnumber.length - 1).replace(/\d/g,"*");
	let phoneNum = first2 + mask + last1

	const onSubmit = useCallback(async(data) => {
        navigation.navigate('ImageUploadScreen')
		userOtp.setOtp(data)
		await AsyncStorage.setItem("token", token);
    }, [])


	const backAction = useCallback(() => {
		navigation.goBack()
    }, [])

	return (
		<CommonAuthBg>
			<ScrollView style={{ flex: 1, paddingHorizontal: 40, }}>
				<CommonTitle goBack={backAction} mt={ Platform.OS === 'android' ? 80 : 100 }/>
				<CommonTexts
					label={'Enter the 4 - digit code we sent to your registered mobile number'}
					mt={40}
				/>
				<CommonTexts
					label={phoneNum}
					mt={40}
					textAlign='center'
				/>
				<OtpInput 
					onchange={(text) => {
						setValue("otp", text) 
					}}
				/>
				<CommonTexts
					label={'Resend OTP'}
					mt={10}
					textAlign='right'
					color={'#5871D3'}
				/>
				<CustomButton
					onPress={handleSubmit(onSubmit)}
					bg='#58D36E'
					label={'Confirm'}
					my={20}
					width={100}
					alignSelf='center'
					loading={loader}
				/>
			</ScrollView>
		</CommonAuthBg>
	)
}

export default Otp

const styles = StyleSheet.create({

	logo: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		marginTop: 100,
		alignSelf: 'center'
	},
})