import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, Keyboard, } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonAuthBg from '../CommonAuthBg';
import CommonInput from '../../../Components/CommonInput';
import CommonAuthHeading from '../CommonAuthHeading';
import TermsAndPrivacyText from './TermsAndPrivacyText';
import CustomButton from '../../../Components/CustomButton';
import HelpAndSupportText from './HelpAndSupportText';
import CommonTexts from '../../../Components/CommonTexts';
import Fontisto from 'react-native-vector-icons/Fontisto'
import AuthContext from '../../../contexts/Auth';
import LoaderContext from '../../../contexts/Loader';
import customAxios from '../../../CustomeAxios';
import reactotron from 'reactotron-react-native';
import Toast from 'react-native-toast-message'

const phoneRegExp = /^(0|[1-9]\d*)(\.\d+)?$/

const Login = ({ navigation }) => {

	const loginUser = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	//const successID = "Success Token"
	//const errorID = "Error Token"

	let user = loginUser?.login
	console.log({ user })

	const schema = yup.object({
		mobile: yup.string().matches(phoneRegExp, 'Mobile number must be numeric').min(10, 'Mobile Number should be atleast 10 digits.').max(10, 'Mobile Number should not excced 10 digits.').required('Mobile Number is required !'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async(data) => {
		Keyboard.dismiss()

		setLoading(true);

		try {
			const res = await customAxios.post('auth/riderloginotp', data);
			reactotron.log(res, "RES")
			if (res?.data?.status === 201 || 200) {
				Toast.show({
					type: 'success',
					text1: 'A OTP has been sent to your registered mobile number'
				});
			navigation.navigate('Otp', data);
			}
		} catch (error) {
			Toast.show({
				type: 'success',
				text1: error
			});
		} finally {
            setLoading(false);
        }
	}


	const register = useCallback(() => {
		navigation.navigate('Register')
	}, [])


	return (
		<CommonAuthBg>

			<ScrollView style={{ flex: 1, paddingHorizontal: 40, }} keyboardShouldPersistTaps="always">

				<Image
					style={styles.logo}
					source={require('../../../Images/pandaLogo.png')}
					resizeMode='contain'
				/>

				<CommonAuthHeading
					label={'Welcome'}
					mt={20}
				/>

				<CommonTexts
					label={'Sign in with your mobile for an OTP'}
					mt={2}
				/>


				<CommonInput
					leftElement
					control={control}
					error={errors.mobile}
					fieldName="mobile"
					placeholder='Mobile Number'
					inputMode={'numeric'}
					mt={20}
					icon={<Fontisto name='mobile' color='#58D36E' size={25} />}
					length={10}
				/>

				<TermsAndPrivacyText />

				<CustomButton
					onPress={handleSubmit(onSubmit)}
					bg='#58D36E'
					label={'Sign In'}
					mt={20}
					loading={loading}
					disabled={loading ? true : false}
				/>

				<Text style={styles.textLight}>{"Need Support to Login?"}</Text>

				<HelpAndSupportText />

				<Text style={styles.textLight}>{"New to the family?"}</Text>


				<TouchableOpacity onPress={register}>
					<Text style={styles.textRegister}>{"Register Here"}</Text>
				</TouchableOpacity>



			</ScrollView>

		</CommonAuthBg>
	)
}

export default Login

const styles = StyleSheet.create({

	logo: {
		width: 120,
		height: 130,
		marginTop: Platform.OS === 'android' ? 100 : 130,
		alignSelf: 'center',
	},
	textLight: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		fontSize: 11,
		textAlign: 'center',
		marginTop: 20
	},
	textRegister: {
		fontFamily: 'Poppins-Bold',
		color: '#FF4646',
		fontSize: 18,
		textAlign: 'center',
	},

})