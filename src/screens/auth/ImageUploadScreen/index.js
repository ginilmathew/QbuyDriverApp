import { StyleSheet, Text, View, Image, ScrollView, Platform, PermissionsAndroid, TouchableOpacity, } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CommonAuthBg from '../CommonAuthBg';
import CustomButton from '../../../Components/CustomButton';
import CommonTexts from '../../../Components/CommonTexts';
import CommonAuthHeading from '../CommonAuthHeading';
import { launchCamera } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import reactotron from 'reactotron-react-native';
import customAxios from '../../../CustomeAxios';
import dayjs from 'dayjs';
import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../../../contexts/Auth';
import Toast from 'react-native-toast-message'


const ImageUploadScreen = ({ navigation }) => {

	const [filePath, setFilePath] = useState(null);
	const [loading, setLoading] = useState(false)
	const [location, setLocation] = useState(null)
	const { user } = useContext(AuthContext)

	reactotron.log(user, "DTA")


	const currentDate = dayjs().format('YYYY-MM-DD')
	const currentTime = dayjs().format('HH:mm')
	const currentLocation = [
		{
			'longitude': location?.coords?.longitude,
			'latitude': location?.coords?.latitude
		}
	]

	useEffect(() => {
		requestCameraPermission()
		requestLocationPermission()
	}, [])

	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: "App Camera Permission",
					message: "App needs access to your camera ",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK"
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {

				console.log("Camera permission given");
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const getOneTimeLocation = () => {
		Geolocation.getCurrentPosition(
			position => {
				setLocation(position);
			},
			error => {
				console.log(error.code, error.message);
				setLocation(false);
			},
		);
	};


	const requestLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Location Permission Needed',
					message: 'Location permission is needed inorder to proceed',
					buttonNegative: "Deny",
					buttonPositive: "Grant Access"
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				getOneTimeLocation()
				console.log("Location access given")
				//alert("Location access given");
			} else {
				console.log("location permission denied")
				//alert("Location permission denied");
			}
		} catch (err) {
			console.warn(err)
		}
	}

	const openCamera = useCallback(() => {

		let options = {
			title: "Select Images",
			mediaType: "mixed",
			selectionLimit: 1,
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
			cameraType: 'front'

		};
		launchCamera(options, (res) => {

			console.log(res)


			if (res.didCancel) {
				// console.log('User cancelled image picker');
			} else if (res.error) {
				setFilePath(null)
			} else if (res.customButton) {
				// console.log('User tapped custom button: ', res.customButton);
				// alert(res.customButton);
			} else {
				// const source = { uri: res.uri };
				setFilePath(res)
			}
		});
	}, [])

	const getStatus = async () => {

		const datas = {
			user_id: user?._id,
			online_status: "online"
		};

        try {
            const response = await customAxios.post(`rider/online-status-change`,datas);
			reactotron.log(response, "RES!@")
           
        } catch (error) {
			Toast.show({
				type: 'error',
				text1: error
			});
        }
    }

	const onSubmit = async () => {

		setLoading(true)
		try {
			const formData = new FormData();
			if (filePath?.assets?.[0]) {
				formData.append('image', {
					uri: filePath?.assets?.[0]?.uri,
					type: 'image/jpeg',
					name: 'attendance.jpg',
				});
			}
			formData.append('attendance_date', currentDate);
			formData.append('attendance_time', currentTime);
			formData.append('location', JSON.stringify(currentLocation?.[0]));

			const imgUpload = await customAxios.post('auth/rideruploadimage', formData, {
				headers: {
					"Content-Type": 'multipart/form-data'
				}
			})
			reactotron.log(imgUpload, "IMAGE")
			if (imgUpload?.data?.status === 200 || 201) {
				Toast.show({
					type: 'success',
					text1: 'Attendance Added'
				});
				navigation.navigate('Menu')
				getStatus()
			}
		}
		catch (error) {
			Toast.show({
				type: 'error',
				text1: error
			});
		} finally {
			setLoading(false);
		}

	}


	// const onSubmit = useCallback(() => {
	// 	navigation.navigate('Menu')
	// }, [])

	const onLogin = useCallback(() => {
		navigation.navigate('Login')
	}, [])




	return (
		<CommonAuthBg>
			<ScrollView style={{ flex: 1, paddingHorizontal: 30, marginTop: 30 }}>
				<CommonAuthHeading
					label={'Submit Image'}
					mt={100}
				/>
				<CommonTexts
					label={'Take a picture of yourself so that we can mark the attendance'}
					mt={5}
				/>

				<View
					style={styles.imageContainer}
				>
					{filePath ? <Image
						style={{ width: '100%', height: 296, borderRadius: 20 }}
						alignSelf='center'
						source={{ uri: filePath?.assets?.[0]?.uri }} alt='img'
					/> :
						<View style={{ marginTop: 50 }}>
							<Image
								style={styles.logo}
								source={require('../../../Images/pandacam.png')}
								resizeMode='contain'
							/>
							<TouchableOpacity
								onPress={openCamera}
								style={styles.openCam}
							>
								<Ionicons name='camera' color='#58D36E' size={70} />
							</TouchableOpacity>
						</View>
					}

					{filePath && <TouchableOpacity
						onPress={() => setFilePath(null)}
						style={styles.closeBtn}
					>
						<Ionicons name='close' color='#fff' size={25} />
					</TouchableOpacity>}
				</View>

				<CustomButton
					onPress={onSubmit}
					bg={filePath ? '#58D36E' : '#CBCBCB'}
					label={'Submit Image'}
					mt={30}
					mb={10}
					loading={loading}
					disabled={!filePath || loading ? true : false}
				/>
				<Text
					style={styles.unableSubmit}
				>Unable to submit picture?</Text>
				<TouchableOpacity onPress={onLogin}>
					<Text style={styles.textBold}>{"Return to Login"}</Text>
				</TouchableOpacity>
			</ScrollView>
		</CommonAuthBg>
	)
}

export default ImageUploadScreen

const styles = StyleSheet.create({
	textBold: {
		fontFamily: 'Poppins-Bold',
		color: '#FF4646',
		fontSize: 15,
		textAlign: 'center',
		marginTop: 10
	},
	imageContainer: {
		borderWidth: 2,
		borderRadius: 20,
		borderColor: '#70707059',
		borderStyle: 'dashed',
		marginTop: 20,
		width: '100%',
		height: 300,
		alignSelf: 'center'
	},
	openCam: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	closeBtn: {
		position: 'absolute',
		backgroundColor: "#FF4B4B",
		borderRadius: 40,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		right: 5,
		zIndex: 1,
		top: 5
	},
	unableSubmit: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		textAlign: 'center',
		fontSize: 11,
		marginTop: 40
	},
	logo: {
		width: 100,
		height: 150,
		alignSelf: 'center',
	},
})