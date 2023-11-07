import { StyleSheet, Text, View, Image, ScrollView, Platform, Keyboard, } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
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
import customAxios from '../../../CustomeAxios';
import reactotron from 'reactotron-react-native';
import Toast from 'react-native-toast-message'

const Otp = ({ navigation, route }) => {

	const [loading, setLoading] = useState(false)

	const { setUser, getProfileDetails } = useContext(AuthContext)
	const { mobile } = route?.params

	const schema = yup.object({
		otp: yup.number().required('OTP is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {

		Keyboard.dismiss()

		const datas = {
			mobile: mobile,
			otp: data?.otp
		};

		setLoading(true);

		try {
			const res = await customAxios.post('auth/riderlogin', datas);
			//reactotron.log(res, "OTPRES")
			if (res?.data?.status === 201 || 200) {

				let data = res?.data;
				_id = data?.user?._id

				await AsyncStorage.setItem("_id", _id)
				await AsyncStorage.setItem("token", data?.access_token)
				setUser(data?.user)
				navigation.navigate('Menu')
				getProfileDetails()

			} else {
                throw "Internal server error"
            }
		}
		catch (error) {
			Toast.show({
				type: 'error',
				text1: error
			  });
		}  finally {
            setLoading(false);
        }
	}

	const backAction = useCallback(() => {
		navigation.goBack()
	}, [])

	return (
		<CommonAuthBg>
			<ScrollView style={{ flex: 1, paddingHorizontal: 40, marginTop: 30 }} keyboardShouldPersistTaps="always">
				<CommonTitle goBack={backAction} mt={Platform.OS === 'android' ? 80 : 100} />
				<CommonTexts
					label={'Enter the 4 - digit code we sent to your registered mobile number'}
					mt={40}
				/>
				<CommonTexts
					label={mobile}
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
					mt={12}
					textAlign='right'
					color={'#5871D3'}
					fontSize={15}
				/>
				<CustomButton
					onPress={handleSubmit(onSubmit)}
					bg='#58D36E'
					label={'Confirm'}
					my={20}
					width={150}
					alignSelf='center'
					loading={loading}
					disabled={loading ? true : false}
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