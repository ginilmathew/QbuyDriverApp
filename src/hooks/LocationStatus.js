import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import reactotron from 'reactotron-react-native';

const LocationStatus = () => {

  //const [location, setLocation] = useState(null)
  //reactotron.log(location, "LOCATION")
  
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
        //setLocation()
				//getOneTimeLocation()
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

  return location;
}

export default LocationStatus

const styles = StyleSheet.create({})