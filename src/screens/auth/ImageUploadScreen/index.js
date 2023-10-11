import { StyleSheet, Text, View, Image, ScrollView, Platform, PermissionsAndroid, TouchableOpacity, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CommonAuthBg from '../CommonAuthBg';
import CustomButton from '../../../Components/CustomButton';
import CommonTexts from '../../../Components/CommonTexts';
import CommonAuthHeading from '../CommonAuthHeading';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'


const ImageUploadScreen = ({ navigation }) => {

	const [filePath, setFilePath] = useState(null);

	useEffect(() => {
		requestCameraPermission()
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

	const onSubmit = useCallback(() => {
		navigation.navigate('Menu')
	}, [])

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
						style={{ width: '100%', height: 300, borderRadius: 20 }}
						alignSelf='center'
						source={{ uri: filePath?.assets?.[0]?.uri }} alt='img'
					/> :
						<View style={{marginTop:50}}>
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
						<Ionicons name='close' color='#fff' size={35} />
					</TouchableOpacity>}
				</View>

				<CustomButton
					onPress={onSubmit}
					bg={filePath ? '#58D36E' : '#CBCBCB'}
					label={'Submit Image'}
					mt={30}
					mb={10}
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
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		right: -12,
		zIndex: 1,
		top: -15
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