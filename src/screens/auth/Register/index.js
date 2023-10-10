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
import SelectTab from '../../../Components/SelectTab';
import customAxios from '../../../CustomeAxios';
import reactotron from 'reactotron-react-native';
import { Toast } from 'native-base';
import BasicDetails from '../../../Components/register/BasicDetails';
import BankDetails from '../../../Components/register/BankDetails';
import KYC from '../../../Components/register/KYC';

const Register = ({ navigation }) => {

	const [currentTab, setCurrentTab] = useState(0)
	const [loading, setLoading] = useState(false)
	//const [values, setValues] = useState(null);

	//reactotron.log(values, "Values")

	const [basicData, setBasicData] = useState(null)
	const [kycData, setKycData] = useState(null)
	const [bankData, setBankData] = useState(null)

	reactotron.log(basicData, "BASIC")
	reactotron.log(kycData, "KYC")
	reactotron.log(bankData, "BANK")

	const onLogin = useCallback(() => {
		navigation.navigate('Login')
	}, [])

	const onRegister = async (data) => {

		setBankData(data)

		setLoading(true)
		try {
			const formData = new FormData();
			if (basicData?.image) {
				formData.append('image', {
					uri: basicData?.image?.uri,
					type: 'image/jpeg',
					name: 'profile.jpg',
				});
			}
			formData.append('name', basicData.name);
			formData.append('email', basicData.email);
			formData.append('mobile', basicData.mobile);
			formData.append('emergency_contact', basicData.emergency_contact);
			formData.append('gender', basicData.gender);
			formData.append('kyc_details', JSON.stringify(kycData))
			formData.append('bank_account_details', JSON.stringify(data))

			const regs = await customAxios.post('auth/riderregister', formData, {
				headers: {
					"Content-Type": 'multipart/form-data'
				}
			})
			reactotron.log(regs, "Register")
			if (regs?.data?.status === 200 || 201) {
				Toast.show({
                    description: 'Your Account has been successfully registered!',
                    backgroundColor: 'success.500',
                    duration: 1700
                })
				navigation.navigate('Login')
			}
		}
		catch (error) {
			Toast.show({
				title: error,
				backgroundColor: "error.400",
				duration: 1500
			})
		} finally {
            setLoading(false);
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
						//onPress={() => setCurrentTab(0)}
						selected={currentTab === 0 ? true : false}
						fontSize={12}
					/>
					<SelectTab
						label={"KYC"}
						//onPress={() => setCurrentTab(1)}
						selected={currentTab === 1 ? true : false}
						fontSize={12}
					/>
					<SelectTab
						label={"Bank Details"}
						//onPress={() => setCurrentTab(2)}
						selected={currentTab === 2 ? true : false}
						fontSize={12}
					/>
				</View>
				<View style={styles.border}>

				</View>
				{currentTab === 0 &&
					<BasicDetails tabChange={() => setCurrentTab(1)} onsubmit={setBasicData} data={basicData} />
				}
				{currentTab === 1 &&
					<KYC tabChange={() => setCurrentTab(2)} tabChangeBack={() => setCurrentTab(0)} onsubmit={setKycData} data={kycData} />
				}
				{currentTab === 2 &&
					<BankDetails reg={onRegister} tabChangeBack={() => setCurrentTab(1)} loading={loading}/>
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