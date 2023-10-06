import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonAuthBg from '../CommonAuthBg';
import CommonInput from '../../../Components/CommonInput';
import CustomButton from '../../../Components/CustomButton';
import CommonAuthHeading from '../CommonAuthHeading';
import CommonTexts from '../../../Components/CommonTexts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CommonPicker from '../../../Components/CommonPicker';
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import SelectTab from '../../../Components/SelectTab';
import customAxios from '../../../CustomeAxios';
import reactotron from 'reactotron-react-native';
import { Toast, Select } from 'native-base';
import CommonDropdown from '../../../Components/CommonDropdown';

const phoneRegExp = /^(0|[1-9]\d*)(\.\d+)?$/

const Register = ({ navigation }) => {

	const [currentTab, setCurrentTab] = useState(0)
	const [values, setValues] = useState(null);

	const data = [
		{ label: 'Trivandrum', value: '1' },
		{ label: 'Kochi', value: '2' },
		{ label: 'Kannur', value: '3' },
	];

	const genderData = [
		{ label: 'Male', value: '1' },
		{ label: 'Female', value: '2' },
	];

	//reactotron.log(genderData,"GENDER")

	const [selectedImage, setSelectedImage] = useState('')

	//reactotron.log(selectedImage, "Selected")


	const schema = yup.object({
		name: yup.string().required('Name is required'),
		mobile: yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(10, 'Mobile Number should be atleast 10 digits.').max(10, 'Mobile Number should not excced 10 digits.').required('Mobile Number is required !'),
		emergency_contact: yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(10, 'Mobile Number should be atleast 10 digits.').max(10, 'Mobile Number should not excced 10 digits.'),
		//gender: yup.string().required('Gender is required'),
		aadhar_card_number: yup.string().matches(phoneRegExp, 'Aadhar Number is not valid').min(12, 'Aadhar Number should be atleast 12 digits.'),
		pan_card_number: yup.string().min(10, 'Pan Card should be atleast 10 characters.'),
		driving_license: yup.string().required('Driving License is required'),
		rc_book_number: yup.string().required('RC Book Number is required'),
		ifsc: yup.string().required('IFSC Code is required'),
		account_number: yup.string().required('Account Number is required'),
		account_name: yup.string().required('Account Name is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});


	const ImagePicker = () => {

		let options = {
			storageOptions: {
				path: 'image'
			},
		};

		launchImageLibrary(options, (response) => {
			reactotron.log(response, "res1")
			if (response.assets?.[0].fileSize > 2000000) {
				Toast.show({
					backgroundColor: 'error.500',
					description: 'Please upload image below 2MB',
					duration: 1500
				})
				return
			}

			if (response.assets?.length > 0) {
				//reactotron.log({ file: response?.assets?.[0] }, "UPLOAD")
				if (response?.assets?.[0]?.type === 'image/jpeg' || response?.assets?.[0]?.type === 'image/jpg' || response?.assets?.[0]?.type === 'image/png') {
					setSelectedImage(response.assets[0]);
				}
				else {
					Toast.show({
						description: 'Please choose jpg/jpeg/png type image',
						duration: 1500
					})
				}
			}

		});
	};


	const onLogin = useCallback(() => {
		navigation.navigate('Login')
	}, [])

	const bankDetails = useCallback((data) => {

		reactotron.log(data, "DATA")
		setCurrentTab(1)
	}, [])

	const kycDetails = useCallback((data) => {

		reactotron.log(data, "DATA2")
		setCurrentTab(2)
	}, [])

	// const onRegister = useCallback(() => {
	//     navigation.navigate('Login')
	// }, [])

	const onRegister = async (data) => {

		try {
			const regs = await customAxios.post('auth/riderregister', data)
			reactotron.log(regs, "Register")
			if (regs?.data?.status === 200) {
				navigation.navigate('Login')
			}
		}
		catch (error) {
			Toast.show({
				title: error,
				backgroundColor: "error.400",
				duration: 1500
			})
		}

	}


	return (
		<CommonAuthBg>

			<ScrollView style={{ flex: 1, paddingHorizontal: 40, }}>

				<Image
					style={styles.logo}
					source={require('../../../Images/pandaLogo.png')}
					resizeMode='contain'
				/>

				<CommonAuthHeading
					label={'Join Our Fam!'}
					mt={15}
				/>
				<CommonTexts
					label={'Fill in the required details to register'}
					mt={2}
				/>

				<View style={styles.tabContainer}>
					<SelectTab
						label={"Basic Details"}
						// onPress={()=>setCurrentTab(0)}
						selected={currentTab === 0 ? true : false}
						fontSize={12}
					/>
					<SelectTab
						label={"KYC"}
						// onPress={()=>setCurrentTab(1)}
						selected={currentTab === 1 ? true : false}
						fontSize={12}
					/>
					<SelectTab
						label={"Bank Details"}
						// onPress={()=>setCurrentTab(2)}s
						selected={currentTab === 2 ? true : false}
						fontSize={12}
					/>
				</View>
				<View style={styles.border}>

				</View>
				{currentTab === 0 &&
					<>
						<CommonInput
							leftElement
							control={control}
							error={errors.name}
							fieldName="name"
							placeholder='Name'
							inputMode={'numeric'}
							mt={20}
							icon={<Ionicons name='person' color='#58D36E' size={25} />}
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
						<CommonInput
							leftElement
							control={control}
							error={errors.emergency_contact}
							fieldName="emergency_contact"
							placeholder='Emergency Contact'
							inputMode={'numeric'}
							length={10}
							mt={20}
							icon={<Fontisto name='mobile' color='#58D36E' size={25} />}
						/>
						{/* <CommonInput
							leftElement
							control={control}
							error={errors.gender}
							fieldName="gender"
							placeholder='Gender'
							inputMode={'numeric'}
							mt={20}
							icon={<Fontisto name='intersex' color='#58D36E' size={25} marginLeft={3}/>}
						/> */}
						<CommonSelectDropdown
							data={genderData}
							value={values}
							setValue={setValue}
							placeholder='Gender'
							leftIcon={<Fontisto name='intersex' color='#58D36E' size={25} marginLeft={14} marginRight={10} />}
							mt={7}
							height={60}
						/>
						{/* <CommonDropdown
							data={genderData}
							value={values}
							control={control}
							error={errors.gender}
							fieldName="gender"
							setValue={setValue}
							placeholder='Gender'
							leftIcon={<Fontisto name='intersex' color='#58D36E' size={25} marginLeft={14} marginRight={10} />}
							mt={7}
							height={60}
						/> */}
						<CommonPicker
							onPress={ImagePicker}
							label={selectedImage ? (
								<View style={{flexDirection:"row", alignItems:"center"}}>
									<Text style={{ fontSize: 13, fontFamily: "Poppins-SemiBold", marginRight: 10, marginLeft: 10 }}>
										Image Uploaded
									</Text>
									<Ionicons name="checkmark-circle" size={20} color={"#58D36E"} />
								</View>
							) : 'Upload Photo'}
							icon={<Ionicons name={'cloud-upload'} size={20} color={"#5E59FF"} />}
							mt={5}
							leftIcon={<Entypo name='camera' color='#58D36E' size={23} marginLeft={5} />}
						/>

						<CustomButton
							onPress={handleSubmit(bankDetails)}
							bg='#58D36E'
							label={'Next'}
							mt={25}
						/>
					</>
				}
				{currentTab === 1 &&
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

						<CustomButton
							onPress={handleSubmit(kycDetails)}
							bg='#58D36E'
							label={'Next'}
							mt={92}
						/>

					</>
				}
				{currentTab === 2 &&
					<>
						<CommonSelectDropdown
							data={data}
							value={values}
							setValue={setValues}
							placeholder='Bank Name'
							leftIcon={<FontAwesome name='bank' color='#58D36E' size={22} marginLeft={10} marginRight={10} />}
							mt={7}
							height={60}
						/>
						<CommonInput
							leftElement
							control={control}
							error={errors.ifsc}
							fieldName="ifsc"
							placeholder='IFSC Code'
							inputMode={'numeric'}
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
							inputMode={'numeric'}
							mt={20}
							icon={<Entypo name='v-card' color='#58D36E' size={25} marginTop={1.5} />}
						/>

						<CustomButton
							onPress={handleSubmit(onRegister)}
							bg='#58D36E'
							label={'Register'}
							mt={92}
						/>
					</>
				}
				<Text style={styles.lightText}>Already part of the Qbuy Panda family?</Text>
				<TouchableOpacity onPress={onLogin}>
					<Text style={styles.textBold}>{"Login Here"}</Text>
				</TouchableOpacity>

			</ScrollView>

		</CommonAuthBg>
	)
}

export default Register

const styles = StyleSheet.create({
	logo: {
		width: 70,
		height: 80,
		marginTop: Platform.OS === 'android' ? 30 : 50,
		alignSelf: 'center',
	},
	textStyle: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		fontSize: 11,
		textAlign: 'center',
		marginTop: 50
	},
	textBold: {
		fontFamily: 'Poppins-Bold',
		color: '#FF4646',
		fontSize: 15,
		textAlign: 'center',
		marginTop: 10
	},
	lightText: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		textAlign: 'center',
		fontSize: 11,
		marginTop: 30
	},
	tabContainer: {
		marginTop: 20,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between'
	},
	border: {
		backgroundColor: '#00000014',
		height: 2,
		marginTop: -1.5
	}
})