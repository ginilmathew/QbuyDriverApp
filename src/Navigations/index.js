import { Platform, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import Menu from './Menu';
import Register from '../screens/auth/Register';
import ImageUploadScreen from '../screens/auth/ImageUploadScreen';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../contexts/Auth';
import { AppState } from 'react-native';
import { useRef } from 'react';
import { focusManager } from '@tanstack/react-query'
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
const Stack = createStackNavigator();

const Navigation = () => {

    const [initialScreen, setInitialScreen] = useState(null)
    const authContext = useContext(AuthContext)

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    //reactotron.log(appStateVisible, "STATUS")
  


    // async function requestUserPermission() {
    //     if(Platform.OS === 'ios'){
    //         const authStatus = await messaging().requestPermission();
    //         const enabled =
    //             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    //         if (enabled) {
    //             console.log('Authorization status:', authStatus);
    //         }
    //     }
    //     else{
    //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    //     }

    //     let user = JSON.parse(await AsyncStorage.getItem("user"))
    //     //if (authorizationStatus) {

    //         await messaging().registerDeviceForRemoteMessages();
    //         const token = await messaging().getToken();



    //         if (user?._id) {
    //             let data = {
    //                 id: user?._id,
    //                 token
    //             }
    //             await axios.post(`${API_URL}auth/adddevicetoken`, data)
    //                 .then(async response => {
    //                 })
    //                 .catch(async error => {
    //                 })
    //         }


    // }

    // async function onMessageReceived(message) {
    //     // Request permissions (required for iOS)
    //     await notifee.requestPermission()

    //     // Create a channel (required for Android)
    //     const channelId = await notifee.createChannel({
    //         id: 'default',
    //         name: 'Default Channel',
    //     });

    //     // Display a notification
    //     await notifee.displayNotification({
    //         title: message?.notification?.title,
    //         body: message?.notification?.body,
    //         data: message?.data,
    //         android: {
    //             channelId,
    //             smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    //             // pressAction is needed if you want the notification to open the app when pressed
    //             pressAction: {
    //                 id: 'default',
    //             },
    //         },
    //     });
    // }

    // useEffect(() => {
    //     // Assume a message-notification contains a "type" property in the data payload of the screen to open

    //     messaging().onNotificationOpenedApp(remoteMessage => {
       
          

    //     });

    //     // Check whether an initial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
                
    //         });

    //     messaging().onMessage(onMessageReceived);
    //     messaging().setBackgroundMessageHandler(onMessageReceived);
    // }, []);


    useEffect(() => { 
        checkLogin();   
    }, [])


    

    // const getStatus = async () => {

	// 	const datas = {
	// 		user_id: user?._id,
	// 		online_status: appStateVisible
	// 	};

    //     try {
    //         const response = await customAxios.post(`rider/online-status-change`,datas);
	// 		reactotron.log(response, "RES!@")
           
    //     } catch (error) {
   
    //         Toast.show({
    //             type: 'error',
    //             title: error
    //         });
    //     }
    // }

    const checkLogin = async() => {
        //await AsyncStorage.clear()
        const token = await AsyncStorage.getItem("token");
        // reactotron.log({token})
        if(token){
            // const user = await AsyncStorage.getItem("user");
            authContext.getProfileDetails()
            setInitialScreen('Menu');
            // if(user){
            //     let userData = JSON.parse(user);
            //     // reactotron.log({userData})
            //     dispatch(getProfile(userData?._id))
            //     setInitialScreen('Menu');
            // }
            // else{
            //     setInitialScreen('AppIntro');
            // }
        }
        else{
            setInitialScreen('Login');
        }
    }
    if(!initialScreen){
        return(
            <SplashScreen/>
        )
    }



	return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />

                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Menu" component={Menu} />

            </Stack.Navigator>
        </NavigationContainer>
	)
}

export default Navigation

const styles = StyleSheet.create({})